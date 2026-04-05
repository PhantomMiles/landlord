import { ArrowDownLeft, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/fees";

async function getPaymentsData(landlordId: string) {
  const [payments, escrowTotal, pendingTotal] = await Promise.all([
    db.payment.findMany({
      where: { lease: { unit: { property: { landlordId } } } },
      include: {
        tenant: { select: { name: true, email: true } },
        lease: { include: { unit: { include: { property: { select: { name: true } } } } } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    db.escrow.aggregate({
      _sum: { amount: true },
      where: { status: "HELD", lease: { unit: { property: { landlordId } } } },
    }),
    db.payment.aggregate({
      _sum: { amount: true },
      where: { status: "PENDING", lease: { unit: { property: { landlordId } } } },
    }),
  ]);

  const revenue = payments
    .filter(p => p.status === "COMPLETED")
    .reduce((s, p) => s + p.amount, 0);

  return {
    payments,
    revenue,
    escrow: escrowTotal._sum.amount ?? 0,
    pending: pendingTotal._sum.amount ?? 0,
  };
}

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: "bg-green-50 text-green-600",
  PENDING: "bg-amber-50 text-amber-600",
  FAILED: "bg-rose-50 text-rose-600",
  REFUNDED: "bg-slate-100 text-slate-500",
};

export default async function LandlordPayments() {
  const user = await getCurrentUser();
  const data = user ? await getPaymentsData(user.id) : { payments: [], revenue: 0, escrow: 0, pending: 0 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Portfolio Financials</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Track revenue, escrow balances, and disbursements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
          <p className="text-3xl font-bold text-[#10b981]">{formatNaira(data.revenue)}</p>
          <p className="text-xs text-slate-400">All completed payments</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
          <p className="text-3xl font-bold text-slate-800">{formatNaira(data.pending)}</p>
          <p className="text-xs text-amber-500 font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Awaiting settlement
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow Total</p>
          <p className="text-3xl font-bold text-blue-500">{formatNaira(data.escrow)}</p>
          <p className="text-xs text-slate-400 uppercase">Held for Security Deposits</p>
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
          <div className="divide-y divide-slate-100">
            {data.payments.map((p) => (
              <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <ArrowDownLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">
                      {p.type} — {p.tenant.name}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {p.lease?.unit?.property?.name ?? "—"} •{" "}
                      {new Date(p.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800 text-sm">{formatNaira(p.amount)}</p>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status] ?? "bg-slate-100 text-slate-500"}`}>
                    {p.status === "COMPLETED" && <CheckCircle2 className="w-3 h-3" />}
                    {p.status === "FAILED" && <XCircle className="w-3 h-3" />}
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}