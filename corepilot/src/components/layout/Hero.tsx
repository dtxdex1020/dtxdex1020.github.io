/**
 * Marketing hero — Linear homepage language:
 * bold left-aligned white headline, muted grey support, text link CTA.
 * Brand-first: CorePilot leads the first viewport.
 */
export function Hero() {
  return (
    <section id="overview" className="relative px-5 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="max-w-[720px] text-left">
          <h1 className="animate-fade-up font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[56px] lg:text-[64px]">
            CorePilot — the AI receptionist for modern businesses.
          </h1>

          <p className="animate-fade-up-delay-1 mt-5 max-w-[540px] text-[17px] leading-[1.55] text-[#8a8a8a] sm:mt-6 sm:text-[18px]">
            Purpose-built to answer, route, and capture every conversation.
            Designed for calm, reliable front-desk intelligence.
          </p>

          <p id="get-started" className="animate-fade-up-delay-2 mt-6 sm:mt-7">
            <a
              href="#preview"
              className="inline-flex items-center gap-1.5 text-[14px] transition-colors hover:opacity-90"
            >
              <span className="font-medium text-white">Phase 1</span>
              <span className="text-[#8a8a8a]">foundation →</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
