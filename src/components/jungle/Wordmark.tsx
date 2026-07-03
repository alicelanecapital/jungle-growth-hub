import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display font-medium tracking-[0.22em] uppercase text-[0.72rem] text-primary",
        className,
      )}
    >
      The Jungle
    </span>
  );
}