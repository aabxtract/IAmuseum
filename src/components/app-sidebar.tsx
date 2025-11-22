"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Vote, Gem, User, Upload, PanelLeft } from "lucide-react";
import Link from "next/link";

const menuItems = [
    { href: "/gallery", label: "Archive Gallery", icon: LayoutGrid },
    { href: "/main-hall", label: "Main Hall", icon: Gem },
    { href: "/dao", label: "DAO Voting", icon: Vote },
    { href: "/upload", label: "Upload Artifact", icon: Upload },
    { href: "/profile", label: "My Profile", icon: User },
];

export function AppSidebar() {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button size="icon" variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px]">
            <nav className="grid gap-4 text-lg font-medium mt-8">
            {menuItems.map((item) => (
                <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                <item.icon className="h-5 w-5" />
                {item.label}
                </Link>
            ))}
            </nav>
        </SheetContent>
    </Sheet>
  );
}
