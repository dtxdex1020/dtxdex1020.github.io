import { Logo } from "./Logo";

/**
 * Compact app-shell sidebar (Linear-inspired density).
 * Phase 1: visual chrome only — items are not wired to real routes yet.
 */
const NAV = [
  { label: "Home", active: true },
  { label: "Inbox", active: false },
  { label: "Conversations", active: false },
  { label: "Settings", active: false },
] as const;

export function Sidebar() {
  return (
    <aside
      className="hidden w-[220px] shrink-0 flex-col border-r border-border bg-navy-950/80 md:flex"
      aria-label="App navigation"
    >
      <div className="flex h-12 items-center justify-between gap-2 border-b border-border px-3">
        <Logo compact />
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
          Demo
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Workspace">
        <p className="px-2 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted/80">
          Workspace
        </p>
        {NAV.map((item) => (
          <span
            key={item.label}
            className={
              item.active
                ? "flex h-8 items-center rounded-md bg-navy-700/80 px-2 text-[13px] font-medium text-white"
                : "flex h-8 items-center rounded-md px-2 text-[13px] text-muted transition-colors hover:bg-navy-800 hover:text-white/90"
            }
          >
            <span
              className={
                item.active
                  ? "mr-2 h-1.5 w-1.5 rounded-full bg-accent"
                  : "mr-2 h-1.5 w-1.5 rounded-full bg-navy-700"
              }
              aria-hidden="true"
            />
            {item.label}
          </span>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <p className="text-[12px] leading-snug text-muted">
          Phase 1 shell · simulated AI comes later
        </p>
      </div>
    </aside>
  );
}
