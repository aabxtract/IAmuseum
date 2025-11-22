import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
            <AppHeader />
            <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
