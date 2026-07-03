import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wrap SVG paths so they draw themselves in when the element scrolls into view.
 * All descendant <path>, <line>, <polyline>, <circle>, <ellipse> get the animation.
 */
export function DrawOnView({
  children,
  className,
  delay = 0,
  duration = 2000,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(
      el.querySelectorAll<SVGGeometryElement>("path, line, polyline, circle, ellipse"),
    );
    nodes.forEach((n) => {
      try {
        const len = "getTotalLength" in n ? (n as SVGPathElement).getTotalLength() : 800;
        n.style.strokeDasharray = `${len}`;
        n.style.strokeDashoffset = reduce ? "0" : `${len}`;
        n.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
      } catch {
        /* ignore */
      }
    });

    if (reduce) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            nodes.forEach((n) => (n.style.strokeDashoffset = "0"));
            if (once) io.disconnect();
          } else if (!once) {
            nodes.forEach((n) => {
              const d = n.style.strokeDasharray;
              n.style.strokeDashoffset = d;
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, duration, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}