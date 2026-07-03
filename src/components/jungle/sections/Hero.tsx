import { Link } from "@tanstack/react-router";
import { PalmFrond } from "../botanicals/PalmFrond";
import { DrawOnView } from "../botanicals/DrawOnView";

export function Hero() {
  return (
    <section className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 pt-24 pb-40 sm:px-10 md:grid-cols-12 md:pt-32">
      <div className="md:col-span-7 md:pt-8">
        <p className="mb-10 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          A curated founder ecosystem
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-foreground">
          Where startups
          <br />
          grow.
        </h1>
        <p className="mt-10 max-w-xl font-display text-xl font-normal leading-snug text-foreground/80">
          The Jungle is where promising early-stage founders find clarity, partnership, expertise and investment to build stronger businesses.
        </p>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-muted-foreground">
          Building a business is one of the most rewarding things you will ever do. It is also one of the most demanding. Every founder reaches moments where the next step isn't obvious. The Jungle exists to help founders uncover what is holding them back, strengthen what matters most, and grow alongside a committed partner.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Link
            to="/apply"
            className="inline-flex items-center rounded-none bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Join the Jungle
          </Link>
          <a href="#how" className="group inline-flex items-center gap-3 text-sm font-medium text-foreground">
            How it works
            <span className="inline-block h-px w-8 bg-current transition-all group-hover:w-14" />
          </a>
        </div>
      </div>
      <div className="pointer-events-none relative md:col-span-5">
        <DrawOnView duration={1200} className="relative flex h-full w-full items-start justify-end">
          <PalmFrond className="h-auto w-full max-w-[640px] translate-x-4 opacity-95 md:-translate-y-6" />
        </DrawOnView>
      </div>
    </section>
  );
}