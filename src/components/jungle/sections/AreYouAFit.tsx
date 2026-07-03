import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AccentPincushion } from "../botanicals/AccentPincushion";
import { MarulaBranch } from "../botanicals/MarulaBranch";
import { DrawOnView } from "../botanicals/DrawOnView";

const items = [
  "I'm actively building an early-stage startup.",
  "I believe my business has real potential.",
  "I'm open to challenge and honest feedback.",
  "I'm willing to work collaboratively.",
  "I understand that partnership means shared accountability.",
  "I'm looking for more than funding; I'm looking for a long-term partner.",
];

export function AreYouAFit() {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section className="relative overflow-hidden border-t border-border/70">
      <DrawOnView className="pointer-events-none absolute -top-24 -right-32 w-[20vw] min-w-[200px] max-w-[380px]">
        <AccentPincushion className="h-auto w-full opacity-25" />
      </DrawOnView>
      <MarulaBranch className="pointer-events-none absolute -left-32 bottom-10 w-[24vw] max-w-[420px] opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-40 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground"><span className="text-accent-teal">06</span> &nbsp;— &nbsp; Fit</p>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            Is The Jungle <span className="text-accent-teal">right for you?</span>
          </h2>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.75] text-foreground/85">
            The Jungle is designed for founders who are serious about building a business and open to partnership. We look for curiosity, resilience, coachability, integrity, and a willingness to build with others. We invest our time, our expertise, and — where there is strong alignment — our capital. In return, we ask founders to be committed to the journey.
          </p>
          <ul className="mt-14 max-w-2xl divide-y divide-border border-y border-border">
            {items.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-start gap-5 py-5 text-left transition-colors hover:text-foreground"
                >
                  <span
                    className={
                      "mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-foreground/60 transition-colors " +
                      (checked[i] ? "bg-foreground text-background" : "bg-transparent")
                    }
                  >
                    {checked[i] && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 6.5 L5 9.5 L10 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[17px] leading-relaxed text-foreground/85">{item}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <Link to="/apply" className="group inline-flex items-center gap-3 font-display text-lg font-medium">
              If this sounds like you, tell us your story
              <span className="inline-block h-px w-8 bg-current transition-all group-hover:w-14" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}