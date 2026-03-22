import { FileText, Plus, Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const LEASES = [
  { id: "1", tenant: "Jenny Wilson", property: "Sunshine Court", unit: "A3", start: "Jun 1, 2025", end: "May 31, 2026", rent: 450000, status: "ACTIVE", daysLeft: 72, autoPaySetup: true },
  { id: "2", tenant: "Marvin McKinney", property: "Prime Office Plaza", unit: "B1", start: "Jan 1, 2025", end: "Dec 31, 2026", rent: 1200000, status: "ACTIVE", daysLeft: 287, autoPaySetup: true },
  { id: "3", tenant: "Dianne Russell", property: "Greenview Estate", unit: "C7", start: "Sep 1, 2025", end: "Aug 31, 2026", rent: 350000, status: "ACTIVE", daysLeft: 165, autoPaySetup: false },
  { id: "4", tenant: "Cody Fisher", property: "Sunshine Court", unit: "A7", start: "Mar 1, 2026", end: "Feb 28, 2027", rent: 450000, status: "ACTIVE", daysLeft: 345, autoPaySetup: false },
  { id: "5", tenant: "Old Tenant Name", property: "Greenview Estate", unit: "C12", start: "Jan 1, 2024", end: "Dec 31, 2024", rent: 320000, status: "TERMINATED", daysLeft: 0, autoPaySetup: false },
];

const statusConfig: Record<string, { icon: React.ReactNode; cls: string }> = {
  ACTIVE: { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  PENDING: { icon: <Clock className="w-4 h-4 text-amber-500" />, cls: "bg-amber-50 text-amber-700 border-amber-200" },
  TERMINATED: { icon: <AlertCircle className="w-4 h-4 text-slate-400" />, cls: "bg-slate-50 text-slate-500 border-slate-200" },
};

export default function LeasesPage() {
  const activeLease = LEASES.filter(l => l.status === "ACTIVE");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Leases</h1>
          <p className="text-slate-500 mt-1 text-sm">Active agreements and expiry tracking</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#10b981] text-white rounded-xl font-semibold shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:bg-[#0da673] transition-all">
          <Plus className="w-4 h-4" />
          Create Lease
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active Leases</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{activeLease.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Expiring in 90 days</p>
          <p className="text-3xl font-black text-rose-500 mt-1">{activeLease.filter(l => l.daysLeft <= 90).length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Auto-Pay Enrolled</p>
          <p className="text-3xl font-black text-[#10b981] mt-1">{activeLease.filter(l => l.autoPaySetup).length}</p>
        </div>
      </div>

      {/* Lease Cards */}
      <div className="space-y-3">
        {LEASES.map((l) => {
          const s = statusConfig[l.status];
          const isExpiringSoon = l.status === "ACTIVE" && l.daysLeft <= 90;

          return (
            <div key={l.id} className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow ${isExpiringSoon ? "border-amber-200" : "border-slate-200"}`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isExpiringSoon ? "bg-amber-50" : "bg-slate-50"}`}>
                    <FileText className={`w-5 h-5 ${isExpiringSoon ? "text-amber-500" : "text-slate-500"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-slate-800">{l.tenant}</h3>
                      {isExpiringSoon && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Expiring Soon</span>}
                      {l.autoPaySetup && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30">Auto-Pay ✓</span>}
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{l.property} — Unit {l.unit}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{l.start} → {l.end}</span>
                      {l.status === "ACTIVE" && <span className="font-semibold text-slate-600">({l.daysLeft} days left)</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium">Monthly Rent</p>
                    <p className="font-black text-slate-800 text-lg">₦{l.rent.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {s.icon}
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${s.cls}`}>{l.status}</span>
                  </div>
                  <button className="text-xs font-semibold px-3 py-1.5 border border-slate-200 text-slate-600 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
