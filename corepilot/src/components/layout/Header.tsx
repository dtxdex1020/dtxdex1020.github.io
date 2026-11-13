import { Logo } from "./Logo";

/**
 * Dense top bar — Linear-like chrome, CorePilot branding.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-navy-950/70 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between gap-4 px-4 sm:px-5">
        <div className="flex items-center gap-3 md:gap-4">
          <Logo compact className="md:hidden" />
          <div className="hidden items-center gap-1 sm:flex" aria-label="Primary">
            <a
              href="#overview"
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-navy-800 hover:text-white"
            >
              Overview
            </a>
            <a
              href="#get-started"
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-navy-800 hover:text-white"
            >
              Foundation
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-md border border-border bg-navy-850 px-2 py-1 text-[12px] text-muted sm:inline-flex">
            <kbd className="font-mono text-[11px] text-slate-300">⌘</kbd>
            <span>K</span>
            <span className="text-muted/70">Search</span>
          </span>
          <a
            href="#get-started"
            className="inline-flex h-7 items-center rounded-md bg-accent-strong px-2.5 text-[13px] font-medium text-white transition-colors hover:bg-accent"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
