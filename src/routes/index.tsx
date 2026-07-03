import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/jungle/sections/SiteHeader";
import { Hero } from "@/components/jungle/sections/Hero";
import { WhyExists } from "@/components/jungle/sections/WhyExists";
import { Partnership } from "@/components/jungle/sections/Partnership";
import { HowItWorks } from "@/components/jungle/sections/HowItWorks";
import { WhyEquityMatters } from "@/components/jungle/sections/WhyEquityMatters";
import { Network } from "@/components/jungle/sections/Network";
import { AreYouAFit } from "@/components/jungle/sections/AreYouAFit";
import { JoinCta } from "@/components/jungle/sections/JoinCta";
import { SiteFooter } from "@/components/jungle/sections/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Jungle — A curated founder ecosystem" },
      { name: "description", content: "The Jungle is where promising early-stage founders find clarity, partnership, expertise and investment to build stronger businesses. Built by Alice Lane Capital." },
      { property: "og:title", content: "The Jungle — A curated founder ecosystem" },
      { property: "og:description", content: "Clarity, partnership, expertise and investment for early-stage founders. Built by Alice Lane Capital." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <WhyExists />
        <Partnership />
        <HowItWorks />
        <WhyEquityMatters />
        <Network />
        <AreYouAFit />
        <JoinCta />
      </main>
      <SiteFooter />
    </div>
  );
}
