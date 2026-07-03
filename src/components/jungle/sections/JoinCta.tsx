import { Link } from "@tanstack/react-router";
import { MarulaBranch } from "../botanicals/MarulaBranch";
import { DrawOnView } from "../botanicals/DrawOnView";

export function JoinCta() {
  return (
    <section id="join" className="relative overflow-hidden border-t border-border/70 bg-primary text-primary-foreground">
      <DrawOnView className="pointer-events-none absolute -right-24 -top-10 text-primary-foreground/25">
        <MarulaBranch className="h-[520px] w-auto" />
      </DrawOnView>
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-48 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="mb-10 text-xs uppercase tracking-[0.28em] text-primary-foreground/70">07 &nbsp;— &nbsp; Join</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            If you're building something,<br />we'd like to hear it.
          </h2>
          <p className="mt-10 max-w-xl text-[17px] leading-[1.75] text-primary-foreground/80">
            Tell us about your business, what you're solving, and what you're finding hard. We read every submission — carefully, and by people, not filters.
          </p>
          <div className="mt-14">
            <Link to="/apply" className="inline-flex items-center rounded-none bg-background px-10 py-5 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-background/90">
              Join the Jungle
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}