export function PalmFrond({ className }: { className?: string }) {
  // Strelitzia (Crane Flower) — angular, wild, asymmetric
  return (
    <svg
      viewBox="0 0 400 640"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* tall angular stem — bends near the top */}
      <path d="M180 630 C 190 500, 210 370, 216 240 C 220 180, 240 150, 268 118" strokeWidth="1.2" />
      {/* horizontal spathe/sheath (the crane's beak) */}
      <path d="M268 118 C 300 106, 336 108, 370 122 C 350 132, 320 138, 288 132 Z" strokeWidth="1.1" />
      {/* three spiky bird-of-paradise bracts fanning up-left */}
      <path d="M282 122 L 240 40 L 258 96 L 218 60 L 252 108" strokeWidth="1" />
      <path d="M294 118 L 274 30 L 288 96" strokeWidth="1" />
      <path d="M312 116 L 340 40 L 316 100" strokeWidth="1" />
      {/* a small drooping petal below beak */}
      <path d="M310 130 C 322 152, 322 172, 306 186" strokeWidth="0.9" />
      {/* first big paddle leaf, lower left — single outline */}
      <path d="M180 460 C 100 440, 40 380, 30 300 C 60 320, 100 360, 140 400 C 160 420, 175 440, 180 460 Z" strokeWidth="1.1" />
      {/* midrib + a few veins on that leaf */}
      <path d="M180 460 C 140 420, 90 380, 40 320" strokeWidth="0.7" />
      <path d="M80 350 L 110 380" strokeWidth="0.6" strokeDasharray="2 5" />
      <path d="M110 340 L 140 380" strokeWidth="0.6" strokeDasharray="2 5" />
      {/* second paddle leaf, lower right — narrower, angled */}
      <path d="M204 520 C 260 520, 320 480, 356 420 C 320 430, 274 450, 232 484 C 216 496, 208 508, 204 520 Z" strokeWidth="1.1" />
      <path d="M204 520 C 250 490, 300 460, 350 428" strokeWidth="0.7" />
      {/* stray scratchy marks */}
      <path d="M60 500 L 76 508" strokeWidth="0.6" strokeDasharray="1 5" />
      <path d="M340 200 L 352 208" strokeWidth="0.6" strokeDasharray="1 5" />
    </svg>
  );
}