import { 
  Users, 
  Home, 
  TrendingUp, 
  Wallet,
  MoreVertical,
  Mail,
  Phone,
  ShieldCheck,
  Building2
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-slate-200">
          <button className="px-5 py-2 rounded-lg bg-[#10b981]/10 text-[#10b981] font-semibold text-sm transition-all">Overview</button>
          <button className="px-5 py-2 rounded-lg text-slate-500 font-medium hover:text-slate-700 text-sm transition-all hover:bg-slate-50">Financials</button>
          <button className="px-5 py-2 rounded-lg text-slate-500 font-medium hover:text-slate-700 text-sm transition-all hover:bg-slate-50">Tenants</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tenants" value="1,245" trend="+12.5%" isPositive icon={<Users className="w-5 h-5 text-white" />} />
        <StatCard title="Active Properties" value="48" trend="+2.4%" isPositive icon={<Home className="w-5 h-5 text-white" />} />
        <StatCard title="Monthly Revenue" value="₦ 12.4M" trend="+8.1%" isPositive icon={<Wallet className="w-5 h-5 text-white" />} />
        <StatCard title="Escrow Balance" value="₦ 3.2M" trend="-1.2%" isPositive={false} icon={<Building2 className="w-5 h-5 text-white" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart / Graph Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Average Tenant Score</h2>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-bold text-slate-800">84.5</span>
                <span className="text-sm font-medium text-[#10b981] flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  High Credibility
                </span>
              </div>
            </div>
            <div className="bg-[#10b981] text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm">
              Current Month
            </div>
          </div>
          
          {/* Decorative CSS Chart for MVP */}
          <div className="flex-1 mt-8 flex items-end justify-between px-2 gap-2 sm:gap-4 relative h-48 border-b border-slate-100 pb-2">
            {[40, 65, 45, 80, 55, 95, 75, 85, 60, 90, 70, 85].map((height, i) => (
              <div key={i} className="w-full relative group flex justify-center">
                <div 
                  className="w-full max-w-[32px] bg-gradient-to-t from-[#10b981]/20 to-[#10b981]/80 rounded-t-sm group-hover:to-[#10b981] transition-all cursor-pointer"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap transition-opacity point-events-none">
                    Score: {height}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-4 px-2 font-medium">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Top Tenants List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Top Tenants</h2>
            <button className="text-sm font-semibold text-[#10b981] hover:text-[#10b981]/80 transition-colors">
              View all
            </button>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            <TenantCard name="Jenny Wilson" role="Commercial" score={98} img="https://i.pravatar.cc/150?img=5" />
            <TenantCard name="Marvin McKinney" role="Residential" score={94} img="https://i.pravatar.cc/150?img=12" />
            <TenantCard name="Dianne Russell" role="Corporate" score={91} img="https://i.pravatar.cc/150?img=9" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isPositive, icon }: { title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-500 font-medium text-sm">{title}</p>
        <div className="w-10 h-10 rounded-xl bg-[#10b981] flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <span className={`text-sm font-semibold flex items-center ${isPositive ? 'text-[#10b981]' : 'text-rose-500'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function TenantCard({ name, role, score, img }: { name: string, role: string, score: number, img: string }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 hover:border-[#10b981]/30 hover:bg-[#10b981]/5 transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex gap-3 items-center">
          <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-800 text-sm leading-tight">{name}</h4>
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold px-2 py-0.5 bg-orange-100 text-orange-700 rounded-md">
                {role}
              </span>
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Credibility</p>
          <p className="font-bold text-slate-800 text-sm">{score}/100</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:border-[#10b981] transition-colors">
            <Mail className="w-3.5 h-3.5" /> EM
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:border-[#10b981] transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call
          </button>
        </div>
      </div>
    </div>
  );
}
