import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/lib/auth";

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar role="TENANT" />
      <div className="flex-1 flex flex-col md:pl-64 transition-all">
        <Header 
          role="TENANT" 
          user={user ? { name: user.name, email: user.email } : undefined}
        />
        <main className="flex-1 pt-24 p-4 md:p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8 pb-24 md:pb-12">
            {children}
          </div>
        </main>
      </div>
      <BottomNav role="TENANT" />
    </div>
  );
}
