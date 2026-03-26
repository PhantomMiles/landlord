"use server";

import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role") as string;

  console.log("Login attempt:", { email, role });

  // In a real app, you'd verify credentials with Prisma here
  // Redirect based on the chosen role
  if (role === "TENANT") {
    redirect("/tenant/dashboard");
  } else {
    redirect("/landlord/dashboard");
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role") as string;

  console.log("Registration attempt:", { name, email, role });

  // In a real app, you'd create the user in Prisma here
  if (role === "TENANT") {
    redirect("/tenant/dashboard");
  } else {
    redirect("/landlord/dashboard");
  }
}

export async function logoutAction() {
  console.log("Logout action triggered");
  // In a real app, you'd clear the session cookie here
  redirect("/login");
}
