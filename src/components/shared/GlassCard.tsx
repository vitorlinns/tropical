import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  rounded?: "lg" | "xl" | "2xl" | "3xl";
}

export function GlassCard({ children, className, strong = false, rounded = "2xl" }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        `rounded-${rounded}`,
        "overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
