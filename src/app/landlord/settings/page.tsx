"use client";

import { useState } from "react";
import { User, Mail, ShieldCheck, Lock, Building, Trash2, Globe, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteAccountModal } from "@/components/modals/DeleteAccountModal";

export default function LandlordSettings() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Portfolio Profile</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Manage your landlord credentials and settlement details.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-slate-100 overflow-hidden shadow-sm flex items-center justify-center">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 leading-none">Tim Anderson</h2>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Landlord
              </p>
            </div>
          </div>
          <button className="px-4 py-2 text-xs font-bold bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">Edit Brand Logo</button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
              <div className="relative group">
                <Building className="absolute left-4 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input defaultValue="Anderson Properties" className="bg-slate-50 border-transparent text-slate-800 pl-11 h-10 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input defaultValue="tim.a@anderson.com" className="bg-slate-50 border-transparent text-slate-800 pl-11 h-10 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Website</label>
              <div className="relative group">
                <Globe className="absolute left-4 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input defaultValue="www.andersonproperties.co" className="bg-slate-50 border-transparent text-slate-800 pl-11 h-10 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Financials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-800 pt-2 leading-none">Security</h2>
          </div>
          <div className="space-y-4">
            <Input type="password" placeholder="Current Password" className="bg-slate-50 border-transparent rounded-xl h-10" />
            <Input type="password" placeholder="New Password" className="bg-slate-50 border-transparent rounded-xl h-10" />
            <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl h-10 font-bold transition-all">Update Security</Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10b981]/10 rounded-xl flex items-center justify-center text-[#10b981]">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-800 pt-2 leading-none">Settlement Account</h2>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bank Details</p>
            <p className="font-bold text-slate-800">Guaranty Trust Bank</p>
            <p className="text-sm font-bold text-slate-500">0123456789</p>
          </div>
          <Button variant="outline" className="w-full border-slate-200 text-slate-600 rounded-xl h-10 font-bold hover:bg-slate-50 font-sans">Change Settlement Bank</Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-rose-50/50 rounded-3xl border border-rose-100 p-8 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-rose-900">Delete Account</h2>
          <p className="text-sm text-rose-700/70 mt-1">Irreversibly remove all property and financial data.</p>
        </div>
        <button 
          onClick={() => setIsDeleteModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all hover:scale-105"
        >
          <Trash2 className="w-4 h-4" />
          Delete Portfolio
        </button>
      </div>

      <DeleteAccountModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={() => {
          console.log("Delete account confirm");
          setIsDeleteModalOpen(false);
        }}
        role="LANDLORD"
      />
    </div>
  );
}
