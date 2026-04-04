"use client";

import { useState } from "react";
import { Bell, MessageSquare, Search, ChevronDown, Settings, LogOut } from "lucide-react";
import { ChatDrawer } from "@/components/ChatDrawer";
import { getCurrentUser } from "@/lib/db";
import { logoutAction } from "@/app/actions/actions-auth";

export function Header({ role = "LANDLORD" }: { role?: "LANDLORD" | "TENANT" }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = getCurrentUser(role);

  return (
    <>
      <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-8 transition-all">
        {/* Search Area */}
        <div className="relative group w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#10b981] transition-colors" />
          <input 
            type="text" 
            placeholder="Search properties, tenants, or payments..." 
            className="w-full bg-slate-100/50 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#10b981]/20 focus:bg-white transition-all outline-none text-slate-600 placeholder:text-slate-400"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 pr-6 border-r border-slate-200">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-all relative group"
            >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#10b981] rounded-full ring-2 ring-white"></span>
            </button>
            <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>

          {/* User Card */}
          <div className="relative">
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-2 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{role === "LANDLORD" ? "Portfolio Manager" : "Active Tenant"}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm group-hover:shadow-md transition-all ring-2 ring-transparent group-hover:ring-[#10b981]/20">
                <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Simple Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                >
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
                <div className="h-px bg-slate-100 my-1 mx-2" />
                <form action={logoutAction}>
                  <button 
                    type="submit"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        role={role} 
      />
    </>
  );
}
