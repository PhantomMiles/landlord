import { CreditCard, FileText, LayoutDashboard, MessageSquare, TrendingUp, Users } from "lucide-react";

export default function TenantDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">My Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Welcome back, Jane! Here's your property overview.</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-bl-full -mr-8 -mt-8 px-4" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Next Payment</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">₦450,000</p>
          <div className="flex items-center gap-2 mt-4 text-[#10b981]">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#10b981]/10 rounded-full">Due April 1st</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Tenant Score</p>
          <p className="text-3xl font-bold text-[#10b981] mt-2">840</p>
          <div className="flex items-center gap-2 mt-4 text-blue-500">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/10 rounded-full font-sans uppercase">Excellent Status</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full -mr-8 -mt-8" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Maintenance</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
          <div className="flex items-center gap-2 mt-4 text-slate-400">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-full">No active requests</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Lease Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Active Lease</h2>
            <button className="text-sm font-bold text-[#10b981] hover:underline">View Contract</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center text-[#10b981]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Property Info</p>
                <p className="font-bold text-slate-800">Unit 402, Sunshine Court</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">Start Date</p>
                <p className="font-bold text-slate-800">Jan 1, 2026</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">End Date</p>
                <p className="font-bold text-slate-800">Dec 31, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0A1428] rounded-3xl border border-[#152342] shadow-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />
          <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
              <CreditCard className="w-8 h-8 text-[#10b981] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Pay Rent</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
              <MessageSquare className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Request Repair</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
