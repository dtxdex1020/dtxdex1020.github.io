/**
 * Phase 1 landing hero.
 * Brand-first: CorePilot is the dominant name; one headline, one line of support, one CTA group.
 */
export function Hero() {
  return (
    <section
      id="overview"
      className="relative flex flex-1 flex-col items-center justify-center px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="animate-fade-up font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          CorePilot
        </p>

        <h1 className="animate-fade-up-delay-1 mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          AI Receptionist
        </h1>

        <p className="animate-fade-up-delay-1 mt-5 max-w-xl text-base leading-relaxed text-slate-200/85 sm:text-lg">
          A professional front desk for every business — answering, routing, and
          capturing every conversation with calm, reliable intelligence.
        </p>

        <div
          id="get-started"
          className="animate-fade-up-delay-2 mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <span className="inline-flex h-11 items-center justify-center rounded-md bg-accent-strong px-6 text-sm font-semibold text-white">
            Phase 1 foundation ready
          </span>
          <span className="text-sm text-muted">
            Run locally · no accounts or AI API yet
          </span>
        </div>
      </div>
    </section>
  );
}
