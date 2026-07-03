import src from "@/assets/hero-scene.png";

export function PalmFrond({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={style}
    />
  );
}