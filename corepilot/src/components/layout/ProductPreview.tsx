/**
 * Faux reception inbox panel — product-shaped visual anchor for Phase 1.
 * Simulated rows only; no real messaging.
 */
const ROWS = [
  {
    id: "CP-104",
    title: "New caller · appointment request",
    meta: "Front desk · 2m",
    tone: "active" as const,
  },
  {
    id: "CP-103",
    title: "Routed to billing · callback scheduled",
    meta: "Routed · 18m",
    tone: "muted" as const,
  },
  {
    id: "CP-102",
    title: "After-hours FAQ answered",
    meta: "Resolved · 1h",
    tone: "muted" as const,
  },
];

export function ProductPreview() {
  return (
    <div className="animate-fade-up-delay-2 overflow-hidden rounded-xl border border-border-strong bg-navy-950/80 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.85)]">
      <div className="flex h-10 items-center justify-between border-b border-border px-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-soft-pulse" />
          <span className="text-[12px] font-medium text-slate-100">Reception inbox</span>
        </div>
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
          Simulated
        </span>
      </div>

      <ul className="divide-y divide-border">
        {ROWS.map((row) => (
          <li
            key={row.id}
            className="flex items-start gap-3 px-3 py-2.5 transition-colors hover:bg-navy-800/50"
          >
            <span className="mt-0.5 w-14 shrink-0 font-mono text-[11px] text-muted">
              {row.id}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-[13px] ${
                  row.tone === "active" ? "font-medium text-white" : "text-slate-300"
                }`}
              >
                {row.title}
              </p>
              <p className="mt-0.5 text-[12px] text-muted">{row.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
