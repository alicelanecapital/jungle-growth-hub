import { cn } from "@/lib/utils";
import { LayoutDashboard, Globe } from "lucide-react";

export type ViewMode = "landing" | "dashboard";

export function ViewSwitcher({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface/80 p-1 shadow-sm backdrop-blur">
      <SwitchButton active={value === "landing"} onClick={() => onChange("landing")} icon={<Globe className="h-3.5 w-3.5" />}>
        Landing
      </SwitchButton>
      <SwitchButton active={value === "dashboard"} onClick={() => onChange("dashboard")} icon={<LayoutDashboard className="h-3.5 w-3.5" />}>
        Member Dashboard
      </SwitchButton>
    </div>
  );
}

function SwitchButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
        active
          ? "bg-primary text-primary-foreground shadow"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {children}
    </button>
  );
}