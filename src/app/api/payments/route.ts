import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateFee } from "@/lib/fees";

/**
 * GET /api/payments
 * List payments, optionally filtered by tenantId, leaseId, or status.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId") ?? undefined;
    const leaseId = searchParams.get("leaseId") ?? undefined;
    const status = searchParams.get("status") ?? undefined;

    const payments = await db.payment.findMany({
      where: {
        ...(tenantId && { tenantId }),
        ...(leaseId && { leaseId }),
        ...(status && { status: status as "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" }),
      },
      include: {
        tenant: { select: { name: true, email: true } },
        lease: { include: { unit: { include: { property: { select: { name: true } } } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("[GET /api/payments]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/payments
 * Records a new payment and calculates platform/maintenance fees.
 *
 * Body: { tenantId, leaseId, amount, type, reference? }
 * Type: "rent" | "maintenance_simple" | "maintenance_complex" | "escrow" | "transaction"
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tenantId, leaseId, amount, type, reference } = body;

    if (!tenantId || !amount || !type) {
      return NextResponse.json({ error: "tenantId, amount and type are required" }, { status: 400 });
    }

    const feeBreakdown = calculateFee(amount, type);

    const payment = await db.payment.create({
      data: {
        tenantId,
        leaseId: leaseId ?? null,
        amount: feeBreakdown.grossAmount,
        type: type.startsWith("maintenance") ? "MAINTENANCE" : type.toUpperCase(),
        status: "COMPLETED",
        platformFee: feeBreakdown.platformFee,
        maintenanceFee: type.startsWith("maintenance") ? feeBreakdown.platformFee : 0,
        reference: reference ?? null,
      },
    });

    return NextResponse.json({ payment, feeBreakdown }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/payments]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
