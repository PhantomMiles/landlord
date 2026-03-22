import { Search, Bell, Menu, FileText, CheckCircle2 } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu toggle (hidden on desktop for MVP) */}
        <button className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight hidden lg:block">
          Dashboard
        </h1>
        
        {/* Action Pills */}
        <div className="hidden lg:flex items-center gap-3 ml-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <span>Verify Tenants</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Review Leases</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Global Search */}
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#10b981] transition-colors" />
          <input
            type="text"
            placeholder="Search properties, tenants..."
            className="w-64 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Date/Context Selector */}
        <div className="hidden sm:flex items-center gap-2 pl-6 border-l border-slate-200">
          <span className="text-sm font-medium text-slate-500">Portfolio:</span>
          <select className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer hover:bg-slate-50 py-1 px-2 rounded-lg transition-colors">
            <option>All Properties</option>
            <option>Commercial</option>
            <option>Residential</option>
          </select>
        </div>
      </div>
    </header>
  );
}
