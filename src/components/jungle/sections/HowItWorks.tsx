import { Vine } from "../botanicals/Vine";
import { DrawOnView } from "../botanicals/DrawOnView";

const steps = [
  { n: "01", title: "Discover", body: "Understand the founder and the business on its own terms." },
  { n: "02", title: "Diagnose", body: "Identify strengths, constraints and the real opportunities." },
  { n: "03", title: "Partner", body: "Agree a shared path forward, honestly and openly." },
  { n: "04", title: "Invest", body: "Where there is mutual fit, Alice Lane Capital invests alongside you." },
  { n: "05", title: "Build", body: "Draw on the expertise of the Jungle network as it's needed." },
  { n: "06", title: "Grow", body: "Continue strengthening the business over the long term." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative border-t border-border/70 bg-surface-muted">
      <div className="mx-auto max-w-[1400px] px-6 py-40 sm:px-10">
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">03 &nbsp;— &nbsp; How</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              How it works.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-muted-foreground">
              A quiet, unhurried process. Six moments that shape a partnership.
            </p>
          </div>
        </div>
        <DrawOnView className="mb-10 hidden md:block">
          <div className="relative h-[140px] w-full overflow-hidden">
            <Vine className="absolute bottom-0 left-0 h-auto w-full object-cover object-bottom opacity-90" />
          </div>
        </DrawOnView>
        <ol className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-border pt-6">
              <div className="font-display text-sm text-accent-gold">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-medium">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}