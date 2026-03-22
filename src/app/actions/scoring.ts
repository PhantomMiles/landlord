"use server";

import { db } from "@/lib/db";
import { calculateTenantScore } from "@/lib/scoring";

/**
 * recalculateTenantScore
 * Server Action to derive a score from existing DB data and persist it.
 * Called after events like: rent payment recorded, BVN verified, lease started, etc.
 */
export async function recalculateTenantScore(tenantId: string) {
  const tenant = await db.user.findUnique({
    where: { id: tenantId, role: "TENANT" },
    include: {
      leases: {
        where: { status: "ACTIVE" },
        include: { payments: { where: { type: "RENT", status: "COMPLETED" } } },
      },
      tenantScore: true,
    },
  });

  if (!tenant) throw new Error("Tenant not found");

  // Derive behavioral inputs from DB
  const allRentPayments = tenant.leases.flatMap((l) => l.payments).length;
  const hasAutoRent = tenant.leases.some((l) => l.autoPaySetup);

  const existingScore = tenant.tenantScore;

  const breakdown = calculateTenantScore({
    isBvnVerified: tenant.isBvnVerified,
    isGovIdVerified: tenant.isGovIdVerified,
    isBiometricVerified: tenant.isBiometricVerified,
    incomeTsRentRatio: 3, // Placeholder — wire to bank-linking data in production
    hasLinkedBankAccount: false, // Will be set once bank integration is wired
    hasCreditHistory: tenant.isBvnVerified, // BVN implies some credit history
    paymentStreak: allRentPayments,
    hasRentAutomation: hasAutoRent,
    hasRentShield: false, // Wire to Rent Shield program enrollment
    previousLandlordRating: 0, // Wire to reference system
    hasConflictHistory: false,
    avgResponseTimeHours: existingScore?.platformActivity ?? 12,
    maintenanceRequestsHandled: 0,
    platformActivityDays: existingScore?.platformActivity ?? 0,
  });

  const updated = await db.tenantScore.upsert({
    where: { tenantId },
    update: {
      identityScore: breakdown.identityScore,
      financialScore: breakdown.financialScore,
      behavioralScore: breakdown.behavioralScore,
      engagementScore: breakdown.engagementScore,
      totalScore: breakdown.totalScore,
      paymentStreaks: allRentPayments,
    },
    create: {
      tenantId,
      identityScore: breakdown.identityScore,
      financialScore: breakdown.financialScore,
      behavioralScore: breakdown.behavioralScore,
      engagementScore: breakdown.engagementScore,
      totalScore: breakdown.totalScore,
      paymentStreaks: allRentPayments,
    },
  });

  return { updated, breakdown };
}
