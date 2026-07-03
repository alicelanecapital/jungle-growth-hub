import src from "@/assets/accent-pincushion.png";

export function AccentPincushion({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable={false}
      className={className}
      style={style}
    />
  );
}