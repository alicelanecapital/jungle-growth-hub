export function MarulaBranch({ className }: { className?: string }) {
  // Silver Tree (Leucadendron argenteum) branch — sparse, wild
  return (
    <svg
      viewBox="0 0 480 400"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* main diagonal branch */}
      <path d="M30 384 C 140 320, 250 240, 468 30" strokeWidth="1.3" />
      {/* two lesser offshoots */}
      <path d="M180 280 C 220 240, 260 200, 288 158" strokeWidth="1" />
      <path d="M300 190 C 328 172, 348 148, 366 118" strokeWidth="0.9" />
      {/* elongated pointed leaves — irregular clusters, outlines + centre-stroke suggestions */}
      {/* base cluster */}
      <path d="M72 356 C 80 336, 88 322, 106 314 C 100 336, 92 350, 78 362 Z" strokeWidth="1" />
      <path d="M96 340 L 132 302" strokeWidth="0.8" />
      <path d="M118 322 C 128 300, 142 288, 160 284 C 154 304, 142 320, 124 330 Z" strokeWidth="1" />
      {/* mid cluster */}
      <path d="M188 268 L 232 218" strokeWidth="0.8" />
      <path d="M204 258 C 214 234, 232 220, 254 218 C 244 240, 226 258, 208 268 Z" strokeWidth="1" />
      <path d="M226 240 L 268 196" strokeWidth="0.8" />
      <path d="M248 224 C 262 200, 282 188, 304 188 C 292 210, 274 226, 254 234 Z" strokeWidth="1" />
      {/* upper cluster */}
      <path d="M300 190 L 342 150" strokeWidth="0.8" />
      <path d="M320 176 C 332 152, 352 138, 376 138 C 364 162, 344 180, 322 188 Z" strokeWidth="1" />
      <path d="M350 158 L 390 118" strokeWidth="0.8" />
      <path d="M382 130 C 392 108, 410 96, 432 96 C 420 118, 402 134, 384 142 Z" strokeWidth="1" />
      <path d="M404 108 L 438 74" strokeWidth="0.8" />
      {/* scratchy silver-hair texture */}
      <path d="M140 300 L 148 296" strokeWidth="0.6" strokeDasharray="1 5" />
      <path d="M260 210 L 268 206" strokeWidth="0.6" strokeDasharray="1 5" />
      <path d="M380 100 L 388 96" strokeWidth="0.6" strokeDasharray="1 5" />
    </svg>
  );
}