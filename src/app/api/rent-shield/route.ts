import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function getShieldLevel(pct: number): string {
  if (pct >= 100) return "PLATINUM";
  if (pct >= 75) return "GOLD";
  if (pct >= 50) return "SILVER";
  if (pct >= 25) return "BRONZE";
  return "NONE";
}

// GET /api/rent-shield?tenantId=xxx
export async function GET(req: NextRequest) {
  try {
    const tenantId = req.nextUrl.searchParams.get("tenantId");
    if (!tenantId) return NextResponse.json({ error: "tenantId required" }, { status: 400 });

    const shield = await db.rentShield.findUnique({
      where: { tenantId },
      include: { contributions: { orderBy: { createdAt: "desc" }, take: 10 } },
    });

    if (!shield) return NextResponse.json({ shield: null });

    const percentage = Math.min(100, Math.round((shield.currentBalance / shield.targetAmount) * 100));
    return NextResponse.json({ shield, percentage });
  } catch (error) {
    console.error("[GET /api/rent-shield]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/rent-shield — enroll or contribute
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tenantId, targetAmount, contributionAmount, frequency, autoDeduct } = body;

    if (!tenantId || !targetAmount || !contributionAmount) {
      return NextResponse.json({ error: "tenantId, targetAmount, contributionAmount required" }, { status: 400 });
    }

    const existing = await db.rentShield.findUnique({ where: { tenantId } });
    if (existing) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 409 });
    }

    const now = new Date();
    const next = new Date(now);
    if (frequency === "WEEKLY") next.setDate(next.getDate() + 7);
    else next.setMonth(next.getMonth() + 1);

    const shield = await db.rentShield.create({
      data: {
        tenantId,
        targetAmount,
        contributionAmount,
        frequency: frequency ?? "MONTHLY",
        autoDeduct: autoDeduct ?? false,
        nextContribution: next,
      },
    });

    return NextResponse.json({ shield }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/rent-shield]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/rent-shield — add a contribution
export async function PATCH(req: NextRequest) {
  try {
    const { tenantId, amount } = await req.json();
    if (!tenantId || !amount) {
      return NextResponse.json({ error: "tenantId and amount required" }, { status: 400 });
    }

    const shield = await db.rentShield.findUnique({ where: { tenantId } });
    if (!shield) return NextResponse.json({ error: "Not enrolled" }, { status: 404 });

    const newBalance = Math.min(shield.targetAmount, shield.currentBalance + amount);
    const pct = (newBalance / shield.targetAmount) * 100;
    const level = getShieldLevel(pct);
    const badge = pct >= 100;

    const now = new Date();
    const next = new Date(now);
    if (shield.frequency === "WEEKLY") next.setDate(next.getDate() + 7);
    else next.setMonth(next.getMonth() + 1);

    const [updated] = await db.$transaction([
      db.rentShield.update({
        where: { tenantId },
        data: {
          currentBalance: newBalance,
          shieldLevel: level,
          badgeEarned: badge,
          streakMonths: { increment: 1 },
          lastContribution: now,
          nextContribution: next,
        },
      }),
      db.rentShieldContribution.create({
        data: { rentShieldId: shield.id, amount, status: "COMPLETED" },
      }),
    ]);

    const percentage = Math.round((newBalance / shield.targetAmount) * 100);
    return NextResponse.json({ shield: updated, percentage });
  } catch (error) {
    console.error("[PATCH /api/rent-shield]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
