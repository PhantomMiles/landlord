"use client";

import Link from "next/link";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050B18] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />

      <div className="z-10 w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center mb-4 shadow-2xl">
            <img src="/logo.png" alt="Landlord logo" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Landlord</h1>
          <p className="text-slate-400 mt-2 text-center text-sm font-medium">Secure Real Estate Management & Escrow</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 rounded-3xl">
          <CardHeader className="space-y-1 pb-8 text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
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
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Password</label>
                <Link href="#" className="text-xs text-[#10b981] hover:text-[#0da673] font-semibold transition-colors">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 pl-12 h-12 rounded-2xl focus-visible:ring-[#10b981]/30 focus-visible:border-[#10b981] transition-all text-sm"
                />
              </div>
            </div>
            <Button className="w-full h-12 bg-[#10b981] hover:bg-[#0da673] text-white font-bold rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 group text-base">
              Sign In
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-10">
            <div className="relative w-full py-4 px-6">
              <div className="absolute inset-0 flex items-center px-6"><span className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-[#0b1224] px-4 text-slate-500">Or continue as</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full px-1">
              <Button className="bg-transparent border border-white/10 text-white hover:bg-transparent hover:text-white rounded-2xl h-12 text-sm font-semibold transition-all shadow-none">
                Landlord
              </Button>
              <Button className="bg-transparent border border-white/10 text-white hover:bg-transparent hover:text-white rounded-2xl h-12 text-sm font-semibold transition-all shadow-none">
                Tenant
              </Button>
            </div>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-400 font-medium">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-[#10b981] hover:text-[#0da673] transition-colors decoration-2 underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
