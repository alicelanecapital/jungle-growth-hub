export function LeafSprig({ className }: { className?: string }) {
  // Pincushion (leucospermum) — rough spiky head on a bent stem
  return (
    <svg
      viewBox="0 0 160 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* bent stem */}
      <path d="M20 194 C 44 158, 62 128, 78 96 C 86 80, 96 66, 102 52" strokeWidth="1.1" />
      {/* two narrow stem leaves */}
      <path d="M52 140 C 40 132, 32 124, 26 112 C 40 116, 52 126, 58 138 Z" strokeWidth="0.9" />
      <path d="M78 96 C 92 88, 100 76, 104 62 C 98 78, 92 92, 82 104 Z" strokeWidth="0.9" />
      {/* pincushion head — rough centre + uneven radiating spines */}
      <circle cx="106" cy="42" r="10" strokeWidth="1" />
      {[
        [106, 42, 106, 18], [106, 42, 118, 20], [106, 42, 128, 26],
        [106, 42, 136, 40], [106, 42, 134, 54], [106, 42, 128, 66],
        [106, 42, 116, 70], [106, 42, 100, 70], [106, 42, 88, 62],
        [106, 42, 80, 50], [106, 42, 82, 36], [106, 42, 92, 22],
      ].map(([x1, y1, x2, y2], i) => (
        <path
          key={i}
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          strokeWidth={i % 3 === 0 ? 0.9 : 0.7}
        />
      ))}
      {/* little knob tips on a few spines */}
      <circle cx="106" cy="18" r="1.4" strokeWidth="0.7" />
      <circle cx="136" cy="40" r="1.4" strokeWidth="0.7" />
      <circle cx="88" cy="62" r="1.4" strokeWidth="0.7" />
      <circle cx="128" cy="66" r="1.4" strokeWidth="0.7" />
      {/* scratchy accents */}
      <path d="M40 170 L 46 168" strokeWidth="0.6" strokeDasharray="1 4" />
    </svg>
  );
}