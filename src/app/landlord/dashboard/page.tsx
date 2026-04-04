import { Users, Home, Wallet, Building2, TrendingUp, ShieldCheck, MoreVertical, Mail, Phone } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/fees";

async function getLandlordData(landlordId: string) {
  const [propertyCount, tenantCount, recentPayments, escrowTotal, topTenants, maintenanceOpen] = await Promise.all([
    db.property.count({ where: { landlordId } }),
    db.user.count({
      where: {
        role: "TENANT",
        leases: { some: { unit: { property: { landlordId } }, status: "ACTIVE" } },
      },
    }),
    db.payment.findMany({
      where: {
        status: "COMPLETED",
        type: "RENT",
        lease: { unit: { property: { landlordId } } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { amount: true, platformFee: true, createdAt: true },
    }),
    db.escrow.aggregate({
      _sum: { amount: true },
      where: { status: "HELD", lease: { unit: { property: { landlordId } } } },
    }),
    db.user.findMany({
      where: {
        role: "TENANT",
        leases: { some: { status: "ACTIVE", unit: { property: { landlordId } } } },
        tenantScore: { isNot: null },
      },
      include: {
        tenantScore: true,
        leases: {
          where: { status: "ACTIVE" },
          include: { unit: { include: { property: { select: { name: true } } } } },
          take: 1,
        },
      },
      orderBy: { tenantScore: { totalScore: "desc" } },
      take: 3,
    }),
    db.maintenanceRequest.count({
      where: { status: { in: ["OPEN", "IN_PROGRESS"] }, unit: { property: { landlordId } } },
    }),
  ]);

  const monthlyRevenue = recentPayments.reduce((sum, p) => sum + p.amount, 0);
  const escrowBalance = escrowTotal._sum.amount ?? 0;

  return { propertyCount, tenantCount, monthlyRevenue, escrowBalance, topTenants, maintenanceOpen };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const data = user ? await getLandlordData(user.id) : null;

  const stats = {
    tenants: data?.tenantCount ?? 0,
    properties: data?.propertyCount ?? 0,
    revenue: data?.monthlyRevenue ?? 0,
    escrow: data?.escrowBalance ?? 0,
  };

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
        <StatCard title="Total Tenants" value={stats.tenants.toLocaleString()} trend="" isPositive icon={<Users className="w-5 h-5 text-white" />} />
        <StatCard title="Active Properties" value={stats.properties.toLocaleString()} trend="" isPositive icon={<Home className="w-5 h-5 text-white" />} />
        <StatCard title="Total Revenue" value={formatNaira(stats.revenue)} trend="" isPositive icon={<Wallet className="w-5 h-5 text-white" />} />
        <StatCard title="Escrow Balance" value={formatNaira(stats.escrow)} trend="" isPositive icon={<Building2 className="w-5 h-5 text-white" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats overview panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Portfolio Overview</h2>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-bold text-slate-800">{stats.properties}</span>
                <span className="text-sm font-medium text-[#10b981] flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Properties Managed
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Tenants</p>
              <p className="text-2xl font-bold text-slate-800">{stats.tenants}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Open Maintenance</p>
              <p className="text-2xl font-bold text-slate-800">{data?.maintenanceOpen ?? 0}</p>
            </div>
            <div className="p-4 bg-[#10b981]/5 rounded-2xl border border-[#10b981]/20">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue Collected</p>
              <p className="text-2xl font-bold text-[#10b981]">{formatNaira(stats.revenue)}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Escrow Held</p>
              <p className="text-2xl font-bold text-blue-600">{formatNaira(stats.escrow)}</p>
            </div>
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
            {data?.topTenants && data.topTenants.length > 0 ? (
              data.topTenants.map((tenant, i) => (
                <TenantCard
                  key={tenant.id}
                  name={tenant.name}
                  property={tenant.leases[0]?.unit?.property?.name ?? "Unknown"}
                  score={Math.round(tenant.tenantScore?.totalScore ?? 0)}
                  img={`https://i.pravatar.cc/150?u=${tenant.email}`}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-slate-400">
                <Users className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No tenants yet</p>
              </div>
            )}
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
        {trend && (
          <span className={`text-sm font-semibold flex items-center ${isPositive ? 'text-[#10b981]' : 'text-rose-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function TenantCard({ name, property, score, img }: { name: string, property: string, score: number, img: string }) {
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
            <span className="text-xs font-semibold text-slate-400">{property}</span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Score</p>
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
