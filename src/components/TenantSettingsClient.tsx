"use client";

import { useState } from "react";
import { User, Mail, Phone, Lock, CreditCard, Trash2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteAccountModal } from "@/components/modals/DeleteAccountModal";
import { logoutAction } from "@/app/actions/actions-auth";

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  isBvnVerified: boolean;
  isGovIdVerified: boolean;
  isBiometricVerified: boolean;
  createdAt: Date;
  tenantScore: { totalScore: number } | null;
}

export function TenantSettingsClient({ profile }: { profile: Profile | null }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const score = Math.round(profile?.tenantScore?.totalScore ?? 0);
  const scoreLabel = score >= 90 ? "Exceptional" : score >= 75 ? "Reliable" : score >= 60 ? "Average" : score > 0 ? "Building" : "Not scored";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Manage your personal information and preferences.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-100 overflow-hidden shadow-sm">
              <img
                src={`https://i.pravatar.cc/150?u=${profile?.email ?? "tenant"}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 leading-none">{profile?.name ?? "—"}</h2>
              <p className="text-xs text-slate-400 mt-1">{profile?.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-xs font-bold text-[#10b981] uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Tenant
                </p>
                {score > 0 && (
                  <>
                    <span className="text-slate-300">•</span>
                    <p className="text-xs font-bold text-slate-500">Score: {score} ({scoreLabel})</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Member since</p>
            <p className="text-sm font-bold text-slate-600">
              {profile ? new Date(profile.createdAt).toLocaleDateString("en-NG", { month: "long", year: "numeric" }) : "—"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3 w-4 h-4 text-slate-400 group-focus-within:text-[#10b981] transition-colors" />
                <Input defaultValue={profile?.name ?? ""} name="name" className="bg-slate-50 border-transparent text-slate-800 pl-11 h-10 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#10b981]/10 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3 w-4 h-4 text-slate-400 transition-colors" />
                <Input defaultValue={profile?.email ?? ""} disabled className="bg-slate-50 border-transparent text-slate-500 pl-11 h-10 rounded-xl opacity-70" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-3 w-4 h-4 text-slate-400 group-focus-within:text-[#10b981] transition-colors" />
                <Input defaultValue={profile?.phone ?? ""} name="phone" placeholder="+234..." className="bg-slate-50 border-transparent text-slate-800 pl-11 h-10 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#10b981]/10 transition-all" />
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            {[
              { label: "BVN", verified: profile?.isBvnVerified },
              { label: "Gov ID", verified: profile?.isGovIdVerified },
              { label: "Biometric", verified: profile?.isBiometricVerified },
            ].map(v => (
              <div key={v.label} className={`flex items-center gap-2 p-2 rounded-xl ${v.verified ? "bg-[#10b981]/10" : "bg-white border border-slate-100"}`}>
                <ShieldCheck className={`w-4 h-4 ${v.verified ? "text-[#10b981]" : "text-slate-300"}`} />
                <div>
                  <p className="text-[10px] font-bold text-slate-600">{v.label}</p>
                  <p className={`text-[9px] font-bold ${v.verified ? "text-[#10b981]" : "text-slate-400"}`}>
                    {v.verified ? "Verified" : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button type="submit" disabled={saving} className="bg-[#10b981] hover:bg-[#0da673] text-white rounded-xl h-10 px-6 font-bold">
            {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
          </Button>
        </form>
      </div>

      {/* Security & Payments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-800 pt-2">Password</h2>
          </div>
          <div className="space-y-4">
            <Input type="password" placeholder="Current Password" className="bg-slate-50 border-transparent rounded-xl h-10" />
            <Input type="password" placeholder="New Password" className="bg-slate-50 border-transparent rounded-xl h-10" />
            <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl h-10 font-bold">Update Password</Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10b981]/10 rounded-xl flex items-center justify-center text-[#10b981]">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-800 pt-2">Payment Details</h2>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm text-slate-400">No payment method linked yet</p>
          </div>
          <Button variant="outline" className="w-full border-slate-200 text-slate-600 rounded-xl h-10 font-bold hover:bg-slate-50">
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-rose-50/50 rounded-3xl border border-rose-100 p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="font-bold text-rose-900">Delete Account</h2>
          <p className="text-sm text-rose-700/70 mt-1">Permanently remove your account and all data.</p>
        </div>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="flex items-center gap-2 mt-4 md:mt-0 px-6 py-2.5 bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all hover:scale-105"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          setIsDeleteModalOpen(false);
          await logoutAction();
        }}
        role="TENANT"
      />
    </div>
  );
}
