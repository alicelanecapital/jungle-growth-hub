export function Vine({ className }: { className?: string }) {
  // Restio grass band — thin vertical stalks of varying heights with sparse seed nodes
  const stalks = [
    { x: 30, h: 44 }, { x: 58, h: 30 }, { x: 74, h: 52 }, { x: 96, h: 38 },
    { x: 120, h: 24 }, { x: 138, h: 50 }, { x: 168, h: 34 }, { x: 190, h: 46 },
    { x: 214, h: 28 }, { x: 236, h: 54 }, { x: 268, h: 40 }, { x: 292, h: 32 },
    { x: 320, h: 48 }, { x: 348, h: 26 }, { x: 372, h: 44 }, { x: 400, h: 36 },
    { x: 428, h: 52 }, { x: 458, h: 30 }, { x: 486, h: 46 }, { x: 512, h: 34 },
    { x: 540, h: 24 }, { x: 566, h: 50 }, { x: 594, h: 38 }, { x: 622, h: 44 },
    { x: 650, h: 30 }, { x: 678, h: 52 }, { x: 706, h: 34 }, { x: 732, h: 42 },
    { x: 760, h: 28 }, { x: 788, h: 48 }, { x: 816, h: 36 }, { x: 844, h: 30 },
    { x: 872, h: 50 }, { x: 900, h: 34 }, { x: 928, h: 46 }, { x: 958, h: 26 },
    { x: 986, h: 44 }, { x: 1014, h: 38 }, { x: 1042, h: 50 }, { x: 1070, h: 30 },
    { x: 1098, h: 42 }, { x: 1128, h: 36 }, { x: 1158, h: 48 }, { x: 1186, h: 32 },
  ];
  const seeds = [96, 236, 400, 566, 732, 900, 1070];
  return (
    <svg
      viewBox="0 0 1200 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* faint ground line */}
      <path d="M0 56 C 300 54, 600 58, 900 55 S 1200 56, 1200 56" strokeWidth="0.6" strokeDasharray="3 6" />
      {stalks.map((s, i) => (
        <path
          key={i}
          d={`M ${s.x} 56 C ${s.x + (i % 2 === 0 ? 1.5 : -1.5)} ${56 - s.h * 0.5}, ${s.x + (i % 3 === 0 ? -1 : 2)} ${56 - s.h * 0.8}, ${s.x + (i % 2 === 0 ? -1 : 1)} ${56 - s.h}`}
          strokeWidth={i % 4 === 0 ? 1 : 0.75}
        />
      ))}
      {seeds.map((x, i) => (
        <ellipse key={`s${i}`} cx={x + (i % 2 === 0 ? -1 : 1)} cy={10 + (i % 2) * 2} rx={2} ry={4} strokeWidth="0.7" />
      ))}
    </svg>
  );
}