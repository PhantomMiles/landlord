import { Building2, Plus, MapPin, Users, TrendingUp } from "lucide-react";

const PROPERTIES = [
  { id: "1", name: "Sunshine Court", address: "14 Adeleke Street, Lekki", city: "Lagos", type: "Residential", units: 12, occupied: 10, revenue: 2400000 },
  { id: "2", name: "Prime Office Plaza", address: "7 Victoria Island Drive", city: "Lagos", type: "Commercial", units: 6, occupied: 6, revenue: 5200000 },
  { id: "3", name: "Greenview Estate", address: "22 Abuja Crescent, Maitama", city: "Abuja", type: "Residential", units: 20, occupied: 14, revenue: 3100000 },
];

export default function PropertiesPage() {
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

      {/* Summary Strips */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Properties</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{PROPERTIES.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Units</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{PROPERTIES.reduce((s, p) => s + p.units, 0)}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Occupancy Rate</p>
          <p className="text-3xl font-bold text-[#10b981] mt-1">
            {Math.round((PROPERTIES.reduce((s, p) => s + p.occupied, 0) / PROPERTIES.reduce((s, p) => s + p.units, 0)) * 100)}%
          </p>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {PROPERTIES.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
            {/* Property Image Placeholder */}
            <div className="h-40 bg-gradient-to-br from-[#0A1428] to-[#152342] relative flex items-end p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/20 to-transparent" />
              <div className="relative">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.type === "Commercial" ? "bg-amber-400/20 text-amber-300" : "bg-[#10b981]/20 text-[#10b981]"}`}>
                  {p.type}
                </span>
              </div>
              <Building2 className="absolute top-4 right-4 w-8 h-8 text-white/10" />
            </div>

            <div className="p-5">
              <h3 className="font-bold text-slate-800 text-lg leading-tight">{p.name}</h3>
              <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{p.address}, {p.city}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Units</p>
                  <p className="font-bold text-slate-800 text-lg">{p.units}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-green-500" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Occupied</p>
                  </div>
                  <p className="font-bold text-slate-800 text-lg">{p.occupied}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#10b981]" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Rate</p>
                  </div>
                  <p className="font-bold text-[#10b981] text-lg">{Math.round((p.occupied / p.units) * 100)}%</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Revenue</p>
                  <p className="font-bold text-slate-800">₦{(p.revenue / 1000000).toFixed(1)}M</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-[#10b981] border border-[#10b981]/30 rounded-xl hover:bg-[#10b981]/5 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
