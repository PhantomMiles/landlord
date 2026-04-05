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
  Briefcase,
  Shield
} from "lucide-react";

export function Sidebar({ role = "LANDLORD" }: { role?: "LANDLORD" | "TENANT" }) {
  const pathname = usePathname();

  const navItems = role === "LANDLORD" ? [
    { name: "Dashboard", href: "/landlord/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/landlord/properties", icon: Home },
    { name: "Tenants & Scoring", href: "/landlord/tenants", icon: Users },
    { name: "Payments", href: "/landlord/payments", icon: CreditCard },
    { name: "Maintenance", href: "/landlord/maintenance", icon: Briefcase },
    { name: "Leases", href: "/landlord/leases", icon: FileText },
    { name: "Settings", href: "/landlord/settings", icon: Settings },
  ] : [
    { name: "My Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
    { name: "My Payments", href: "/tenant/payments", icon: CreditCard },
    { name: "Rent Shield", href: "/tenant/shield", icon: Shield },  
    { name: "Maintenance", href: "/tenant/maintenance", icon: Briefcase },
    { name: "My Lease", href: "/tenant/lease", icon: FileText },
    { name: "My Score", href: "/tenant/score", icon: Users },
    { name: "Settings", href: "/tenant/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#0A1428] text-slate-400 flex flex-col shrink-0 border-r border-[#152342] shadow-xl z-30">
      {/* Logo Area */}
      <div className="h-20 flex my-8 items-center px-6 border-b border-[#152342]/50">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt=" Logo" 
            width={100} 
            height={30} 
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Main Menu</div>
        {navItems.map((item) => {
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
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Empty space/Footer */}
      <div className="p-8"></div>
    </aside>
  );
}
