import { Link } from "@tanstack/react-router";
import { Wordmark } from "../Wordmark";

const nav = [
  { href: "#why", label: "Why" },
  { href: "#how", label: "How" },
  { href: "#network", label: "Network" },
  { href: "#join", label: "Join" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10">
        <Link to="/" className="inline-flex items-center gap-2">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-9 text-sm text-muted-foreground md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <Link to="/apply" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground">
          Join the Jungle
          <span className="inline-block h-px w-6 bg-current transition-all group-hover:w-10" />
        </Link>
      </div>
    </header>
  );
}