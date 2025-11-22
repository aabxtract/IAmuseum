import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Binary } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2 md:hidden">
         <SidebarTrigger />
         <Link href="/gallery" className="flex items-center gap-2">
            <Binary className="h-7 w-7 text-accent" />
            <span className="font-bold">IA-DAO</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button>Connect Wallet</Button>
      </div>
    </header>
  );
}
