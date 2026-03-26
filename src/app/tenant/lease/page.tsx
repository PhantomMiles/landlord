import { FileText, MapPin, Building2, Calendar, ShieldCheck, Download } from "lucide-react";

export default function TenantLease() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Lease Details</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Your current residency and contract information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Property Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#0A1428] to-[#152342] relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-8">
                <span className="text-[10px] font-bold bg-[#10b981] text-white px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Residential</span>
                <h2 className="text-2xl font-bold text-white leading-none">Sunshine Court, Unit 402</h2>
                <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>14 Adeleke Street, Lekki, Lagos</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Rent</p>
                <p className="text-xl font-bold text-slate-800">₦450,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security Deposit</p>
                <p className="text-xl font-bold text-slate-800">₦900,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow Status</p>
                <div className="flex items-center gap-2 text-[#10b981]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-bold text-sm uppercase">Secured</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
            <h3 className="font-bold text-slate-800">Documents</h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-700">Lease Agreement.pdf</p>
                    <p className="text-xs text-slate-400">Signed on Dec 20, 2025</p>
                  </div>
                </div>
                <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-[#10b981] hover:border-[#10b981] transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-700">Building Rules & Regulations.pdf</p>
                    <p className="text-xs text-slate-400">Version 2026.1</p>
                  </div>
                </div>
                <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-[#10b981] hover:border-[#10b981] transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Lease Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
            <h3 className="font-bold text-slate-800 pt-2 leading-none">Timeline</h3>
            <div className="space-y-6 relative ml-1">
              <div className="absolute left-4 top-2 bottom-6 w-px bg-slate-100" />
              <div className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center z-10 shadow-lg shadow-[#10b981]/20">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Start Date</p>
                  <p className="font-bold text-slate-800">Jan 1, 2026</p>
                </div>
              </div>
              <div className="flex gap-4 relative opacity-50">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center z-10">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">End Date</p>
                  <p className="font-bold text-slate-800">Dec 31, 2026</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="p-4 bg-[#10b981]/5 rounded-2xl flex flex-col items-center">
                <p className="text-2xl font-bold text-[#10b981]">283</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Days Remaining</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-4">
            <h3 className="font-bold text-slate-800">Lease Status</h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold tracking-tight">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              ACTIVE / GOOD STANDING
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
