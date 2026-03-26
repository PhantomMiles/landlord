import { FileText, Calendar, ShieldCheck, Download, Plus } from "lucide-react";

export default function LandlordLeases() {
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
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">tenant</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">property</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">rent</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">term</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">escrow</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?img=${i + 30}`} alt="T" />
                      </div>
                      <span className="font-bold text-sm text-slate-700">James Smith {i}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500">Sunshine Court • 10{i}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">₦450,000</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500">12 Months</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">
                      <ShieldCheck className="w-3 h-3" /> HELD
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:text-[#10b981] transition-all">
                      <Download className="w-4 h-4" />
                    </button>
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
