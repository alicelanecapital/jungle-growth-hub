export function Partnership() {
  return (
    <section className="relative border-t border-border/70">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-40 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="mb-8 text-xs uppercase tracking-[0.28em] text-muted-foreground">02 &nbsp;— &nbsp; Partnership</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            We build<br />alongside<br /><span className="text-accent-green">founders.</span>
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