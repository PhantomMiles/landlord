"use server";

import { db } from "@/lib/db";

/**
 * getDashboardStats
 * Aggregates key metrics for the Landlord dashboard overview.
 * In a real app, landlordId comes from the authenticated session.
 */
export async function getDashboardStats(landlordId: string) {
  const [propertyCount, tenantCount, recentPayments, escrowTotal] = await Promise.all([
    // Total active properties
    db.property.count({ where: { landlordId } }),

    // Total unique active tenants across all properties
    db.user.count({
      where: {
        role: "TENANT",
        leases: {
          some: {
            unit: { property: { landlordId } },
            status: "ACTIVE",
          },
        },
      },
    }),

    // Recent completed payments (for revenue calculation)
    db.payment.findMany({
      where: {
        status: "COMPLETED",
        type: "RENT",
        lease: { unit: { property: { landlordId } } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { amount: true, platformFee: true, createdAt: true },
    }),

    // Total held escrow
    db.escrow.aggregate({
      _sum: { amount: true },
      where: {
        status: "HELD",
        lease: { unit: { property: { landlordId } } },
      },
    }),
  ]);

  const monthlyRevenue = recentPayments.reduce((sum: number, p: { amount: number; platformFee: number; createdAt: Date }) => sum + p.amount, 0);
  const platformEarnings = recentPayments.reduce((sum: number, p: { amount: number; platformFee: number; createdAt: Date }) => sum + p.platformFee, 0);
  const escrowBalance = escrowTotal._sum.amount ?? 0;

  return {
    propertyCount,
    tenantCount,
    monthlyRevenue,
    platformEarnings,
    escrowBalance,
  };
}

/**
 * getTopTenants
 * Returns the top N tenants by credibility score for the landlord's portfolio.
 */
export async function getTopTenants(landlordId: string, limit = 5) {
  return db.user.findMany({
    where: {
      role: "TENANT",
      leases: {
        some: {
          status: "ACTIVE",
          unit: { property: { landlordId } },
        },
      },
      tenantScore: { isNot: null },
    },
    include: {
      tenantScore: true,
      leases: {
        where: { status: "ACTIVE" },
        include: { unit: { include: { property: { select: { name: true } } } } },
        take: 1,
      },
    },
    orderBy: { tenantScore: { totalScore: "desc" } },
    take: limit,
  });
}
