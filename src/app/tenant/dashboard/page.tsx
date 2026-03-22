import { ShieldCheck, CreditCard, Wrench } from "lucide-react";

export default function TenantDashboard() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back, Tim</h1>
          <p className="text-slate-500 mt-1">Here is your tenancy score and active lease details.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#10b981] text-white rounded-xl font-semibold shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:scale-105 transition-all">
          Pay Rent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#10b981]/10 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#10b981]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Your Credibility Score</h2>
              <p className="text-sm text-slate-500">Updated today</p>
            </div>
          </div>
          
          <div className="flex items-end gap-4">
            <div className="text-6xl font-black text-slate-800 tracking-tighter">94</div>
            <div className="text-lg font-medium text-slate-500 pb-2">/ 100</div>
          </div>
          
          <div className="mt-8 space-y-4">
            <ScoreBar label="Identity Verified" value={100} color="bg-blue-500" />
            <ScoreBar label="Financial Stability" value={90} color="bg-emerald-500" />
            <ScoreBar label="Behavioral History" value={95} color="bg-purple-500" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Next Rent Due</h3>
            <p className="text-2xl font-bold text-slate-800 mt-2">₦ 450,000</p>
            <p className="text-sm text-slate-500 mt-1">Due in 14 days (Nov 1)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Active Requests</h3>
            <p className="text-2xl font-bold text-slate-800 mt-2">1 Pending</p>
            <p className="text-sm text-slate-500 mt-1">AC Maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-semibold mb-1">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-800">{value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
