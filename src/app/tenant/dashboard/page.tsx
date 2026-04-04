import { CreditCard, FileText, MessageSquare, Shield, TrendingUp, Wrench } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/fees";
import Link from "next/link";

async function getTenantData(tenantId: string) {
  const [lease, score, maintenanceCount, rentShield] = await Promise.all([
    db.lease.findFirst({
      where: { tenantId, status: "ACTIVE" },
      include: { unit: { include: { property: true } } },
    }),
    db.tenantScore.findUnique({ where: { tenantId } }),
    db.maintenanceRequest.count({
      where: { tenantId, status: { in: ["OPEN", "IN_PROGRESS"] } },
    }),
    db.rentShield.findUnique({ where: { tenantId } }),
  ]);
  return { lease, score, maintenanceCount, rentShield };
}

export default async function TenantDashboard() {
  const user = await getCurrentUser();
  const data = user ? await getTenantData(user.id) : null;

  const lease = data?.lease;
  const score = data?.score;
  const maintenanceCount = data?.maintenanceCount ?? 0;
  const rentShield = data?.rentShield;

  const scoreLabel =
    !score || score.totalScore === 0 ? "Not scored yet" :
    score.totalScore >= 90 ? "Exceptional" :
    score.totalScore >= 75 ? "Reliable" :
    score.totalScore >= 60 ? "Average" :
    score.totalScore >= 45 ? "At Risk" : "High Risk";

  const shieldPct = rentShield
    ? Math.min(100, Math.round((rentShield.currentBalance / rentShield.targetAmount) * 100))
    : 0;

  // Days remaining on lease
  const daysRemaining = lease
    ? Math.max(0, Math.ceil((new Date(lease.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">My Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Welcome back, {user?.name ?? "Tenant"}! Here&apos;s your property overview.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-bl-full -mr-8 -mt-8" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Next Payment</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {lease ? formatNaira(lease.rentAmount) : "—"}
          </p>
          <div className="flex items-center gap-2 mt-4">
            {lease ? (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full">
                {daysRemaining} days remaining on lease
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full">
                No active lease
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Tenant Score</p>
          <p className="text-3xl font-bold text-[#10b981] mt-2">
            {score ? Math.round(score.totalScore) : "—"}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full uppercase">
              {scoreLabel}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full -mr-8 -mt-8" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Maintenance</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{maintenanceCount}</p>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full">
              {maintenanceCount === 0 ? "No active requests" : `${maintenanceCount} active request${maintenanceCount > 1 ? "s" : ""}`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Lease Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Active Lease</h2>
            <Link href="/tenant/lease" className="text-sm font-bold text-[#10b981] hover:underline">
              View Contract
            </Link>
          </div>
          {lease ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center text-[#10b981]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Property</p>
                  <p className="font-bold text-slate-800">
                    Unit {lease.unit.unitNumber}, {lease.unit.property.name}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase">Start Date</p>
                  <p className="font-bold text-slate-800">
                    {new Date(lease.startDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase">End Date</p>
                  <p className="font-bold text-slate-800">
                    {new Date(lease.endDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-slate-400">
              <FileText className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">No active lease found</p>
            </div>
          )}
        </div>

        {/* Rent Shield Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Rent Shield</h2>
            <Link href="/tenant/shield" className="text-sm font-bold text-[#10b981] hover:underline">
              {rentShield ? "Manage" : "Enroll Now"}
            </Link>
          </div>
          {rentShield ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Balance</p>
                  <p className="text-2xl font-bold text-slate-800">{formatNaira(rentShield.currentBalance)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">Target</p>
                  <p className="text-2xl font-bold text-slate-800">{formatNaira(rentShield.targetAmount)}</p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Shield Progress</span>
                  <span className={shieldPct >= 60 ? "text-[#10b981]" : "text-amber-500"}>{shieldPct}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      shieldPct >= 100 ? "bg-[#10b981]" :
                      shieldPct >= 60 ? "bg-emerald-400" :
                      shieldPct >= 30 ? "bg-amber-400" : "bg-rose-400"
                    }`}
                    style={{ width: `${shieldPct}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  rentShield.shieldLevel === "PLATINUM" ? "bg-purple-100 text-purple-700" :
                  rentShield.shieldLevel === "GOLD" ? "bg-yellow-100 text-yellow-700" :
                  rentShield.shieldLevel === "SILVER" ? "bg-slate-100 text-slate-700" :
                  rentShield.shieldLevel === "BRONZE" ? "bg-orange-100 text-orange-700" :
                  "bg-slate-100 text-slate-500"
                }`}>
                  {rentShield.shieldLevel} SHIELD
                </span>
                {rentShield.badgeEarned && (
                  <span className="text-xs font-bold px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full">
                    ✓ Badge Earned
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Shield className="w-10 h-10 mb-3 text-[#10b981] opacity-60" />
              <p className="text-sm font-bold text-slate-700 mb-1">You&apos;re not enrolled</p>
              <p className="text-xs text-slate-400 mb-4">Save monthly toward your rent and earn badges</p>
              <Link
                href="/tenant/shield"
                className="px-4 py-2 bg-[#10b981] text-white text-xs font-bold rounded-xl hover:bg-[#0da673] transition-colors"
              >
                Start Saving
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0A1428] rounded-3xl border border-[#152342] shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />
        <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/tenant/payments" className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <CreditCard className="w-8 h-8 text-[#10b981] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">Pay Rent</span>
          </Link>
          <Link href="/tenant/maintenance" className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <MessageSquare className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">Request Repair</span>
          </Link>
          <Link href="/tenant/shield" className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <Shield className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">Rent Shield</span>
          </Link>
          <Link href="/tenant/score" className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <TrendingUp className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">My Score</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
