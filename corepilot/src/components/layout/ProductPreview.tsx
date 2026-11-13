/**
 * Product UI preview under the hero — Linear homepage treatment:
 * large dark app chrome, dense detail pane, fades into the page below.
 * Simulated receptionist UI only (CorePilot content, not Linear assets).
 */

const ACTIVITY = [
  {
    who: "CorePilot",
    when: "just now",
    text: "Answered after-hours call and captured an appointment request.",
  },
  {
    who: "Triage",
    when: "1m ago",
    text: "Labeled Front desk and Appointment.",
  },
  {
    who: "Front desk",
    when: "2m ago",
    text: "Caller asked for the earliest consultation this week.",
  },
  {
    who: "CorePilot",
    when: "2m ago",
    text: "Drafted a confirmation summary for the team.",
  },
] as const;

export function ProductPreview() {
  return (
    <section id="preview" className="relative px-5 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div className="animate-fade-up-delay-3 mx-auto w-full max-w-[1120px] preview-fade">
        <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#0d0d0d]">
          <div className="flex min-h-[460px] sm:min-h-[520px]">
            {/* Icon / nav rail */}
            <aside className="hidden w-[52px] shrink-0 flex-col items-center gap-3 border-r border-white/8 bg-black py-4 sm:flex">
              <span className="h-6 w-6 rounded-md bg-white/10" aria-hidden="true" />
              <span className="mt-2 h-2 w-2 rounded-full bg-[#5b9fd4]" aria-hidden="true" />
              <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
              <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
              <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
            </aside>

            {/* List column */}
            <aside className="hidden w-[220px] shrink-0 flex-col border-r border-white/8 bg-[#0a0a0a] p-3 md:flex">
              <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]">
                Inbox
              </p>
              <ul className="space-y-0.5 text-[13px]">
                <li className="rounded-md bg-white/[0.06] px-2 py-2 text-white">
                  <span className="block font-medium">Appointment request</span>
                  <span className="mt-0.5 block text-[12px] text-[#6b6b6b]">CP-104 · Active</span>
                </li>
                <li className="rounded-md px-2 py-2 text-[#8a8a8a]">
                  <span className="block">Billing callback</span>
                  <span className="mt-0.5 block text-[12px] text-[#6b6b6b]">CP-103 · Routed</span>
                </li>
                <li className="rounded-md px-2 py-2 text-[#8a8a8a]">
                  <span className="block">After-hours FAQ</span>
                  <span className="mt-0.5 block text-[12px] text-[#6b6b6b]">CP-102 · Done</span>
                </li>
              </ul>
            </aside>

            {/* Detail */}
            <div className="min-w-0 flex-1 border-r border-white/8">
              <div className="border-b border-white/8 px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[12px] text-[#6b6b6b]">CP-104</p>
                  <h2 className="text-[16px] font-medium tracking-tight text-white">
                    Faster front-desk response
                  </h2>
                </div>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#8a8a8a]">
                  Render a calm acknowledgment before full calendar sync when minimum caller
                  context is present, instead of blocking the whole conversation.
                </p>
              </div>

              <div className="px-5 py-5">
                <p className="mb-4 text-[12px] font-medium text-[#6b6b6b]">Activity</p>
                <ul className="space-y-4">
                  {ACTIVITY.map((item) => (
                    <li key={`${item.who}-${item.when}-${item.text}`} className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#5b9fd4]" />
                      <div>
                        <p className="text-[13px] text-white">
                          <span className="font-medium">{item.who}</span>
                          <span className="text-[#6b6b6b]"> · {item.when}</span>
                        </p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-[#8a8a8a]">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Properties */}
            <aside className="hidden w-[200px] shrink-0 flex-col gap-4 bg-[#0a0a0a] p-4 lg:flex">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]">
                  Status
                </p>
                <p className="mt-1 text-[13px] text-white">In progress</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]">
                  Priority
                </p>
                <p className="mt-1 text-[13px] text-white">High</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]">
                  Labels
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-[#8a8a8a]">
                    Front desk
                  </span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-[#8a8a8a]">
                    Simulated
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]">
                  Assignee
                </p>
                <p className="mt-1 text-[13px] text-white">CorePilot</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
