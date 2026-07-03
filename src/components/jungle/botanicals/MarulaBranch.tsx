export function MarulaBranch({ className }: { className?: string }) {
  // A slanted branch with clusters of small ovate leaves.
  const leaves: Array<[number, number, number]> = [
    [110, 100, -20], [140, 120, 15], [175, 140, -10], [215, 165, 20],
    [255, 195, -15], [300, 225, 12], [90, 160, 25], [120, 190, -18],
    [155, 220, 20], [200, 250, -12], [245, 280, 15], [290, 305, -10],
    [70, 220, 30], [105, 265, -22], [160, 305, 20], [210, 335, -15],
  ];
  return (
    <svg
      viewBox="0 0 480 400"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M40 380 C 140 300, 240 220, 460 40" />
      <path d="M120 300 C 160 280, 200 240, 260 210" />
      <path d="M220 220 C 260 200, 300 160, 340 130" />
      {leaves.map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={16}
          ry={6}
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
    </svg>
  );
}