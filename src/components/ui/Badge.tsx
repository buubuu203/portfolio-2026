import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/80 transition-transform duration-200 ease-out hover:scale-110",
        className
      )}
    >
      {children}
    </span>
  );
}
