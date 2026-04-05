import { ShieldCheck, Download, Plus, FileText } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/fees";

async function getLeases(landlordId: string) {
  return db.lease.findMany({
    where: { unit: { property: { landlordId } } },
    include: {
      tenant: { select: { name: true, email: true } },
      unit: { include: { property: { select: { name: true, address: true } } } },
      escrow: { select: { status: true, amount: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-600",
  TERMINATED: "bg-rose-50 text-rose-500",
  PENDING: "bg-amber-50 text-amber-600",
};

export default async function LandlordLeases() {
  const user = await getCurrentUser();
  const leases = user ? await getLeases(user.id) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Leases & Contracts</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage legal agreements and escrow statuses.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl font-semibold shadow-lg hover:bg-slate-900 transition-all hover:scale-105">
          <Plus className="w-4 h-4" />
          Create New Lease
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {leases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <FileText className="w-12 h-12 mb-4 opacity-30" />
            <p className="font-bold text-slate-600 mb-1">No leases yet</p>
            <p className="text-sm">Create your first lease to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tenant</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rent</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Term</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leases.map((lease) => {
                  const months = Math.ceil(
                    (new Date(lease.endDate).getTime() - new Date(lease.startDate).getTime()) /
                    (1000 * 60 * 60 * 24 * 30)
                  );
                  return (
                    <tr key={lease.id} className="hover:bg-slate-50/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${lease.tenant.email}`} alt={lease.tenant.name} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-700">{lease.tenant.name}</p>
                            <p className="text-[10px] text-slate-400">{lease.tenant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-600">{lease.unit.property.name}</p>
                        <p className="text-[10px] text-slate-400">Unit {lease.unit.unitNumber}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800 text-sm">{formatNaira(lease.rentAmount)}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-500">{months} Months</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[lease.status] ?? "bg-slate-100 text-slate-500"}`}>
                          {lease.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {lease.escrow ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">
                            <ShieldCheck className="w-3 h-3" /> {lease.escrow.status}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">No escrow</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:text-[#10b981] transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}