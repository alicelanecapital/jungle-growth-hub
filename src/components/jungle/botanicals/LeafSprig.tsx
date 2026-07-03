export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 190 C 40 140, 60 90, 90 20" />
      {[[35, 155, -25], [50, 125, 20], [65, 95, -20], [80, 65, 22], [95, 40, -18]].map(
        ([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx={22} ry={8} transform={`rotate(${r} ${x} ${y})`} />
        ),
      )}
    </svg>
  );
}