import src from "@/assets/accent-protea.png";

export function Protea({ className, style }: { className?: string; style?: React.CSSProperties }) {
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