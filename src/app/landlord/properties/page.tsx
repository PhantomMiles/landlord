import { Building2, Plus, MapPin, Users, TrendingUp } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/fees";

async function getProperties(landlordId: string) {
  return db.property.findMany({
    where: { landlordId },
    include: {
      units: {
        include: {
          leases: { where: { status: "ACTIVE" } },
          _count: { select: { leases: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function PropertiesPage() {
  const user = await getCurrentUser();
  const properties = user ? await getProperties(user.id) : [];

  const totalUnits = properties.reduce((s, p) => s + p.units.length, 0);
  const occupiedUnits = properties.reduce(
    (s, p) => s + p.units.filter(u => u.leases.length > 0).length, 0
  );
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Properties</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage your entire real estate portfolio</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#10b981] text-white rounded-xl font-semibold shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:bg-[#0da673] transition-all hover:scale-105">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Properties</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{properties.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Units</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{totalUnits}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Occupancy Rate</p>
          <p className="text-3xl font-bold text-[#10b981] mt-1">{occupancyRate}%</p>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Building2 className="w-12 h-12 mb-4 opacity-30" />
          <p className="font-bold text-slate-600 mb-1">No properties yet</p>
          <p className="text-sm">Add your first property to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((p) => {
            const occupied = p.units.filter(u => u.leases.length > 0).length;
            const rate = p.units.length > 0 ? Math.round((occupied / p.units.length) * 100) : 0;
            const revenue = p.units
              .flatMap(u => u.leases)
              .reduce((s, l) => s + l.rentAmount, 0);

            return (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-[#0A1428] to-[#152342] relative flex items-end p-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/20 to-transparent" />
                  <div className="relative">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.type === "Commercial" ? "bg-amber-400/20 text-amber-300" : "bg-[#10b981]/20 text-[#10b981]"}`}>
                      {p.type ?? "Residential"}
                    </span>
                  </div>
                  <Building2 className="absolute top-4 right-4 w-8 h-8 text-white/10" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{p.name}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{p.address}{p.city ? `, ${p.city}` : ""}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Units</p>
                      <p className="font-bold text-slate-800 text-lg">{p.units.length}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-green-500" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Occupied</p>
                      </div>
                      <p className="font-bold text-slate-800 text-lg">{occupied}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#10b981]" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Rate</p>
                      </div>
                      <p className="font-bold text-[#10b981] text-lg">{rate}%</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Revenue</p>
                      <p className="font-bold text-slate-800">{revenue > 0 ? formatNaira(revenue) : "—"}</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-semibold text-[#10b981] border border-[#10b981]/30 rounded-xl hover:bg-[#10b981]/5 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}