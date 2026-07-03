import { Protea } from "../botanicals/Protea";
import { Vine } from "../botanicals/Vine";
import { DrawOnView } from "../botanicals/DrawOnView";

export function WhyExists() {
  return (
    <section id="why" className="relative overflow-hidden border-t border-border/70 bg-surface-muted">
      <DrawOnView className="pointer-events-none absolute -bottom-32 -right-16 w-[28vw] min-w-[280px] max-w-[520px]">
        <Protea className="h-auto w-full opacity-80" />
      </DrawOnView>
      <Vine className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full object-cover opacity-[0.12]" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-40 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground"><span className="text-accent-teal">01</span> &nbsp;— &nbsp; Why</p>
        </div>
        <div className="md:col-span-8">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            Why The Jungle exists.
          </h2>
          <div className="mt-12 max-w-2xl space-y-6 text-[17px] leading-[1.75] text-foreground/85">
            <p>Early-stage startups often have enormous potential but limited access to experienced guidance, strategic thinking and aligned partners.</p>
            <p>Every founder has strengths. Every founder also has blind spots. Those blind spots are rarely obvious from the inside.</p>
            <p className="text-foreground">The Jungle exists to help founders see what they cannot yet see — and to stand alongside them once they do.</p>
          </div>
        </div>
      </div>
    </section>
  );
}