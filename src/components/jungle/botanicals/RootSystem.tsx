export function RootSystem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2="800" y2="10" />
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 40 + i * 65;
        return (
          <g key={i}>
            <path d={`M ${x} 10 C ${x - 10} 60, ${x + 15} 110, ${x - 20} 180`} />
            <path d={`M ${x} 10 C ${x + 5} 50, ${x - 15} 90, ${x + 25} 150`} />
            <path d={`M ${x} 10 C ${x + 20} 40, ${x - 5} 80, ${x + 5} 130`} />
          </g>
        );
      })}
    </svg>
  );
}