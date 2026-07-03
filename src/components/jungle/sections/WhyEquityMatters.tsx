import { Protea } from "../botanicals/Protea";
import { MarulaBranch } from "../botanicals/MarulaBranch";

export function WhyEquityMatters() {
  return (
    <section className="relative overflow-hidden border-t border-border/70">
      <Protea className="pointer-events-none absolute -left-40 top-1/2 w-[36vw] max-w-[560px] -translate-y-1/2 opacity-[0.08]" />
      <MarulaBranch className="pointer-events-none absolute -right-32 top-1/2 w-[36vw] max-w-[560px] -translate-y-1/2 scale-x-[-1] opacity-[0.08]" />
      <div className="relative mx-auto max-w-3xl px-6 py-40 text-center sm:px-10">
        <p className="mb-10 text-xs uppercase tracking-[0.28em] text-muted-foreground"><span className="text-accent-teal">04</span> &nbsp;— &nbsp; Why equity matters</p>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.015em]">
          Equity turns advice into <span className="text-accent-teal">accountability</span>. When we invest alongside you, our success is genuinely tied to yours — the incentives, the risks and the rewards all point the same direction.
        </h2>
      </div>
    </section>
  );
}