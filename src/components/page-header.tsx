import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl text-foreground/80 relative">
        {title}
        <span className="absolute -bottom-1 left-0 h-1 w-16 bg-accent"></span>
      </h1>
      <p className="max-w-[700px] text-foreground/60 md:text-xl">
        {description}
      </p>
    </div>
  );
}
