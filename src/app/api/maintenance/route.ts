import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateFee } from "@/lib/fees";

/**
 * GET /api/maintenance
 * Get all maintenance requests; filter by tenantId, vendorId, or status.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId") ?? undefined;
    const vendorId = searchParams.get("vendorId") ?? undefined;
    const status = searchParams.get("status") ?? undefined;

    const requests = await db.maintenanceRequest.findMany({
      where: {
        ...(tenantId && { tenantId }),
        ...(vendorId && { vendorId }),
        ...(status && { status }),
      },
      include: {
        tenant: { select: { name: true } },
        vendor: { select: { name: true } },
        unit: { include: { property: { select: { name: true, address: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("[GET /api/maintenance]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/maintenance
 * Create a new maintenance request.
 */
export async function POST(req: NextRequest) {
  try {
    const { description, unitId, tenantId, vendorId } = await req.json();

    if (!description || !unitId || !tenantId) {
      return NextResponse.json(
        { error: "description, unitId, and tenantId are required" },
        { status: 400 }
      );
    }

    const request = await db.maintenanceRequest.create({
      data: {
        description,
        unitId,
        tenantId,
        vendorId: vendorId ?? null,
        status: "OPEN",
      },
    });

    return NextResponse.json({ request }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/maintenance]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/maintenance
 * Resolve a maintenance request and optionally log cost + fee.
 * Body: { requestId, status, cost?, complexity?: "simple" | "complex" }
 */
export async function PATCH(req: NextRequest) {
  try {
    const { requestId, status, cost, complexity = "simple" } = await req.json();

    if (!requestId || !status) {
      return NextResponse.json({ error: "requestId and status are required" }, { status: 400 });
    }

    const request = await db.maintenanceRequest.update({
      where: { id: requestId },
      data: { status, cost: cost ?? undefined },
    });

    let feeBreakdown = null;
    if (cost && status === "RESOLVED") {
      const feeType = complexity === "complex" ? "maintenance_complex" : "maintenance_simple";
      feeBreakdown = calculateFee(cost, feeType);
    }

    return NextResponse.json({ request, feeBreakdown });
  } catch (error) {
    console.error("[PATCH /api/maintenance]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
