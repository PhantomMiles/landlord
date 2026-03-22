"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Building2, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [role, setRole] = useState<"LANDLORD" | "TENANT">("TENANT");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050B18] relative overflow-hidden py-12">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-indigo-600/10 blur-[130px] rounded-full" />

      <div className="z-10 w-full max-w-lg px-4">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center mb-4 shadow-2xl">
            <img src="/logo.png" alt="Landlord logo" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-2 text-center text-sm font-medium">Join the next generation of real estate management</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-3xl">
          <CardHeader className="space-y-1 pb-8 text-center pt-10 px-8">
            <CardTitle className="text-2xl font-bold text-white">Join PhantomMiles</CardTitle>
            <CardDescription className="text-slate-400">
              Select your role and enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <button
                onClick={() => setRole("TENANT")}
                className={cn(
                  "relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group",
                  role === "TENANT"
                    ? "bg-[#10b981]/10 border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  role === "TENANT" ? "bg-[#10b981] text-white" : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                )}>
                  <UserCircle2 className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-sm font-bold tracking-tight transition-colors",
                  role === "TENANT" ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                )}>I'm a Tenant</span>
              </button>

              <button
                onClick={() => setRole("LANDLORD")}
                className={cn(
                  "relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group",
                  role === "LANDLORD"
                    ? "bg-[#10b981]/10 border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  role === "LANDLORD" ? "bg-[#10b981] text-white" : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                )}>
                  <Building2 className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-sm font-bold tracking-tight transition-colors",
                  role === "LANDLORD" ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                )}>I'm a Landlord</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
                  <Input
                    placeholder="Enter your full name"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 pl-12 h-12 rounded-2xl focus-visible:ring-[#10b981]/30 focus-visible:border-[#10b981] transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 pl-12 h-12 rounded-2xl focus-visible:ring-[#10b981]/30 focus-visible:border-[#10b981] transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 pl-12 h-12 rounded-2xl focus-visible:ring-[#10b981]/30 focus-visible:border-[#10b981] transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full h-12 bg-[#10b981] hover:bg-[#0da673] text-white font-bold rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 group text-base">
              Create Account
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center pb-10 pt-4 px-8">
            <p className="text-center text-sm text-slate-400 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#10b981] hover:text-[#0da673] transition-colors decoration-2 underline-offset-4 hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
          Powered by Landlord Escrow Protocol
        </p>
      </div>
    </div>
  );
}
