import src from "@/assets/accent-sprig.png";

export function LeafSprig({ className, style }: { className?: string; style?: React.CSSProperties }) {
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