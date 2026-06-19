import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "mono" | "inverse";
  showWordmark?: boolean;
};

/**
 * The Jungle logo — ember scribbled ring + wordmark.
 * Pure SVG so it scales cleanly and theme-shifts via currentColor.
 */
export function Logo({ className, variant = "default", showWordmark = true }: LogoProps) {
  const wordmarkColor =
    variant === "inverse" ? "text-primary-foreground" : variant === "mono" ? "text-current" : "text-primary";

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <EmberRing variant={variant} />
      {showWordmark && (
        <div className={cn("flex flex-col leading-none font-display font-bold", wordmarkColor)}>
          <span className="text-[0.55em] tracking-[0.32em] opacity-70">THE</span>
          <span className="text-[1em] tracking-[0.18em]">JUNGLE</span>
        </div>
      )}
    </div>
  );
}

function EmberRing({ variant }: { variant: "default" | "mono" | "inverse" }) {
  const useGradient = variant === "default" || variant === "inverse";
  return (
    <svg viewBox="0 0 100 100" className="h-9 w-9 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="ember" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8431F" />
          <stop offset="55%" stopColor="#F08A2A" />
          <stop offset="100%" stopColor="#F4C247" />
        </linearGradient>
      </defs>
      {[0, 18, 36, 54, 72, 90, 108].map((rot, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx={32 - (i % 3)}
          ry={30 + (i % 4)}
          transform={`rotate(${rot} 50 50)`}
          fill="none"
          stroke={useGradient ? "url(#ember)" : "currentColor"}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={0.85}
        />
      ))}
    </svg>
  );
}