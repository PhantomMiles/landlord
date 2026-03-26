import { Briefcase, AlertCircle, Clock, CheckCircle2, MessageSquare } from "lucide-react";

export default function LandlordMaintenance() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Maintenance Tickets</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage repair requests and vendor assignments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#10b981]/20 transition-all flex items-start gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${i === 1 ? 'bg-amber-100 text-amber-500' : 'bg-[#10b981]/10 text-[#10b981]'}`}>
                {i === 1 ? <AlertCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800">Kitchen Sink Leak - Unit {100 + i}</h3>
                    <p className="text-xs text-slate-500 mt-1">Sunshine Court • 14 Adeleke Street, Lekki</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${i === 1 ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                    {i === 1 ? 'URGENT' : 'IN PROGRESS'}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2h ago</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-blue-500" /> 3 Messages</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-all">Assign Vendor</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 h-fit">
          <h3 className="font-bold text-slate-800 leading-none pt-2">Vendor Summary</h3>
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Jobs</p>
              <p className="text-xl font-bold text-slate-800">12</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Vendors</p>
              <p className="text-xl font-bold text-slate-800">8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
