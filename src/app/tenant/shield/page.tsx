"use client";

import { useState, useEffect } from "react";
import { Shield, TrendingUp, Award, Zap, ChevronRight, Plus } from "lucide-react";

interface RentShield {
  id: string;
  targetAmount: number;
  currentBalance: number;
  contributionAmount: number;
  frequency: string;
  shieldLevel: string;
  badgeEarned: boolean;
  streakMonths: number;
  autoDeduct: boolean;
  nextContribution: string | null;
  contributions: { id: string; amount: number; status: string; createdAt: string }[];
}

const LEVEL_COLORS: Record<string, string> = {
  PLATINUM: "text-purple-600 bg-purple-100",
  GOLD: "text-yellow-600 bg-yellow-100",
  SILVER: "text-slate-600 bg-slate-100",
  BRONZE: "text-orange-600 bg-orange-100",
  NONE: "text-slate-400 bg-slate-50",
};

export default function RentShieldPage() {
  const [shield, setShield] = useState<RentShield | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [contributing, setContributing] = useState(false);

  // Enrollment form
  const [targetAmount, setTargetAmount] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [frequency, setFrequency] = useState("MONTHLY");
  const [autoDeduct, setAutoDeduct] = useState(true);

  // Contribution form
  const [customAmount, setCustomAmount] = useState("");

  useEffect(() => {
    fetchShield();
  }, []);

  async function fetchShield() {
    try {
      // Get tenantId from session — we use the /api/me pattern
      const meRes = await fetch("/api/me");
      if (!meRes.ok) return;
      const { user } = await meRes.json();

      const res = await fetch(`/api/rent-shield?tenantId=${user.id}`);
      const data = await res.json();
      if (data.shield) {
        setShield(data.shield);
        setPercentage(data.percentage);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleEnroll(e: React.FormEvent) {
    e.preventDefault();
    setEnrolling(true);
    try {
      const meRes = await fetch("/api/me");
      const { user } = await meRes.json();

      const res = await fetch("/api/rent-shield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId: user.id,
          targetAmount: parseFloat(targetAmount),
          contributionAmount: parseFloat(contributionAmount),
          frequency,
          autoDeduct,
        }),
      });
      if (res.ok) await fetchShield();
    } catch (e) {
      console.error(e);
    } finally {
      setEnrolling(false);
    }
  }

  async function handleContribute(amount: number) {
    setContributing(true);
    try {
      const meRes = await fetch("/api/me");
      const { user } = await meRes.json();

      const res = await fetch("/api/rent-shield", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId: user.id, amount }),
      });
      if (res.ok) await fetchShield();
    } catch (e) {
      console.error(e);
    } finally {
      setContributing(false);
      setCustomAmount("");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Rent Shield</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          Save toward your rent in small contributions. Build your financial buffer and earn badges.
        </p>
      </div>

      {!shield ? (
        /* Enrollment Form */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0A1428] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full" />
            <Shield className="w-12 h-12 text-[#10b981] mb-4" />
            <h2 className="text-xl font-bold mb-2">Why Rent Shield?</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex gap-3">
                <Zap className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>Break your rent into small weekly or monthly contributions</span>
              </div>
              <div className="flex gap-3">
                <TrendingUp className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>Boost your Tenant Reliability Score by +5 points</span>
              </div>
              <div className="flex gap-3">
                <Award className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>Earn Bronze → Silver → Gold → Platinum badges</span>
              </div>
              <div className="flex gap-3">
                <Shield className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>Never miss rent — your buffer is always ready</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Enroll in Rent Shield</h2>
            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Rent Amount (Target) ₦
                </label>
                <input
                  type="number"
                  required
                  value={targetAmount}
                  onChange={e => setTargetAmount(e.target.value)}
                  placeholder="e.g. 450000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Contribution Amount ₦
                </label>
                <input
                  type="number"
                  required
                  value={contributionAmount}
                  onChange={e => setContributionAmount(e.target.value)}
                  placeholder="e.g. 30000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["WEEKLY", "MONTHLY"].map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        frequency === f
                          ? "bg-[#10b981] text-white border-[#10b981]"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:border-[#10b981]"
                      }`}
                    >
                      {f === "WEEKLY" ? "Weekly" : "Monthly"}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoDeduct}
                  onChange={e => setAutoDeduct(e.target.checked)}
                  className="w-4 h-4 accent-[#10b981]"
                />
                <span className="text-sm text-slate-600 font-medium">Enable auto-deduct</span>
              </label>
              <button
                type="submit"
                disabled={enrolling}
                className="w-full py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#0da673] transition-all disabled:opacity-50"
              >
                {enrolling ? "Enrolling..." : "Start Rent Shield"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Active Shield Dashboard */
        <div className="space-y-6">
          {/* Main Shield Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-slate-800">Your Rent Shield</h2>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${LEVEL_COLORS[shield.shieldLevel]}`}>
                    {shield.shieldLevel} SHIELD
                  </span>
                  {shield.badgeEarned && (
                    <span className="text-xs font-bold px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" /> Badge Earned
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-sm">
                  {shield.frequency === "WEEKLY" ? "Weekly" : "Monthly"} contribution of ₦{shield.contributionAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase">Streak</p>
                <p className="text-2xl font-bold text-slate-800">{shield.streakMonths} <span className="text-sm text-slate-400">months</span></p>
              </div>
            </div>

            {/* Balance & Progress */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Current Balance</p>
                  <p className="text-3xl font-bold text-slate-800">₦{shield.currentBalance.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">Target</p>
                  <p className="text-xl font-bold text-slate-600">₦{shield.targetAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Bar with percentage */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Rent Shield Progress</span>
                  <span className={percentage >= 60 ? "text-[#10b981]" : percentage >= 30 ? "text-amber-500" : "text-rose-500"}>
                    {percentage}%
                  </span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      percentage >= 100 ? "bg-[#10b981]" :
                      percentage >= 60 ? "bg-emerald-400" :
                      percentage >= 30 ? "bg-amber-400" : "bg-rose-400"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {percentage < 60 && (
                  <p className="text-xs text-amber-600 font-bold">
                    ⚠️ Your Rent Security is weakening. Contribute to strengthen it.
                  </p>
                )}
              </div>
            </div>

            {/* Milestone badges */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: "Bronze", pct: 25, level: "BRONZE" },
                { label: "Silver", pct: 50, level: "SILVER" },
                { label: "Gold", pct: 75, level: "GOLD" },
                { label: "Platinum", pct: 100, level: "PLATINUM" },
              ].map(m => (
                <div
                  key={m.level}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    percentage >= m.pct
                      ? "bg-[#10b981]/10 border-[#10b981]/30"
                      : "bg-slate-50 border-slate-100 opacity-40"
                  }`}
                >
                  <p className="text-lg">{percentage >= m.pct ? "✅" : "🔒"}</p>
                  <p className="text-[10px] font-bold text-slate-600 mt-1">{m.label}</p>
                  <p className="text-[9px] text-slate-400">{m.pct}%</p>
                </div>
              ))}
            </div>

            {/* Contribute section */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-bold text-slate-800 mb-4">Make a Contribution</h3>
              <div className="flex gap-3 flex-wrap mb-4">
                {[shield.contributionAmount, shield.contributionAmount * 2, shield.contributionAmount * 0.5].map((amt, i) => (
                  <button
                    key={i}
                    onClick={() => handleContribute(amt)}
                    disabled={contributing}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:border-[#10b981] hover:bg-[#10b981]/5 transition-all disabled:opacity-50"
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  placeholder="Custom amount ₦"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] outline-none"
                />
                <button
                  onClick={() => customAmount && handleContribute(parseFloat(customAmount))}
                  disabled={contributing || !customAmount}
                  className="px-6 py-2.5 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#0da673] transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {contributing ? "Adding..." : "Contribute"}
                </button>
              </div>
            </div>
          </div>

          {/* Contribution History */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="font-bold text-slate-800 mb-6">Contribution History</h3>
            {shield.contributions.length > 0 ? (
              <div className="space-y-3">
                {shield.contributions.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#10b981]/10 rounded-lg flex items-center justify-center text-[#10b981]">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Contribution</p>
                        <p className="text-xs text-slate-400">
                          {new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">₦{c.amount.toLocaleString()}</p>
                      <span className="text-[10px] font-bold text-[#10b981] uppercase">{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm text-center py-8">No contributions yet. Make your first contribution above.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
