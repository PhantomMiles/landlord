import { Wrench, Plus, ClipboardList, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const REQUESTS = [
  { id: "1", title: "AC Unit Malfunction", description: "AC not cooling in Unit A3", tenant: "Jenny Wilson", unit: "Sunshine Court / A3", status: "IN_PROGRESS", priority: "High", vendor: "CoolTech Services", date: "Mar 12, 2026", cost: 85000, complexity: "complex" },
  { id: "2", title: "Leaking Pipe", description: "Bathroom pipe leaking in C7", tenant: "Dianne Russell", unit: "Greenview / C7", status: "OPEN", priority: "Urgent", vendor: null, date: "Mar 14, 2026", cost: null, complexity: "simple" },
  { id: "3", title: "Broken Window Latch", description: "Bedroom window doesn't lock", tenant: "Cody Fisher", unit: "Sunshine Court / A7", status: "RESOLVED", priority: "Low", vendor: "FixItNow Ltd", date: "Mar 8, 2026", cost: 15000, complexity: "simple" },
  { id: "4", title: "Electrical Fault", description: "Power fluctuations in unit B1", tenant: "Marvin McKinney", unit: "Prime Office / B1", status: "OPEN", priority: "Urgent", vendor: null, date: "Mar 15, 2026", cost: null, complexity: "complex" },
];

const statusConfig: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  OPEN: { label: "Open", icon: <AlertCircle className="w-4 h-4 text-rose-500" />, cls: "bg-rose-50 text-rose-700 border-rose-200" },
  IN_PROGRESS: { label: "In Progress", icon: <Clock className="w-4 h-4 text-amber-500" />, cls: "bg-amber-50 text-amber-700 border-amber-200" },
  RESOLVED: { label: "Resolved", icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

const priorityColor: Record<string, string> = { Urgent: "text-rose-600 bg-rose-50 border-rose-200", High: "text-amber-600 bg-amber-50 border-amber-200", Low: "text-slate-600 bg-slate-50 border-slate-200" };

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Maintenance</h1>
          <p className="text-slate-500 mt-1 text-sm">Track and manage all property repair requests</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#10b981] text-white rounded-xl font-semibold shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:bg-[#0da673] transition-all hover:scale-105">
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Open", count: REQUESTS.filter(r => r.status === "OPEN").length, cls: "text-rose-500" },
          { label: "In Progress", count: REQUESTS.filter(r => r.status === "IN_PROGRESS").length, cls: "text-amber-500" },
          { label: "Resolved", count: REQUESTS.filter(r => r.status === "RESOLVED").length, cls: "text-emerald-500" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{s.label}</p>
            <p className={`text-3xl font-black mt-1 ${s.cls}`}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        {REQUESTS.map((r) => {
          const s = statusConfig[r.status];
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-slate-800">{r.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityColor[r.priority]}`}>{r.priority}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{r.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{r.tenant}</span>
                      <span>•</span>
                      <span>{r.unit}</span>
                      <span>•</span>
                      <span>{r.date}</span>
                      {r.vendor && <><span>•</span><span className="text-[#10b981] font-semibold">{r.vendor}</span></>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    {s.icon}
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${s.cls}`}>{s.label}</span>
                  </div>
                  {r.cost && (
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Cost</p>
                      <p className="font-bold text-slate-800">₦{r.cost.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400">+₦{((r.complexity === "complex" ? 0.10 : 0.05) * r.cost).toLocaleString()} fee</p>
                    </div>
                  )}
                  {r.status === "OPEN" && (
                    <button className="text-xs font-semibold px-3 py-1.5 bg-[#0A1428] text-white rounded-lg hover:bg-[#152342] transition-colors">
                      Assign Vendor
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
