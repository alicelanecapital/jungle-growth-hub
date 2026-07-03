import { Wordmark } from "../Wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-16 sm:px-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A curated founder ecosystem by Alice Lane Capital.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
          <a href="#why" className="hover:text-foreground">Why</a>
          <a href="#how" className="hover:text-foreground">How</a>
          <a href="#network" className="hover:text-foreground">Network</a>
          <a href="#join" className="hover:text-foreground">Join</a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Alice Lane Capital</p>
      </div>
    </footer>
  );
}