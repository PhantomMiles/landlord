import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/properties
 * Returns all properties for a given landlord.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const landlordId = searchParams.get("landlordId");

    if (!landlordId) {
      return NextResponse.json({ error: "landlordId is required" }, { status: 400 });
    }

    const properties = await db.property.findMany({
      where: { landlordId },
      include: {
        units: {
          include: {
            leases: {
              where: { status: "ACTIVE" },
              include: {
                tenant: { select: { name: true, email: true, tenantScore: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("[GET /api/properties]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/properties
 * Create a new property for a landlord.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, address, city, state, type, landlordId } = await req.json();

    if (!name || !address || !landlordId) {
      return NextResponse.json(
        { error: "name, address, and landlordId are required" },
        { status: 400 }
      );
    }

    const property = await db.property.create({
      data: { name, address, city, state, type, landlordId },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/properties]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
