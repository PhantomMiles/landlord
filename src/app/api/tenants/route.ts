import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
// import { calculateTenantScore } from "@/lib/scoring";

/**
 * GET /api/tenants
 * Returns a list of all tenants for the authenticated landlord.
 * In a real app, the landlordId comes from the session. For MVP we accept it as a query param.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const landlordId = searchParams.get("landlordId");

    if (!landlordId) {
      return NextResponse.json({ error: "landlordId is required" }, { status: 400 });
    }

    // Fetch all tenants who have an active lease on a property owned by this landlord
    const tenants = await db.user.findMany({
      where: {
        role: "TENANT",
        leases: {
          some: {
            unit: {
              property: { landlordId },
            },
          },
        },
      },
      include: {
        tenantScore: true,
        leases: {
          where: { status: "ACTIVE" },
          include: { unit: { include: { property: true } } },
        },
      },
    });

    return NextResponse.json({ tenants });
  } catch (error) {
    console.error("[GET /api/tenants]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/tenants
 * Create a new tenant profile.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone } = body as { name: string; email: string; phone?: string };

    if (!name || !email) {
      return NextResponse.json({ error: "name and email are required" }, { status: 400 });
    }

    const tenant = await db.user.create({
      data: {
        name,
        email,
        phone,
        role: "TENANT",
        tenantScore: {
          create: {
            identityScore: 0,
            financialScore: 0,
            behavioralScore: 0,
            engagementScore: 0,
            totalScore: 0,
          },
        },
      },
      include: { tenantScore: true },
    });

    return NextResponse.json({ tenant }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/tenants]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
