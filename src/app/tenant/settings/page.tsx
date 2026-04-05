import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TenantSettingsClient } from "@/components/TenantSettingsClient";

async function getTenantProfile(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isBvnVerified: true,
      isGovIdVerified: true,
      isBiometricVerified: true,
      createdAt: true,
      tenantScore: { select: { totalScore: true } },
    },
  });
}

export default async function TenantSettings() {
  const user = await getCurrentUser();
  const profile = user ? await getTenantProfile(user.id) : null;
  return <TenantSettingsClient profile={profile} />;
}