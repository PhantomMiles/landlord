import { Wallet, ArrowDownLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function LandlordPayments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Portfolio Financials</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Track revenue, escrow balances, and disbursements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net Revenue (MTD)</p>
          <p className="text-3xl font-bold text-[#10b981]">₦12,450,000</p>
          <p className="text-xs text-slate-400">+8.5% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Settlements</p>
          <p className="text-3xl font-bold text-slate-800">₦2,100,000</p>
          <p className="text-xs text-amber-500 font-bold">Disbursing in 2 days</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow Total</p>
          <p className="text-3xl font-bold text-blue-500">₦5,400,000</p>
          <p className="text-xs text-slate-400 font-sans uppercase">Held for Security Deposits</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Recent Revenue</h2>
          <button className="text-xs font-bold text-[#10b981]">View All Financials</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-700 text-sm">Rent - Unit {200 + i}</p>
                  <p className="text-xs text-slate-400 font-medium">Mar {10 + i}, 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800 text-sm">₦450,000</p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-tighter">Settled</span>
                  <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
