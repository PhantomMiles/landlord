"use server";

export const maxDuration = 30;  // ← add this line

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setAuthCookie, clearAuthCookie } from "@/lib/auth";

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export async function loginAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    redirect("/login?error=invalid_credentials");
  }
  // After the if (!user || !user.passwordHash) check, add:
const safeUser = user!; // non-null assertion — we redirected above if null
const passwordHash = safeUser.passwordHash!;
const isValid = await bcrypt.compare(password, passwordHash);

await setAuthCookie({
  id: safeUser.id,
  email: safeUser.email,
  name: safeUser.name,
  role: safeUser.role,
});

if (safeUser.role === "TENANT") {
  redirect("/tenant/dashboard");
} else if (safeUser.role === "LANDLORD") {
  redirect("/landlord/dashboard");
}
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export async function registerAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const role = formData.get("role") as "LANDLORD" | "TENANT";

  if (!name || !email || !password || !role) {
    redirect("/register?error=missing_fields");
  }

  if (password.length < 8) {
    redirect("/register?error=password_too_short");
  }

  // Check if email already exists
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    redirect("/register?error=email_taken");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      // Auto-create TenantScore for tenants
      ...(role === "TENANT" && {
        tenantScore: {
          create: {
            identityScore: 0,
            financialScore: 0,
            behavioralScore: 0,
            engagementScore: 0,
            totalScore: 0,
          },
        },
      }),
    },
  });

  await setAuthCookie({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  if (role === "TENANT") {
    redirect("/tenant/dashboard");
  } else {
    redirect("/landlord/dashboard");
  }
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
export async function logoutAction() {
  await clearAuthCookie();
  redirect("/login");
}