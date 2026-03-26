import { Users, Search, Filter, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function LandlordTenants() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tenants & Scoring</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Monitor tenant credibility and portfolio health.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-[#10b981]" />
            <input type="text" placeholder="Search tenants..." className="bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-[#10b981]/10 outline-none" />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-[#10b981]/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="Tenant" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Tenant Name {i}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-slate-400">Unit 10{i} • Sunshine Court</span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-bold text-[#10b981] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</p>
                <p className="text-lg font-bold text-[#10b981]">8{i}0</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rent Status</p>
                <p className="text-sm font-bold text-slate-700">Paid</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
