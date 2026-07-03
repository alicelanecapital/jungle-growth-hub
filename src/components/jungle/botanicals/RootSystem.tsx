export function RootSystem({ className }: { className?: string }) {
  // Aloe rosette above ground with wild trailing roots below — asymmetric
  return (
    <svg
      viewBox="0 0 800 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* faint ground line — broken */}
      <path d="M20 60 L 220 60" strokeWidth="0.7" strokeDasharray="3 6" />
      <path d="M260 60 L 540 60" strokeWidth="0.7" strokeDasharray="3 6" />
      <path d="M580 60 L 780 60" strokeWidth="0.7" strokeDasharray="3 6" />

      {/* aloe rosette — spiky leaves above ground, off-centre left */}
      {[
        "M240 60 C 232 40, 226 22, 232 4",
        "M244 60 C 246 38, 254 20, 268 6",
        "M250 60 C 264 42, 282 28, 302 22",
        "M252 60 C 274 54, 296 46, 316 34",
        "M236 60 C 220 48, 202 38, 184 32",
        "M232 60 C 216 50, 202 32, 194 12",
        "M242 60 C 240 44, 240 26, 244 10",
      ].map((d, i) => (
        <path key={`a${i}`} d={d} strokeWidth={i % 2 === 0 ? 1.1 : 0.9} />
      ))}
      {/* a couple of leaf mid-strokes for texture */}
      <path d="M260 40 L 280 30" strokeWidth="0.6" strokeDasharray="1 4" />
      <path d="M220 44 L 208 38" strokeWidth="0.6" strokeDasharray="1 4" />

      {/* wild trailing roots — asymmetric, sparser on the right */}
      <path d="M242 60 C 238 90, 232 118, 220 148 C 214 162, 210 176, 216 194" strokeWidth="1.1" />
      <path d="M242 60 C 252 96, 268 130, 288 168" strokeWidth="0.9" />
      <path d="M242 60 C 226 100, 200 132, 170 156" strokeWidth="0.9" />
      <path d="M242 60 C 220 88, 190 108, 156 118" strokeWidth="0.7" />
      <path d="M242 60 C 260 100, 290 130, 328 152" strokeWidth="0.7" />
      <path d="M242 60 C 248 108, 246 152, 254 190" strokeWidth="0.8" />
      {/* fine root hairs */}
      <path d="M200 130 L 190 138" strokeWidth="0.6" />
      <path d="M270 140 L 280 148" strokeWidth="0.6" />
      <path d="M232 170 L 224 178" strokeWidth="0.6" />
      <path d="M300 156 L 312 160" strokeWidth="0.6" />

      {/* a lone distant root pair to occupy the wide viewBox subtly */}
      <path d="M600 60 C 604 90, 612 116, 624 140" strokeWidth="0.8" />
      <path d="M600 60 C 592 92, 578 116, 560 132" strokeWidth="0.7" />
      <path d="M600 60 C 610 66, 618 74, 620 86" strokeWidth="0.7" />
      <path d="M580 110 L 574 118" strokeWidth="0.5" strokeDasharray="1 4" />

      {/* scattered ink specks */}
      <path d="M420 90 L 424 92" strokeWidth="0.6" />
      <path d="M480 130 L 484 132" strokeWidth="0.6" />
      <path d="M700 150 L 704 152" strokeWidth="0.6" />
    </svg>
  );
}