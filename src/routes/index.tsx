import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LandingView } from "@/components/jungle/landing/LandingView";
import { DashboardView } from "@/components/jungle/dashboard/DashboardView";
import { ViewSwitcher, type ViewMode } from "@/components/jungle/ViewSwitcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Jungle — The Peer Board for Main Street Businesses" },
      { name: "description", content: "Affordable peer forums, operational templates, and a local board of advisors for South African MSMEs and SMEs." },
      { property: "og:title", content: "The Jungle — The Peer Board for Main Street Businesses" },
      { property: "og:description", content: "Affordable peer forums, operational templates, and a local board of advisors for South African MSMEs and SMEs." },
    ],
  }),
  component: Index,
});

function Index() {
  const [view, setView] = useState<ViewMode>("landing");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-40 flex justify-center border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
        <ViewSwitcher value={view} onChange={setView} />
      </div>
      {view === "landing" ? <LandingView /> : <DashboardView />}
    </div>
  );
}
