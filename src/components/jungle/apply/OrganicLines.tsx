// Sparse, hand-drawn frond / leaf-rib motif used as a background decoration.
// Renders as pure SVG using theme tokens via currentColor.

type Props = {
  className?: string;
  variant?: "frond" | "ribs" | "sun";
};

export function OrganicLines({ className, variant = "frond" }: Props) {
  if (variant === "ribs") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M100 10 C 60 80, 60 140, 100 190" />
        {Array.from({ length: 14 }).map((_, i) => {
          const t = 0.08 + i * 0.06;
          const y = 10 + t * 180;
          const curl = 50 - Math.abs(i - 7) * 4;
          return (
            <g key={i}>
              <path d={`M100 ${y} C 80 ${y - 4}, ${100 - curl} ${y - 6}, ${100 - curl - 12} ${y + 4}`} />
              <path d={`M100 ${y} C 120 ${y - 4}, ${100 + curl} ${y - 6}, ${100 + curl + 12} ${y + 4}`} />
            </g>
          );
        })}
      </svg>
    );
  }
  if (variant === "sun") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <circle cx="100" cy="100" r="32" />
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i / 18) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 44;
          const y1 = 100 + Math.sin(a) * 44;
          const x2 = 100 + Math.cos(a) * (66 + (i % 2) * 10);
          const y2 = 100 + Math.sin(a) * (66 + (i % 2) * 10);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </svg>
    );
  }
  // frond
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 320"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M40 310 C 90 240, 130 160, 180 20" />
      {Array.from({ length: 22 }).map((_, i) => {
        const t = i / 21;
        const x = 40 + (180 - 40) * t * 0.95;
        const y = 310 - (310 - 20) * t * 0.95;
        const len = 30 + (1 - Math.abs(t - 0.5) * 2) * 38;
        return (
          <g key={i}>
            <path d={`M${x} ${y} q ${-len * 0.7} ${-len * 0.1}, ${-len} ${len * 0.6}`} />
            <path d={`M${x} ${y} q ${len * 0.7} ${-len * 0.4}, ${len * 1.1} ${-len * 0.2}`} />
          </g>
        );
      })}
    </svg>
  );
}