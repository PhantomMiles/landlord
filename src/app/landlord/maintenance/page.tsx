import { AlertCircle, Clock, CheckCircle2, MessageSquare, Briefcase, Wrench } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

async function getMaintenanceData(landlordId: string) {
  const [requests, vendorCount] = await Promise.all([
    db.maintenanceRequest.findMany({
      where: { unit: { property: { landlordId } } },
      include: {
        tenant: { select: { name: true } },
        vendor: { select: { name: true } },
        unit: { include: { property: { select: { name: true, address: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.user.count({ where: { role: "VENDOR" } }),
  ]);
  return { requests, vendorCount };
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  OPEN: <AlertCircle className="w-6 h-6" />,
  IN_PROGRESS: <Clock className="w-6 h-6" />,
  RESOLVED: <CheckCircle2 className="w-6 h-6" />,
  CLOSED: <CheckCircle2 className="w-6 h-6" />,
};

const STATUS_STYLE: Record<string, string> = {
  OPEN: "bg-rose-100 text-rose-500",
  IN_PROGRESS: "bg-amber-100 text-amber-500",
  RESOLVED: "bg-[#10b981]/10 text-[#10b981]",
  CLOSED: "bg-slate-100 text-slate-500",
};

const BADGE_STYLE: Record<string, string> = {
  OPEN: "bg-rose-50 text-rose-500",
  IN_PROGRESS: "bg-amber-50 text-amber-500",
  RESOLVED: "bg-green-50 text-green-600",
  CLOSED: "bg-slate-100 text-slate-500",
};

export default async function LandlordMaintenance() {
  const user = await getCurrentUser();
  const data = user ? await getMaintenanceData(user.id) : { requests: [], vendorCount: 0 };

  const activeRequests = data.requests.filter(r => r.status === "OPEN" || r.status === "IN_PROGRESS");
  const activeJobs = data.requests.filter(r => r.vendorId && r.status === "IN_PROGRESS").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Maintenance Tickets</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Manage repair requests and vendor assignments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          {data.requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 text-slate-400">
              <Wrench className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-bold text-slate-600 mb-1">No maintenance requests</p>
              <p className="text-sm">All clear — no issues reported</p>
            </div>
          ) : (
            data.requests.map((r) => (
              <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#10b981]/20 transition-all flex items-start gap-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${STATUS_STYLE[r.status] ?? "bg-slate-100 text-slate-500"}`}>
                  {STATUS_ICON[r.status]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800">{r.description}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {r.unit.property.name} • Unit {r.unit.unitNumber} • {r.tenant.name}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_STYLE[r.status]}`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(r.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                      </span>
                      {r.vendor && (
                        <span className="flex items-center gap-1 text-[#10b981]">
                          <Briefcase className="w-3.5 h-3.5" /> {r.vendor.name}
                        </span>
                      )}
                      {r.cost && (
                        <span>Cost: ₦{r.cost.toLocaleString()}</span>
                      )}
                    </div>
                    {(r.status === "OPEN" || r.status === "IN_PROGRESS") && (
                      <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-all">
                        {r.vendorId ? "Update Status" : "Assign Vendor"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 h-fit">
          <h3 className="font-bold text-slate-800 leading-none pt-2">Summary</h3>
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Open Requests</p>
              <p className="text-xl font-bold text-slate-800">{activeRequests.length}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Jobs</p>
              <p className="text-xl font-bold text-slate-800">{activeJobs}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Requests</p>
              <p className="text-xl font-bold text-slate-800">{data.requests.length}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Vendors</p>
              <p className="text-xl font-bold text-slate-800">{data.vendorCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}