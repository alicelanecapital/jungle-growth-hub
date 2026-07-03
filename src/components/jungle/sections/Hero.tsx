import { Link } from "@tanstack/react-router";
import { PalmFrond } from "../botanicals/PalmFrond";
import { LeafSprig } from "../botanicals/LeafSprig";
import { DrawOnView } from "../botanicals/DrawOnView";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <DrawOnView duration={1400} className="pointer-events-none absolute -bottom-[10vw] -right-[14vw] w-[46vw] max-w-[820px]">
        <PalmFrond className="h-auto w-full opacity-25" />
      </DrawOnView>
      <DrawOnView className="pointer-events-none absolute -left-8 -top-6 w-40 md:w-52">
        <LeafSprig className="h-auto w-full opacity-20" />
      </DrawOnView>
      <div className="relative mx-auto max-w-[1400px] px-6 pt-24 pb-40 sm:px-10 md:pt-32">
        <div className="max-w-3xl">
        <p className="mb-10 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          A curated founder ecosystem
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-foreground">
          Where startups
          <br />
          <span className="text-accent-teal">grow.</span>
        </h1>
        <p className="mt-10 max-w-xl font-display text-xl font-normal leading-snug text-foreground/80">
          The Jungle is where promising early-stage founders find clarity, partnership, expertise and investment to build stronger businesses.
        </p>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-muted-foreground">
          Building a business is one of the most rewarding things you will ever do. It is also one of the most demanding. Every founder reaches moments where the next step isn't obvious. The Jungle exists to help founders uncover what is holding them back, strengthen what matters most, and grow alongside a committed partner.
        </p>
        <div className="relative mt-12 flex flex-wrap items-center gap-8">
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
      </div>
    </section>
  );
}