"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [role, setRole] = useState<"LANDLORD" | "TENANT">("LANDLORD");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050B18] relative overflow-hidden p-6 font-sans">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />

      <div className="z-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center mb-3 shadow-2xl">
            <img src="/logo.png" alt="Landlord logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight italic">Landlord</h1>
          <p className="text-slate-400 mt-1 text-center text-xs font-medium">Secure Real Estate Management</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 rounded-[2rem]">
          <CardHeader className="space-y-1 pb-4 text-center pt-8">
            <CardTitle className="text-xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Access your dashboard to manage properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="flex p-1 bg-white/5 rounded-2xl mb-6 border border-white/5">
              <button
                onClick={() => setRole("LANDLORD")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                  role === "LANDLORD" ? "bg-[#10b981] text-white shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                Landlord
              </button>
              <button
                onClick={() => setRole("TENANT")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                  role === "TENANT" ? "bg-[#10b981] text-white shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                Tenant
              </button>
            </div>

            <form action={loginAction} className="space-y-4">
              <input type="hidden" name="role" value={role} />
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
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <Link href="#" className="text-[10px] text-[#10b981] hover:text-[#0da673] font-bold transition-colors">Forgot?</Link>
                </div>
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
              <Button type="submit" className="w-full h-11 bg-[#10b981] hover:bg-[#0da673] text-white font-bold rounded-xl shadow-lg shadow-[#10b981]/10 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 group text-sm">
                Sign In
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pb-8 pt-2">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center px-6"><span className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-widest"><span className="bg-transparent px-3 text-slate-600">Secure Entry</span></div>
            </div>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-400 font-medium">
          New here?{" "}
          <Link href="/register" className="font-bold text-[#10b981] hover:text-[#0da673] transition-colors">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
