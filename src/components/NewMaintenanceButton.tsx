"use client";

import { Plus } from "lucide-react";

export function NewMaintenanceButton() {
  return (
    <button className="flex items-center gap-2 bg-[#10b981] hover:bg-[#0da673] text-white rounded-xl h-11 px-6 font-bold shadow-lg shadow-[#10b981]/20 transition-all hover:scale-105">
      <Plus className="w-4 h-4" />
      New Request
    </button>
  );
}
