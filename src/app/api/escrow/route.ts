import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateFee } from "@/lib/fees";

/**
 * GET /api/escrow
 * Get all escrow records, optionally filtered by leaseId or status.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const leaseId = searchParams.get("leaseId") ?? undefined;
    const status = searchParams.get("status") ?? undefined;

    const escrows = await db.escrow.findMany({
      where: {
        ...(leaseId && { leaseId }),
        ...(status && { status }),
      },
      include: {
        lease: {
          include: {
            tenant: { select: { name: true, email: true } },
            unit: { include: { property: { select: { name: true, address: true } } } },
          },
        },
      },
    });

    return NextResponse.json({ escrows });
  } catch (error) {
    console.error("[GET /api/escrow]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/escrow
 * Create an escrow hold for a lease deposit.
 * - A 2% platform fee is taken on the deposit.
 * - Status starts as HELD until inspection is done.
 */
export async function POST(req: NextRequest) {
  try {
    const { leaseId, amount } = await req.json();

    if (!leaseId || !amount) {
      return NextResponse.json({ error: "leaseId and amount are required" }, { status: 400 });
    }

    const lease = await db.lease.findUnique({ where: { id: leaseId } });
    if (!lease) {
      return NextResponse.json({ error: "Lease not found" }, { status: 404 });
    }

    const feeBreakdown = calculateFee(amount, "escrow");

    const [escrow, payment] = await db.$transaction([
      db.escrow.create({
        data: {
          leaseId,
          amount: feeBreakdown.netAmount, // Net after platform fee
          status: "HELD",
        },
      }),
      db.payment.create({
        data: {
          tenantId: lease.tenantId,
          leaseId,
          amount: feeBreakdown.grossAmount,
          type: "ESCROW",
          status: "COMPLETED",
          platformFee: feeBreakdown.platformFee,
        },
      }),
    ]);

    return NextResponse.json({ escrow, payment, feeBreakdown }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/escrow]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/escrow
 * Resolve an escrow: release to tenant or landlord after inspection.
 * Body: { escrowId, resolution: "RELEASED_TO_TENANT" | "RELEASED_TO_LANDLORD", inspectionNotes? }
 */
export async function PATCH(req: NextRequest) {
  try {
    const { escrowId, resolution, inspectionNotes } = await req.json();

    const VALID = ["RELEASED_TO_TENANT", "RELEASED_TO_LANDLORD"];
    if (!escrowId || !VALID.includes(resolution)) {
      return NextResponse.json(
        { error: "escrowId and valid resolution are required" },
        { status: 400 }
      );
    }

    const escrow = await db.escrow.update({
      where: { id: escrowId },
      data: { status: resolution, inspectionNotes: inspectionNotes ?? null },
    });

    return NextResponse.json({ escrow });
  } catch (error) {
    console.error("[PATCH /api/escrow]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
