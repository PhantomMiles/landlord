"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role: "LANDLORD" | "TENANT";
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm, role }: DeleteAccountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Account?</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            This action is permanent and cannot be undone. All your {role === "LANDLORD" ? "property listings, tenant records," : "lease history, payment records,"} and personal data will be permanently removed from the platform.
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={onConfirm}
              className="w-full h-12 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-500/20 transition-all"
            >
              Yes, Delete My Account
            </Button>
            <Button 
              variant="ghost"
              onClick={onClose}
              className="w-full h-12 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all font-sans uppercase text-[10px] tracking-widest"
            >
              Cancel and Keep Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
