"use client";

export const maxDuration = 30;
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Building2, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { registerAction } from "@/app/actions/actions-auth";

export default function RegisterPage() {
  const [role, setRole] = useState<"LANDLORD" | "TENANT">("TENANT");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050B18] relative overflow-hidden py-8 px-6 font-sans">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-indigo-600/10 blur-[130px] rounded-full" />

      <div className="z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center mb-3 shadow-2xl">
            <img src="/logo.png" alt="Landlord logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-1 text-center text-xs font-medium">Join the next generation of real estate</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-[2rem]">
          <CardHeader className="space-y-1 pb-4 text-center pt-6 px-6">
            <CardDescription className="text-slate-400 text-xs text-balance">
              Select your role and enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6">
            {/* Role Selection - Compact */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button
                type="button"
                onClick={() => setRole("TENANT")}
                className={cn(
                  "relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group",
                  role === "TENANT"
                    ? "bg-[#10b981]/10 border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  role === "TENANT" ? "bg-[#10b981] text-white" : "bg-white/5 text-slate-500"
                )}>
                  <UserCircle2 className="w-4 h-4" />
                </div>
                <span className={cn(
                  "text-xs font-bold transition-colors",
                  role === "TENANT" ? "text-white" : "text-slate-500"
                )}>Tenant</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("LANDLORD")}
                className={cn(
                  "relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group",
                  role === "LANDLORD"
                    ? "bg-[#10b981]/10 border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  role === "LANDLORD" ? "bg-[#10b981] text-white" : "bg-white/5 text-slate-500"
                )}>
                  <Building2 className="w-4 h-4" />
                </div>
                <span className={cn(
                  "text-xs font-bold transition-colors",
                  role === "LANDLORD" ? "text-white" : "text-slate-500"
                )}>Landlord</span>
              </button>
            </div>

            <form action={registerAction} className="space-y-3">
              <input type="hidden" name="role" value={role} />
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
                  <Input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 pl-11 h-10 rounded-xl focus-visible:ring-[#10b981]/30 focus-visible:border-[#10b981] transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 pl-11 h-10 rounded-xl focus-visible:ring-[#10b981]/30 focus-visible:border-[#10b981] transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
                  <Input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 pl-11 h-10 rounded-xl focus-visible:ring-[#10b981]/30 focus-visible:border-[#10b981] transition-all text-sm"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-[#10b981] hover:bg-[#0da673] text-white font-bold rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 group text-sm">
                Create Account
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pb-8 pt-2 px-6">
            <p className="text-center text-xs text-slate-400 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#10b981] hover:text-[#0da673] transition-colors">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-[9px] text-slate-600 uppercase tracking-widest font-bold">
          Powered by Landlord Escrow Protocol
        </p>
      </div>
    </div>
  );
}
