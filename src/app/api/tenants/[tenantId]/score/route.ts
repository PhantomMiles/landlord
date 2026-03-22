import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateTenantScore, type ScoringInputs } from "@/lib/scoring";

type RouteParams = { params: Promise<{ tenantId: string }> };

/**
 * GET /api/tenants/[tenantId]/score
 * Returns the current tenant score breakdown for a given tenant.
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { tenantId } = await params;
    const score = await db.tenantScore.findUnique({
      where: { tenantId },
      include: { tenant: { select: { name: true, email: true } } },
    });

    if (!score) {
      return NextResponse.json({ error: "Score record not found" }, { status: 404 });
    }

    return NextResponse.json({ score });
  } catch (error) {
    console.error("[GET /api/tenants/[tenantId]/score]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/tenants/[tenantId]/score
 * Recalculates and persists the tenant's credibility score based on inputs.
 *
 * Request body: ScoringInputs
 */
export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const { tenantId } = await params;
    const inputs = (await req.json()) as ScoringInputs;

    // Verify tenant exists
    const tenant = await db.user.findUnique({ where: { id: tenantId, role: "TENANT" } });
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }

    const breakdown = calculateTenantScore(inputs);

    // Persist the score
    const updatedScore = await db.tenantScore.upsert({
      where: { tenantId },
      update: {
        identityScore: breakdown.identityScore,
        financialScore: breakdown.financialScore,
        behavioralScore: breakdown.behavioralScore,
        engagementScore: breakdown.engagementScore,
        totalScore: breakdown.totalScore,
        paymentStreaks: inputs.paymentStreak,
        platformActivity: inputs.platformActivityDays,
      },
      create: {
        tenantId,
        identityScore: breakdown.identityScore,
        financialScore: breakdown.financialScore,
        behavioralScore: breakdown.behavioralScore,
        engagementScore: breakdown.engagementScore,
        totalScore: breakdown.totalScore,
        paymentStreaks: inputs.paymentStreak,
        platformActivity: inputs.platformActivityDays,
      },
    });

    return NextResponse.json({ score: updatedScore, breakdown });
  } catch (error) {
    console.error("[POST /api/tenants/[tenantId]/score]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
