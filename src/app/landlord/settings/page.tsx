import { ShieldCheck, Lock, Building, CreditCard, Trash2, Mail, Globe, User } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { LandlordSettingsClient } from "@/components/LandlordSettingsClient";

async function getLandlordProfile(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isBvnVerified: true,
      isGovIdVerified: true,
      createdAt: true,
      _count: { select: { properties: true } },
    },
  });
}

export default async function LandlordSettings() {
  const user = await getCurrentUser();
  const profile = user ? await getLandlordProfile(user.id) : null;

  return (
    <LandlordSettingsClient profile={profile} />
  );
}