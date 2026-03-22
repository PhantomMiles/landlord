import { ShieldCheck, TrendingUp, TrendingDown, Search, Filter, MoreVertical, Mail, Phone } from "lucide-react";

const TENANTS = [
  { id: "1", name: "Jenny Wilson", email: "jenny@example.com", property: "Sunshine Court", unit: "A3", score: 98, grade: "A", status: "Active", rentAmount: 450000, verified: true },
  { id: "2", name: "Marvin McKinney", email: "marvin@example.com", property: "Prime Office Plaza", unit: "B1", score: 94, grade: "A", status: "Active", rentAmount: 1200000, verified: true },
  { id: "3", name: "Dianne Russell", email: "dianne@example.com", property: "Greenview Estate", unit: "C7", score: 91, grade: "A", status: "Active", rentAmount: 350000, verified: true },
  { id: "4", name: "Cody Fisher", email: "cody@example.com", property: "Sunshine Court", unit: "A7", score: 74, grade: "B", status: "Active", rentAmount: 450000, verified: false },
  { id: "5", name: "Esther Howard", email: "esther@example.com", property: "Greenview Estate", unit: "C2", score: 58, grade: "C", status: "Active", rentAmount: 380000, verified: true },
];

const gradeColor: Record<string, string> = {
  A: "text-emerald-600 bg-emerald-50 border-emerald-200",
  B: "text-blue-600 bg-blue-50 border-blue-200",
  C: "text-amber-600 bg-amber-50 border-amber-200",
  D: "text-orange-600 bg-orange-50 border-orange-200",
  F: "text-rose-600 bg-rose-50 border-rose-200",
};

export default function TenantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tenants & Scoring</h1>
          <p className="text-slate-500 mt-1 text-sm">Credibility scores and tenant profiles</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0A1428] text-white rounded-xl font-semibold hover:bg-[#152342] transition-all">
          <ShieldCheck className="w-4 h-4" />
          Run Score Check
        </button>
      </div>

      {/* Score Distribution */}
      <div className="grid grid-cols-5 gap-3">
        {["A (90–100)", "B (75–89)", "C (60–74)", "D (45–59)", "F (<45)"].map((label, i) => {
          const counts = [3, 1, 1, 0, 0];
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
              <p className="text-xs text-slate-500 font-medium">{label}</p>
              <p className="text-2xl font-black text-slate-800 mt-1">{counts[i]}</p>
            </div>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search tenants..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">#</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Tenant</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Property / Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Score</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Rent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TENANTS.map((t, i) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-slate-500 text-sm font-medium">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?img=${i + 5}`} alt={t.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                          {t.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />}
                        </div>
                        <p className="text-xs text-slate-500">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{t.property}</p>
                    <p className="text-xs text-slate-500">Unit {t.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{t.score}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${gradeColor[t.grade]}`}>Grade {t.grade}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${t.score}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">₦{(t.rentAmount / 1000).toFixed(0)}k/mo</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"><Mail className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"><Phone className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
