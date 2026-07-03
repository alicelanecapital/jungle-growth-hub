import { RootSystem } from "../botanicals/RootSystem";
import { LeafSprig } from "../botanicals/LeafSprig";
import { DrawOnView } from "../botanicals/DrawOnView";

const expertise = ["Law", "Finance", "Marketing", "Sales", "Operations", "Technology", "Product", "Strategy", "Leadership"];

export function Network() {
  return (
    <section id="network" className="relative overflow-hidden border-t border-border/70 bg-surface-muted">
      <DrawOnView className="pointer-events-none absolute -top-10 right-8 w-40 md:w-52">
        <LeafSprig className="h-auto w-full opacity-70" />
      </DrawOnView>
      <RootSystem className="pointer-events-none absolute -bottom-20 left-[-4vw] right-[-4vw] h-64 w-[108vw] object-cover opacity-85" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-40 sm:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground"><span className="text-accent-teal">05</span> &nbsp;— &nbsp; The network</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              No founder builds alone.
            </h2>
            <p className="mt-8 max-w-2xl text-[17px] leading-[1.75] text-foreground/85">
              Every business needs different expertise at different moments. The Jungle is an ecosystem of trusted specialists — brought in as founders need them, not sold as packages.
            </p>
            <ul className="mt-16 grid grid-cols-1 gap-y-4 border-t border-border pt-10 sm:grid-cols-3">
              {expertise.map((e) => (
                <li key={e} className="font-display text-2xl font-medium tracking-[-0.01em] text-foreground">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}