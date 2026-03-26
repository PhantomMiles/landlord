import { CreditCard, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAYMENTS = [
  { id: "1", type: "Rent Payment", amount: 450000, date: "Mar 01, 2026", status: "COMPLETED", method: "Visa •••• 4242" },
  { id: "2", type: "Security Deposit", amount: 900000, date: "Jan 01, 2026", status: "COMPLETED", method: "Bank Transfer" },
  { id: "3", type: "Maintenance Fee", amount: 15000, date: "Feb 15, 2026", status: "COMPLETED", method: "Visa •••• 4242" },
];

export default function TenantPayments() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payments & Billing</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage your rent, deposits, and transaction history.</p>
        </div>
        <Button className="bg-[#10b981] hover:bg-[#0da673] text-white rounded-xl h-11 px-6 font-bold shadow-lg shadow-[#10b981]/20 transition-all hover:scale-105">
          <CreditCard className="w-4 h-4 mr-2" />
          Pay Current Rent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Rent</p>
          <p className="text-3xl font-bold text-slate-800">₦450,000</p>
          <div className="flex items-center gap-2 text-amber-500">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-bold">Due in 8 days</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Paid (2026)</p>
          <p className="text-3xl font-bold text-[#10b981]">₦1,365,000</p>
          <p className="text-xs text-slate-400 font-medium">Across 3 transactions</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow Held</p>
          <p className="text-3xl font-bold text-blue-500">₦900,000</p>
          <p className="text-xs text-slate-400 font-medium font-sans uppercase">Security Deposit HELD</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Transaction History</h2>
          <button className="text-sm font-bold text-slate-400 hover:text-slate-600">Download All CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">transaction</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">method</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAYMENTS.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{p.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">₦{p.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{p.date}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-medium">{p.method}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      {p.status}
                    </span>
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
