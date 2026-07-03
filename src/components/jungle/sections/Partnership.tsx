import { MarulaBranch } from "../botanicals/MarulaBranch";
import { LeafSprig } from "../botanicals/LeafSprig";
import { DrawOnView } from "../botanicals/DrawOnView";

export function Partnership() {
  return (
    <section className="relative overflow-hidden border-t border-border/70">
      <DrawOnView className="pointer-events-none absolute -left-40 top-8 w-[18vw] min-w-[180px] max-w-[340px]">
        <MarulaBranch className="h-auto w-full opacity-20" />
      </DrawOnView>
      <LeafSprig className="pointer-events-none absolute -bottom-16 -right-16 w-[16vw] max-w-[280px] opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-40 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="mb-8 text-xs uppercase tracking-[0.28em] text-muted-foreground"><span className="text-accent-teal">02</span> &nbsp;— &nbsp; Partnership</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            We build<br />alongside<br /><span className="text-accent-teal">founders.</span>
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:pt-10">
          <div className="space-y-6 text-[17px] leading-[1.75] text-foreground/85">
            <p>The Jungle is different because Alice Lane Capital becomes a genuine partner. Where there is strong alignment, we invest equity in the business.</p>
            <p>That investment reflects commitment, shared belief and shared outcomes. This is not funding first. It is partnership first.</p>
            <p className="text-foreground">The relationship shifts from client and consultant to two teams building something together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}