import src from "@/assets/divider-proteas.png";

export function RootSystem({ className, style }: { className?: string; style?: React.CSSProperties }) {
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