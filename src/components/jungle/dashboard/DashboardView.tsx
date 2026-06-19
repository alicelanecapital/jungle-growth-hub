import { Logo } from "../Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Download,
  ArrowRight,
  FileType2,
  Settings,
  LogOut,
  CalendarPlus,
  Sparkles,
} from "lucide-react";

export function DashboardView() {
  return (
    <div className="min-h-[calc(100vh-60px)] bg-surface-muted/40">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <Sidebar />
        <main className="min-w-0 flex-1 space-y-6">
          <Topbar />
          <NextMeetingCard />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <RecentBlueprints />
            <div className="space-y-6">
              <ScriptWidget />
              <PodSnapshot />
            </div>
          </div>
          <FeedTeaser />
        </main>
      </div>
    </div>
  );
}

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Users, label: "My Micro-Pod" },
  { icon: FileText, label: "Blueprint Library" },
  { icon: Calendar, label: "Events" },
  { icon: MessageSquare, label: "Community Feed" },
];

function Sidebar() {
  return (
    <aside className="sticky top-24 hidden h-fit w-60 shrink-0 rounded-2xl border border-border bg-surface p-4 lg:block">
      <div className="px-2 pb-4">
        <Logo />
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-6 border-t border-border pt-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">
          <Settings className="h-4 w-4" /> Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}

function MobileNav() {
  return (
    <div className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:hidden">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
            item.active
              ? "bg-primary text-primary-foreground"
              : "bg-surface text-muted-foreground border border-border"
          )}
        >
          <item.icon className="h-3.5 w-3.5" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Topbar() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Dashboard</p>
          <h1 className="truncate font-display text-2xl font-bold text-foreground sm:text-3xl">
            Welcome back, Thandi
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[color:var(--accent-ember)]" />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ember-gradient font-display text-sm font-bold text-white">
            TM
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

function NextMeetingCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-primary p-6 text-primary-foreground sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-60px] top-[-60px] h-64 w-64 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #F08A2A, transparent 70%)" }}
      />
      <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--accent-gold)]">
            <Sparkles className="h-3 w-3" /> Next Forum Meeting
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            Pod 14 · Monthly Forum
          </h2>
          <p className="mt-2 text-primary-foreground/70">
            Thursday, 27 June · 18:00 SAST · Virtual
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15 font-display text-sm font-bold">
              SK
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Sipho Khumalo — Moderator</p>
              <p className="truncate text-xs text-primary-foreground/60">
                Owner, Khumalo Logistics · Johannesburg
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="rounded-full bg-ember-gradient text-white hover:opacity-95">
            <CalendarPlus className="h-4 w-4" /> Add to calendar
          </Button>
          <Button
            variant="ghost"
            className="rounded-full border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
          >
            Open prep doc <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ScriptWidget() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ember-gradient text-white">
          <FileText className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Quick link
          </p>
          <h3 className="font-display text-base font-semibold text-foreground">
            90-Minute Self-Facilitated Forum Script & Guide
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Print this before your next pod meeting.
          </p>
        </div>
      </div>
      <Button className="mt-5 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
        <Download className="h-4 w-4" /> Download PDF
      </Button>
    </section>
  );
}

const blueprints = [
  { name: "Standard Independent Contractor Agreement", ext: "docx", added: "Added 2 days ago" },
  { name: "Service Level Agreement — Retainer Template", ext: "docx", added: "Added 5 days ago" },
  { name: "Monthly Invoicing Workflow (with reminders)", ext: "pdf", added: "Added 1 week ago" },
  { name: "New Hire Onboarding Checklist", ext: "xlsx", added: "Added 2 weeks ago" },
];

function RecentBlueprints() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Recent Blueprints Added
        </h3>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
          View library →
        </button>
      </div>
      <ul className="divide-y divide-border">
        {blueprints.map((b) => (
          <li
            key={b.name}
            className="group flex cursor-pointer items-center gap-4 py-3 transition hover:bg-secondary/40 -mx-2 px-2 rounded-lg"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
              <FileType2 className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {b.name}.{b.ext}
              </p>
              <p className="text-xs text-muted-foreground">{b.added}</p>
            </div>
            <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:inline">
              {b.ext}
            </span>
            <Download className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
          </li>
        ))}
      </ul>
    </section>
  );
}

const pod = [
  { initials: "NM", name: "Naledi", biz: "Boutique café" },
  { initials: "JV", name: "Jaco", biz: "Plumbing services" },
  { initials: "AP", name: "Ayesha", biz: "Online retail" },
  { initials: "TK", name: "Tumelo", biz: "Marketing studio" },
  { initials: "RM", name: "Riaan", biz: "Auto repair" },
];

function PodSnapshot() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="font-display text-base font-semibold text-foreground">Your Micro-Pod</h3>
      <p className="mt-1 text-xs text-muted-foreground">5 of 8 members · Cape Town chapter</p>
      <ul className="mt-4 space-y-3">
        {pod.map((m) => (
          <li key={m.initials} className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary font-display text-xs font-bold text-primary">
              {m.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
              <p className="truncate text-xs text-muted-foreground">{m.biz}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const feed = [
  {
    initials: "JV",
    name: "Jaco V.",
    time: "2h",
    body: "Anyone using a good SARS-compliant invoicing tool under R200/month? Switching from spreadsheets.",
    replies: 7,
  },
  {
    initials: "AP",
    name: "Ayesha P.",
    time: "Yesterday",
    body: "Just hired my first warehouse assistant using the onboarding checklist from the library. Game changer.",
    replies: 12,
  },
];

function FeedTeaser() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">Community Feed</h3>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
          Open feed →
        </button>
      </div>
      <ul className="space-y-4">
        {feed.map((p) => (
          <li key={p.name} className="flex gap-3 rounded-xl border border-border/60 p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display text-xs font-bold">
              {p.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{p.name}</span>
                <span>·</span>
                <span>{p.time}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{p.body}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.replies} replies</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}