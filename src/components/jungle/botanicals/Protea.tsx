export function Protea({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 340"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* stem */}
      <path d="M130 340 C 132 280, 128 220, 130 170" />
      {/* two side leaves on stem */}
      <path d="M130 260 C 90 250, 70 235, 55 210" />
      <path d="M130 230 C 170 222, 195 205, 210 180" />
      {/* outer bracts — layered ellipses radiating from center */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const rx = 68;
        const ry = 22;
        const cx = 130 + Math.cos(a) * 4;
        const cy = 140 + Math.sin(a) * 4;
        const rot = (a * 180) / Math.PI;
        return (
          <ellipse
            key={`b${i}`}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        );
      })}
      {/* inner cluster */}
      {Array.from({ length: 22 }).map((_, i) => {
        const a = (i / 22) * Math.PI * 2;
        const x = 130 + Math.cos(a) * 22;
        const y = 140 + Math.sin(a) * 22;
        return <line key={`i${i}`} x1={130} y1={140} x2={x} y2={y} />;
      })}
      <circle cx="130" cy="140" r="8" />
    </svg>
  );
}