export function Protea({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 340"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* wild king protea — off-centre, hand-drawn */}
      {/* leaning stem, breaks the vertical */}
      <path d="M118 338 C 126 300, 138 258, 134 208 C 132 188, 128 178, 138 168" strokeWidth="1.2" />
      {/* one rough stem leaf */}
      <path d="M132 268 C 96 262, 78 244, 62 220 C 84 236, 108 248, 132 262" strokeWidth="0.9" />
      {/* central bulb */}
      <path d="M100 172 C 96 148, 108 128, 138 122 C 168 118, 188 138, 186 168 C 184 194, 158 208, 130 202 C 108 198, 102 188, 100 172 Z" strokeWidth="1.1" />
      {/* outer bracts — irregular teardrops, loose and overlapping */}
      <path d="M138 122 C 132 96, 130 74, 142 58 C 150 76, 152 100, 148 122" strokeWidth="1" />
      <path d="M162 128 C 176 110, 194 100, 214 100 C 202 116, 186 130, 172 138" strokeWidth="1" />
      <path d="M180 158 C 208 158, 226 172, 232 190 C 214 190, 196 182, 182 172" strokeWidth="0.9" />
      <path d="M180 190 C 200 208, 210 232, 208 254 C 190 240, 178 220, 174 202" strokeWidth="1" />
      <path d="M148 208 C 152 234, 148 258, 132 274 C 128 254, 130 232, 138 210" strokeWidth="1" />
      <path d="M116 200 C 100 224, 76 234, 54 232 C 68 214, 88 200, 108 194" strokeWidth="0.9" />
      <path d="M100 168 C 74 168, 54 152, 46 132 C 66 134, 88 144, 104 158" strokeWidth="1" />
      <path d="M108 138 C 90 118, 82 92, 88 68 C 102 84, 114 104, 120 124" strokeWidth="1" />
      {/* inner filament cluster — uneven radiating strokes */}
      <path d="M140 168 L 136 146" strokeWidth="0.8" />
      <path d="M148 172 L 160 158" strokeWidth="0.8" />
      <path d="M150 178 L 168 182" strokeWidth="0.8" />
      <path d="M140 184 L 146 200" strokeWidth="0.8" />
      <path d="M130 180 L 118 194" strokeWidth="0.8" />
      <path d="M124 172 L 108 168" strokeWidth="0.8" />
      <path d="M128 164 L 118 150" strokeWidth="0.8" />
      <path d="M136 160 L 138 176" strokeWidth="0.8" />
      {/* scratchy texture strays */}
      <path d="M60 210 L 70 214" strokeWidth="0.7" strokeDasharray="1 4" />
      <path d="M210 130 L 222 128" strokeWidth="0.7" strokeDasharray="1 4" />
      <path d="M156 60 L 160 74" strokeWidth="0.7" strokeDasharray="1 4" />
    </svg>
  );
}