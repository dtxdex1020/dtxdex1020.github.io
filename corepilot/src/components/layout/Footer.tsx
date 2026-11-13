import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-navy-950/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Logo className="opacity-90" />
        <p className="text-sm text-muted">
          © 2026 CorePilot · AI Receptionist foundation
        </p>
      </div>
    </footer>
  );
}
