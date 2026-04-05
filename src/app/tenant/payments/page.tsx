import { CreditCard, ArrowUpRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/fees";

async function getTenantPayments(tenantId: string) {
  const [payments, lease, escrow] = await Promise.all([
    db.payment.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    }),
    db.lease.findFirst({
      where: { tenantId, status: "ACTIVE" },
      select: { rentAmount: true, endDate: true },
    }),
    db.escrow.findFirst({
      where: { lease: { tenantId }, status: "HELD" },
      select: { amount: true },
    }),
  ]);

  const totalPaid = payments
    .filter(p => p.status === "COMPLETED")
    .reduce((s, p) => s + p.amount, 0);

  return { payments, lease, escrow, totalPaid };
}

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: "bg-green-50 text-green-600",
  PENDING: "bg-amber-50 text-amber-600",
  FAILED: "bg-rose-50 text-rose-500",
  REFUNDED: "bg-slate-100 text-slate-500",
};

export default async function TenantPayments() {
  const user = await getCurrentUser();
  const data = user ? await getTenantPayments(user.id) : { payments: [], lease: null, escrow: null, totalPaid: 0 };

  const daysUntilDue = data.lease
    ? Math.max(0, Math.ceil((new Date(data.lease.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payments & Billing</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage your rent, deposits, and transaction history.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#10b981] hover:bg-[#0da673] text-white rounded-xl h-11 px-6 font-bold shadow-lg shadow-[#10b981]/20 transition-all hover:scale-105">
          <CreditCard className="w-4 h-4" />
          Pay Current Rent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Rent</p>
          <p className="text-3xl font-bold text-slate-800">
            {data.lease ? formatNaira(data.lease.rentAmount) : "—"}
          </p>
          {daysUntilDue !== null && (
            <div className="flex items-center gap-2 text-amber-500">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-bold">{daysUntilDue} days remaining</span>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Paid</p>
          <p className="text-3xl font-bold text-[#10b981]">{formatNaira(data.totalPaid)}</p>
          <p className="text-xs text-slate-400 font-medium">
            Across {data.payments.filter(p => p.status === "COMPLETED").length} transactions
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow Held</p>
          <p className="text-3xl font-bold text-blue-500">
            {data.escrow ? formatNaira(data.escrow.amount) : "₦0"}
          </p>
          <p className="text-xs text-slate-400 uppercase">Security Deposit</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Transaction History</h2>
          <span className="text-xs text-slate-400">{data.payments.length} transactions</span>
        </div>
        {data.payments.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <p className="font-medium">No transactions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{p.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800 text-sm">{formatNaira(p.amount)}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(p.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[p.status] ?? "bg-slate-100 text-slate-500"}`}>
                        {p.status === "COMPLETED" && <CheckCircle2 className="w-3 h-3" />}
                        {p.status === "FAILED" && <XCircle className="w-3 h-3" />}
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}