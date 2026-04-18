"use client";

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
  Shield,
} from "lucide-react";

export function BottomNav({ role = "LANDLORD" }: { role?: "LANDLORD" | "TENANT" }) {
  const pathname = usePathname();

  const navItems =
    role === "LANDLORD"
      ? [
          { name: "Dashboard", href: "/landlord/dashboard", icon: LayoutDashboard },
          { name: "Properties", href: "/landlord/properties", icon: Home },
          { name: "Tenants", href: "/landlord/tenants", icon: Users },
          { name: "Payments", href: "/landlord/payments", icon: CreditCard },
          { name: "Maintenance", href: "/landlord/maintenance", icon: Briefcase },
          { name: "Leases", href: "/landlord/leases", icon: FileText },
          { name: "Settings", href: "/landlord/settings", icon: Settings },
        ]
      : [
          { name: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
          { name: "Payments", href: "/tenant/payments", icon: CreditCard },
          { name: "Shield", href: "/tenant/shield", icon: Shield },
          { name: "Maintenance", href: "/tenant/maintenance", icon: Briefcase },
          { name: "Lease", href: "/tenant/lease", icon: FileText },
          { name: "Score", href: "/tenant/score", icon: Users },
          { name: "Settings", href: "/tenant/settings", icon: Settings },
        ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-[#0A1428]/95 backdrop-blur-lg border-t border-[#152342] shadow-[0_-4px_24px_rgba(0,0,0,0.3)]">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-2.5 gap-1 transition-all duration-200 relative ${
              isActive ? "text-[#10b981]" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            )}
            <item.icon
              className={`w-5 h-5 transition-all ${
                isActive ? "scale-110" : ""
              }`}
            />
            <span className="text-[9px] font-semibold tracking-tight leading-none">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
