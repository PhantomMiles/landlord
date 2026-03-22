import { LayoutDashboard, CreditCard, Settings, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";

const TENANT_NAV = [
  { name: "My Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
  { name: "Rent & Payments", href: "/tenant/dashboard/payments", icon: CreditCard },
  { name: "Maintenance", href: "/tenant/dashboard/maintenance", icon: Wrench },
  { name: "Settings", href: "/tenant/dashboard/settings", icon: Settings },
];

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Tenant Sidebar (Lighter Theme compared to Landlord) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 relative z-20">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Real Estate Platform Logo" 
              width={120} 
              height={36} 
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {TENANT_NAV.map((item) => {
            const isActive = item.name === "My Dashboard";
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-[#10b981]/10 text-[#10b981]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
