"use client";

import { Users, TrendingUp, ShieldCheck, Star, Award, BarChart3 } from "lucide-react";

export default function TenantScore() {
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
                <span className="text-7xl font-bold tracking-tighter">840</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#10b981] text-white px-4 py-1 rounded-full text-[10px] font-bold shadow-lg shadow-[#10b981]/20 whitespace-nowrap">
                EXCELLENT
              </div>
            </div>
            <p className="mt-8 text-slate-400 text-sm max-w-[200px] leading-relaxed">
              You're in the <span className="text-white font-bold">top 5%</span> of tenants on the platform.
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScoreFactor title="Payment History" value="100%" trend="Perfect" icon={<Star className="w-5 h-5" />} color="text-emerald-500" />
          <ScoreFactor title="Property Care" value="4.8/5" trend="High" icon={<Award className="w-5 h-5" />} color="text-blue-500" />
          <ScoreFactor title="Tenant Duration" value="3.2 yrs" trend="+8 mo" icon={<Users className="w-5 h-5" />} color="text-indigo-500" />
          <ScoreFactor title="Score Progress" value="+24 pts" trend="30 days" icon={<TrendingUp className="w-5 h-5" />} color="text-[#10b981]" />
        </div>
      </div>

      {/* Details Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Insights & Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">What's helping your score</h4>
            <div className="space-y-2">
              <InsightItem text="Consistently paying rent 2 days before the due date." isPositive />
              <InsightItem text="Zero maintenance disputes in the last 24 months." isPositive />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">How to improve further</h4>
            <div className="space-y-2">
              <InsightItem text="Verify your employment details for a +15pt boost." />
              <InsightItem text="Achieve 'Diamond' badge in 4 more months of residency." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreFactor({ title, value, trend, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-slate-50 ${color}`}>{icon}</div>
        <span className="text-[10px] font-bold text-[#10b981] uppercase bg-green-50 px-2 py-0.5 rounded-full">{trend}</span>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function InsightItem({ text, isPositive }: { text: string, isPositive?: boolean }) {
  return (
    <div className="flex gap-3 items-start p-3 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-colors">
      <ShieldCheck className={`w-4 h-4 mt-0.5 shrink-0 ${isPositive ? 'text-[#10b981]' : 'text-slate-300'}`} />
      <span className="text-xs font-medium text-slate-600 leading-relaxed">{text}</span>
    </div>
  );
}
