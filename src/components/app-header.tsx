import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Binary, LayoutGrid, Gem, Vote, Upload, User } from "lucide-react";
import { AppSidebar } from "./app-sidebar";

const navItems = [
    { href: "/gallery", label: "Archive Gallery", icon: LayoutGrid },
    { href: "/main-hall", label: "Main Hall", icon: Gem },
    { href: "/dao", label: "DAO Voting", icon: Vote },
    { href: "/upload", label: "Upload Artifact", icon: Upload },
    { href: "/profile", label: "My Profile", icon: User },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2 mr-4">
         <Link href="/gallery" className="flex items-center gap-2">
            <Binary className="h-7 w-7 text-accent" />
            <span className="font-bold text-lg hidden sm:inline-block">Internet Archeology DAO</span>
        </Link>
      </div>
      
      <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <Button>Connect Wallet</Button>
        <div className="md:hidden">
            <AppSidebar />
        </div>
      </div>
    </header>
  );
}
