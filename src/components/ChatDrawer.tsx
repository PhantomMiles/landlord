"use client";

import { X, Send, User } from "lucide-react";
import { useState } from "react";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role: "LANDLORD" | "TENANT";
}

export function ChatDrawer({ isOpen, onClose, role }: ChatDrawerProps) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#0A1428] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-none">Messages</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Platform Support & Communications</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <div className="flex flex-col gap-1 max-w-[80%]">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm">
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                Welcome to the {role === "LANDLORD" ? "Landlord" : "Tenant"} portal messaging system! You can chat with your {role === "LANDLORD" ? "tenants" : "landlord"} here.
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 ml-1">System • 10:24 AM</span>
          </div>

          <div className="flex flex-col gap-1 max-w-[80%] ml-auto items-end">
            <div className="p-4 bg-[#10b981] text-white rounded-2xl rounded-tr-none shadow-md shadow-[#10b981]/10">
              <p className="text-sm leading-relaxed font-sans font-medium">
                Hello! This looks great. How do I start a conversation?
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mr-1">You • 10:25 AM</span>
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="relative group">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..." 
              className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-[#10b981]/20 focus:bg-white transition-all outline-none text-slate-800 placeholder:text-slate-400"
            />
            <button className="absolute right-3 top-2.5 p-2.5 bg-[#10b981] text-white rounded-xl hover:bg-[#0da673] shadow-lg shadow-[#10b981]/20 transition-all hover:scale-105">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
