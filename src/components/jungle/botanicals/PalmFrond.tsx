export function PalmFrond({ className }: { className?: string }) {
  // Long central rachis with paired pinnate leaflets — asymmetric, hand-drawn feel.
  const leaflets: Array<[number, number, number, number]> = [];
  for (let i = 0; i < 22; i++) {
    const t = i / 22;
    const x = 200 - t * 160;
    const y = 40 + t * 520;
    const spread = 90 - t * 30;
    const droop = 30 + t * 40;
    leaflets.push([x, y, x - spread, y + droop]);
    leaflets.push([x, y, x + spread, y + droop]);
  }
  return (
    <svg
      viewBox="0 0 400 640"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M200 30 C 180 200, 140 380, 40 610" />
      {leaflets.map(([x1, y1, x2, y2], i) => (
        <path key={i} d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 12}, ${x2} ${y2}`} />
      ))}
    </svg>
  );
}