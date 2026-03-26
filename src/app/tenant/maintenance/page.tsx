import { Plus, Clock, Briefcase, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const REQUESTS = [
  { id: "1", title: "Kitchen Sink Leak", date: "Mar 10, 2026", status: "IN_PROGRESS", priority: "MEDIUM" },
  { id: "2", title: "AC Maintenance", date: "Jan 15, 2026", status: "RESOLVED", priority: "LOW" },
];

export default function TenantMaintenance() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Maintenance</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Report issues and track repair status.</p>
        </div>
        <Button className="bg-[#10b981] hover:bg-[#0da673] text-white rounded-xl h-11 px-6 font-bold shadow-lg shadow-[#10b981]/20 transition-all hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">Active Requests</h2>
          <div className="space-y-4">
            {REQUESTS.filter(r => r.status !== "RESOLVED").map(r => (
              <div key={r.id} className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-start justify-between group cursor-pointer hover:bg-amber-100/50 transition-colors">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{r.date} • {r.priority} Priority</p>
                  </div>
                </div>
                <button className="p-2 bg-white text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ))}
            {REQUESTS.filter(r => r.status !== "RESOLVED").length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">No active requests.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">History</h2>
          <div className="space-y-4">
            {REQUESTS.filter(r => r.status === "RESOLVED").map(r => (
              <div key={r.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between opacity-70">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#10b981] shadow-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium font-sans uppercase">Resolved Mar 12, 2026</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0A1428] rounded-3xl border border-[#152342] shadow-xl p-8 flex items-center justify-between text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
        <div className="flex gap-6 items-center">
          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-[#10b981]" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">Need Urgent Help?</h3>
            <p className="text-slate-400 text-sm mt-1">Contact our 24/7 maintenance hotline for emergencies.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white text-[#0A1428] rounded-xl font-bold hover:bg-[#10b981] hover:text-white transition-all">
          Call Dispatch
        </button>
      </div>
    </div>
  );
}
