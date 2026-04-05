import { TrendingUp, ShieldCheck, Star, Award, BarChart3, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

async function getTenantScore(tenantId: string) {
  return db.tenantScore.findUnique({
    where: { tenantId },
    include: { tenant: { select: { name: true, isBvnVerified: true, isGovIdVerified: true, isBiometricVerified: true } } },
  });
}

function getGrade(score: number) {
  if (score >= 90) return { grade: "A", label: "Exceptional Tenant", color: "text-purple-400" };
  if (score >= 75) return { grade: "B", label: "Reliable Tenant", color: "text-[#10b981]" };
  if (score >= 60) return { grade: "C", label: "Average Tenant", color: "text-amber-400" };
  if (score >= 45) return { grade: "D", label: "At-Risk Tenant", color: "text-orange-400" };
  return { grade: "F", label: "High-Risk Tenant", color: "text-rose-400" };
}

export default async function TenantScorePage() {
  const user = await getCurrentUser();
  const scoreData = user ? await getTenantScore(user.id) : null;

  const totalScore = Math.round(scoreData?.totalScore ?? 0);
  const { label } = getGrade(totalScore);

  const identityPct = scoreData ? Math.round((scoreData.identityScore / 10) * 100) : 0;
  const financialPct = scoreData ? Math.round((scoreData.financialScore / 40) * 100) : 0;
  const behavioralPct = scoreData ? Math.round((scoreData.behavioralScore / 30) * 100) : 0;
  const engagementPct = scoreData ? Math.round((scoreData.engagementScore / 10) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Personal Credibility</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Your platform reputation and creditworthiness score.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score Card */}
        <div className="bg-[#0A1428] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-[10px] font-bold text-[#10b981] uppercase tracking-[0.2em] mb-4">Official Platform Score</p>
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-white/5 flex items-center justify-center relative">
                <div className="absolute inset-0 border-4 border-[#10b981] rounded-full border-t-transparent -rotate-45" />
                <span className="text-7xl font-bold tracking-tighter">
                  {totalScore > 0 ? totalScore : "—"}
                </span>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#10b981] text-white px-4 py-1 rounded-full text-[10px] font-bold shadow-lg shadow-[#10b981]/20 whitespace-nowrap">
                {totalScore > 0 ? label.toUpperCase() : "NOT SCORED YET"}
              </div>
            </div>
            <p className="mt-8 text-slate-400 text-sm max-w-[200px] leading-relaxed">
              {totalScore >= 75
                ? <>You&apos;re in the <span className="text-white font-bold">top tier</span> of tenants.</>
                : totalScore > 0
                ? "Complete your profile to improve your score."
                : "Your score will appear once activity is recorded."}
            </p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-700 text-sm uppercase tracking-widest">Score Breakdown</h3>
          <ScoreBar label="Identity Verification" value={scoreData?.identityScore ?? 0} max={10} pct={identityPct} weight="10%" icon={<ShieldCheck className="w-4 h-4" />} />
          <ScoreBar label="Financial Stability" value={scoreData?.financialScore ?? 0} max={40} pct={financialPct} weight="40%" icon={<TrendingUp className="w-4 h-4" />} />
          <ScoreBar label="Behavioral History" value={scoreData?.behavioralScore ?? 0} max={30} pct={behavioralPct} weight="30%" icon={<Star className="w-4 h-4" />} />
          <ScoreBar label="Engagement Score" value={scoreData?.engagementScore ?? 0} max={10} pct={engagementPct} weight="10%" icon={<Award className="w-4 h-4" />} />

          {/* Verification Status */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <VerifyBadge label="BVN" verified={scoreData?.tenant.isBvnVerified ?? false} />
            <VerifyBadge label="Gov ID" verified={scoreData?.tenant.isGovIdVerified ?? false} />
            <VerifyBadge label="Biometric" verified={scoreData?.tenant.isBiometricVerified ?? false} />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Insights & Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">What&apos;s helping your score</h4>
            <div className="space-y-2">
              {scoreData?.tenant.isBvnVerified && <InsightItem text="BVN verified — identity confirmed." isPositive />}
              {(scoreData?.paymentStreaks ?? 0) > 0 && (
                <InsightItem text={`${scoreData?.paymentStreaks} consecutive on-time payments recorded.`} isPositive />
              )}
              {!scoreData?.tenant.isBvnVerified && !scoreData?.tenant.isGovIdVerified && (
                <InsightItem text="No activity recorded yet. Make payments to build your score." />
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">How to improve further</h4>
            <div className="space-y-2">
              {!scoreData?.tenant.isBvnVerified && <InsightItem text="Verify your BVN for +4 identity points." />}
              {!scoreData?.tenant.isGovIdVerified && <InsightItem text="Submit a Government ID for +4 identity points." />}
              {!scoreData?.tenant.isBiometricVerified && <InsightItem text="Complete biometric verification for +2 points." />}
              <InsightItem text="Enroll in Rent Shield for +5 behavioral points." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, max, pct, weight, icon }: { label: string; value: number; max: number; pct: number; weight: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-600">
          {icon}
          <span className="text-sm font-bold">{label}</span>
          <span className="text-[10px] text-slate-400 font-bold">({weight})</span>
        </div>
        <span className="text-sm font-bold text-slate-800">{Math.round(value)}/{max}</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${pct >= 75 ? "bg-[#10b981]" : pct >= 40 ? "bg-amber-400" : "bg-rose-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function VerifyBadge({ label, verified }: { label: string; verified: boolean }) {
  return (
    <div className={`p-3 rounded-xl border text-center ${verified ? "bg-[#10b981]/10 border-[#10b981]/30" : "bg-slate-50 border-slate-100"}`}>
      <ShieldCheck className={`w-5 h-5 mx-auto mb-1 ${verified ? "text-[#10b981]" : "text-slate-300"}`} />
      <p className="text-[10px] font-bold text-slate-600">{label}</p>
      <p className={`text-[9px] font-bold ${verified ? "text-[#10b981]" : "text-slate-400"}`}>
        {verified ? "Verified" : "Pending"}
      </p>
    </div>
  );
}

function InsightItem({ text, isPositive }: { text: string; isPositive?: boolean }) {
  return (
    <div className="flex gap-3 items-start p-3 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-colors">
      <ShieldCheck className={`w-4 h-4 mt-0.5 shrink-0 ${isPositive ? "text-[#10b981]" : "text-slate-300"}`} />
      <span className="text-xs font-medium text-slate-600 leading-relaxed">{text}</span>
    </div>
  );
}