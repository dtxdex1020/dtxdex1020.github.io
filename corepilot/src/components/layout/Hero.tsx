import { ProductPreview } from "./ProductPreview";

/**
 * Brand-first hero with Linear-like density: tight type, compact CTAs, product panel.
 */
export function Hero() {
  return (
    <section
      id="overview"
      className="relative flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12">
        <div className="max-w-xl">
          <p className="animate-fade-up inline-flex items-center gap-2 text-[12px] font-medium text-accent">
            <span className="rounded border border-border bg-navy-800/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              CorePilot
            </span>
            <span className="text-muted">AI Receptionist</span>
          </p>

          <h1 className="animate-fade-up-delay-1 mt-4 font-display text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.15rem]">
            The front desk that never misses a call.
          </h1>

          <p className="animate-fade-up-delay-1 mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
            CorePilot answers, routes, and captures every conversation with calm,
            reliable intelligence — built for modern businesses.
          </p>

          <div
            id="get-started"
            className="animate-fade-up-delay-2 mt-7 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex h-8 items-center rounded-md bg-accent-strong px-3.5 text-[13px] font-medium text-white">
              Phase 1 foundation ready
            </span>
            <span className="text-[13px] text-muted">
              Local scaffold · no accounts or AI API yet
            </span>
          </div>
        </div>

        <ProductPreview />
      </div>
    </section>
  );
}
