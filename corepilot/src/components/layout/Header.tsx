import { Logo } from "./Logo";

/**
 * Simple app shell header for Phase 1.
 * Later phases will add auth links and tenant switching here.
 */
export function Header() {
  return (
    <header className="relative z-10 border-b border-border/60 bg-navy-950/40 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="flex items-center gap-6" aria-label="Primary">
          <a
            href="#overview"
            className="hidden text-sm text-slate-200/80 transition-colors hover:text-white sm:inline"
          >
            Overview
          </a>
          <a
            href="#get-started"
            className="rounded-md bg-accent-strong px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Get started
          </a>
        </nav>
      </div>
    </header>
  );
}
