"use client"
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutGrid, Vote, Gem, User, Upload, Binary } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { href: "/gallery", label: "Archive Gallery", icon: LayoutGrid },
    { href: "/main-hall", label: "Main Hall", icon: Gem },
    { href: "/dao", label: "DAO Voting", icon: Vote },
    { href: "/upload", label: "Upload Artifact", icon: Upload },
    { href: "/profile", label: "My Profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <Link href="/gallery" className="flex items-center gap-2 p-2">
            <Binary className="h-8 w-8 text-accent" />
            <h1 className="text-xl font-black tracking-tighter text-sidebar-foreground">Internet Archeology DAO</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                <Link href={item.href}>
                  <item.icon /> 
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
