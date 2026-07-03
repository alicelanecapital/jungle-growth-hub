export function Vine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 30 C 200 5, 400 55, 600 30 S 1000 5, 1200 30" />
      {[100, 300, 500, 700, 900, 1100].map((x, i) => (
        <ellipse key={i} cx={x} cy={30 + (i % 2 === 0 ? -18 : 18)} rx={10} ry={4} />
      ))}
    </svg>
  );
}