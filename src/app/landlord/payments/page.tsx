import { Wallet, TrendingUp, Download, Search, CheckCircle2, Clock, XCircle } from "lucide-react";

const PAYMENTS = [
  { id: "1", tenant: "Jenny Wilson", type: "Rent", amount: 450000, fee: 9000, status: "COMPLETED", date: "Mar 1, 2026", property: "Sunshine Court / A3", ref: "TXN-001" },
  { id: "2", tenant: "Marvin McKinney", type: "Rent", amount: 1200000, fee: 24000, status: "COMPLETED", date: "Mar 1, 2026", property: "Prime Office / B1", ref: "TXN-002" },
  { id: "3", tenant: "Cody Fisher", type: "Rent", amount: 450000, fee: 9000, status: "PENDING", date: "Mar 5, 2026", property: "Sunshine Court / A7", ref: "TXN-003" },
  { id: "4", tenant: "Dianne Russell", type: "Maintenance", amount: 85000, fee: 4250, status: "COMPLETED", date: "Feb 28, 2026", property: "Greenview / C7", ref: "TXN-004" },
  { id: "5", tenant: "Esther Howard", type: "Escrow", amount: 760000, fee: 15200, status: "COMPLETED", date: "Feb 20, 2026", property: "Greenview / C2", ref: "TXN-005" },
  { id: "6", tenant: "Cody Fisher", type: "Rent", amount: 450000, fee: 9000, status: "FAILED", date: "Feb 1, 2026", property: "Sunshine Court / A7", ref: "TXN-006" },
];

const statusIcon = {
  COMPLETED: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  PENDING: <Clock className="w-4 h-4 text-amber-500" />,
  FAILED: <XCircle className="w-4 h-4 text-rose-500" />,
};

const statusBadge: Record<string, string> = {
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  FAILED: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function PaymentsPage() {
  const totalRevenue = PAYMENTS.filter(p => p.status === "COMPLETED").reduce((s, p) => s + p.amount, 0);
  const totalFees = PAYMENTS.filter(p => p.status === "COMPLETED").reduce((s, p) => s + p.fee, 0);
  const pending = PAYMENTS.filter(p => p.status === "PENDING").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payments</h1>
          <p className="text-slate-500 mt-1 text-sm">All rent, maintenance, and escrow transactions</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-all">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-[#10b981]/10 rounded-xl flex items-center justify-center"><Wallet className="w-5 h-5 text-[#10b981]" /></div>
            <p className="text-sm font-semibold text-slate-500">Total Collected</p>
          </div>
          <p className="text-3xl font-black text-slate-800">₦{(totalRevenue / 1000000).toFixed(2)}M</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center"><TrendingUp className="w-5 h-5 text-blue-500" /></div>
            <p className="text-sm font-semibold text-slate-500">Platform Fees</p>
          </div>
          <p className="text-3xl font-black text-slate-800">₦{(totalFees / 1000).toFixed(0)}k</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center"><Clock className="w-5 h-5 text-amber-500" /></div>
            <p className="text-sm font-semibold text-slate-500">Pending</p>
          </div>
          <p className="text-3xl font-black text-slate-800">{pending}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search by tenant, reference..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Reference</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Tenant</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Fee (2%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAYMENTS.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{p.ref}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800 text-sm">{p.tenant}</p>
                    <p className="text-xs text-slate-500">{p.property}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${p.type === "Rent" ? "bg-blue-50 text-blue-700 border-blue-200" : p.type === "Escrow" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">₦{p.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">₦{p.fee.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{p.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {statusIcon[p.status as keyof typeof statusIcon]}
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusBadge[p.status]}`}>{p.status}</span>
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
