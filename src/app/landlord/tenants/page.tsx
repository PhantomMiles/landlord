import { Users, ShieldCheck, ArrowUpRight, Search, Filter } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

async function getTenants(landlordId: string) {
  return db.user.findMany({
    where: {
      role: "TENANT",
      leases: { some: { unit: { property: { landlordId } }, status: "ACTIVE" } },
    },
    include: {
      tenantScore: true,
      leases: {
        where: { status: "ACTIVE" },
        include: { unit: { include: { property: { select: { name: true } } } } },
        take: 1,
      },
      payments: {
        where: { type: "RENT", status: "COMPLETED" },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

function getScoreLabel(score: number) {
  if (score >= 90) return { label: "Elite", color: "text-purple-600 bg-purple-50" };
  if (score >= 75) return { label: "Trusted", color: "text-[#10b981] bg-[#10b981]/10" };
  if (score >= 60) return { label: "Watchlist", color: "text-amber-600 bg-amber-50" };
  if (score >= 40) return { label: "High Risk", color: "text-rose-600 bg-rose-50" };
  return { label: "Default Risk", color: "text-red-700 bg-red-50" };
}

export default async function LandlordTenants() {
  const user = await getCurrentUser();
  const tenants = user ? await getTenants(user.id) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tenants & Scoring</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Monitor tenant credibility and portfolio health.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search tenants..." className="bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-[#10b981]/10 outline-none" />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {tenants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Users className="w-12 h-12 mb-4 opacity-30" />
          <p className="font-bold text-slate-600 mb-1">No tenants yet</p>
          <p className="text-sm">Tenants will appear here once they have active leases</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tenants.map((tenant) => {
            const score = Math.round(tenant.tenantScore?.totalScore ?? 0);
            const { label, color } = getScoreLabel(score);
            const lease = tenant.leases[0];
            const lastPayment = tenant.payments[0];

            return (
              <div key={tenant.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-[#10b981]/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?u=${tenant.email}`}
                      alt={tenant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{tenant.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {lease && (
                        <span className="text-[10px] font-bold text-slate-400">
                          Unit {lease.unit.unitNumber} • {lease.unit.property.name}
                        </span>
                      )}
                      {tenant.isBvnVerified && (
                        <>
                          <div className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="text-[10px] font-bold text-[#10b981] flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> BVN VERIFIED
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</p>
                    <p className="text-lg font-bold text-[#10b981]">{score > 0 ? score : "—"}</p>
                    {score > 0 && (
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${color}`}>{label}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Payment</p>
                    <p className="text-sm font-bold text-slate-700">
                      {lastPayment
                        ? new Date(lastPayment.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })
                        : "None"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                    <p className="text-xs font-medium text-slate-600 max-w-[140px] truncate">{tenant.email}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}