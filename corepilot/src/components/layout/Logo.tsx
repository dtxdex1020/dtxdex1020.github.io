import Link from "next/link";

type LogoProps = {
  className?: string;
};

/**
 * CorePilot text + symbol mark.
 * The hexagon+path icon suggests a guided route (pilot) through communication.
 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-90 ${className}`}
      aria-label="CorePilot home"
    >
      <span
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-700 ring-1 ring-border"
        aria-hidden="true"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.5L20 7v10l-8 4.5L4 17V7l8-4.5Z"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12.5h4.2l2.3-3.2"
            stroke="currentColor"
            className="text-white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="15.5" cy="8.8" r="1.2" className="fill-accent" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent animate-soft-pulse" />
      </span>
      <span className="font-display text-[1.15rem] font-semibold tracking-tight">
        Core<span className="text-accent">Pilot</span>
      </span>
    </Link>
  );
}
