import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar role="LANDLORD" />
      <div className="flex-1 flex flex-col pl-64 transition-all">
        <Header role="LANDLORD" />
        <main className="flex-1 pt-24 p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
