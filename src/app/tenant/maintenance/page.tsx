import { Clock, Briefcase, CheckCircle2, MessageSquare, Wrench } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewMaintenanceButton } from "@/components/NewMaintenanceButton";

async function getTenantMaintenance(tenantId: string) {
  return db.maintenanceRequest.findMany({
    where: { tenantId },
    include: {
      unit: { include: { property: { select: { name: true } } } },
      vendor: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function TenantMaintenance() {
  const user = await getCurrentUser();
  const requests = user ? await getTenantMaintenance(user.id) : [];

  const active = requests.filter(r => r.status === "OPEN" || r.status === "IN_PROGRESS");
  const resolved = requests.filter(r => r.status === "RESOLVED" || r.status === "CLOSED");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Maintenance</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Report issues and track repair status.</p>
        </div>
        <NewMaintenanceButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">Active Requests ({active.length})</h2>
          <div className="space-y-4">
            {active.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-slate-400">
                <Wrench className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No active requests</p>
              </div>
            ) : active.map(r => (
              <div key={r.id} className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-start justify-between group cursor-pointer hover:bg-amber-100/50 transition-colors">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{r.description}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {r.unit.property.name} • Unit {r.unit.unitNumber}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(r.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      {r.vendor && ` • ${r.vendor.name}`}
                    </p>
                    <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      r.status === "OPEN" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                    }`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <button className="p-2 bg-white text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">History ({resolved.length})</h2>
          <div className="space-y-4">
            {resolved.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-slate-400">
                <CheckCircle2 className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No resolved requests yet</p>
              </div>
            ) : resolved.map(r => (
              <div key={r.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between opacity-80">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#10b981] shadow-sm shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{r.description}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Resolved {new Date(r.updatedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    {r.cost && (
                      <p className="text-xs text-slate-500 mt-0.5">Cost: ₦{r.cost.toLocaleString()}</p>
                    )}
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