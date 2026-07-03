import { Link } from "@tanstack/react-router";
import { MarulaBranch } from "../botanicals/MarulaBranch";
import { LeafSprig } from "../botanicals/LeafSprig";
import { DrawOnView } from "../botanicals/DrawOnView";

export function JoinCta() {
  return (
    <section id="join" className="relative overflow-hidden border-t border-border/70 bg-primary text-primary-foreground">
      <DrawOnView className="pointer-events-none absolute -right-[18vw] -top-24 w-[34vw] max-w-[560px] opacity-20">
        <MarulaBranch className="h-auto w-full invert brightness-125" />
      </DrawOnView>
      <DrawOnView className="pointer-events-none absolute -bottom-24 -left-24 w-52 max-w-[32vw] opacity-15">
        <LeafSprig className="h-auto w-full invert brightness-125" />
      </DrawOnView>
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-48 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="mb-10 text-xs uppercase tracking-[0.28em] text-primary-foreground/70"><span className="text-accent-teal">07</span> &nbsp;— &nbsp; Join</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            If you're building something,<br />we'd like to <span className="text-accent-teal">hear it.</span>
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