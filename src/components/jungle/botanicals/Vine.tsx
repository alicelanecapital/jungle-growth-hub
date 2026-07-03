import src from "@/assets/divider-fynbos.png";

export function Vine({ className, style }: { className?: string; style?: React.CSSProperties }) {
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