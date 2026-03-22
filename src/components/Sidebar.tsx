"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Home,
  FileText,
  Settings,
  CreditCard,
  Briefcase
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/landlord/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/landlord/properties", icon: Home },
  { name: "Tenants & Scoring", href: "/landlord/tenants", icon: Users },
  { name: "Payments", href: "/landlord/payments", icon: CreditCard },
  { name: "Maintenance", href: "/landlord/maintenance", icon: Briefcase },
  { name: "Leases", href: "/landlord/leases", icon: FileText },
  { name: "Settings", href: "/landlord/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0A1428] text-slate-400 flex flex-col h-full shrink-0 border-r border-[#152342] shadow-xl relative z-20">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-[#152342]/50">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="Real Estate Platform Logo" 
            width={140} 
            height={40} 
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#10b981]/10 text-white"
                  : "hover:bg-[#152342] hover:text-white"
              }`}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-[#10b981]" : "text-slate-500 group-hover:text-white"
                }`}
              />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Area */}
      <div className="p-4 border-t border-[#152342]/50">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#152342] cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Tim Anderson</p>
            <p className="text-xs text-slate-500 truncate">Landlord Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
