import Link from "next/link";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

/**
 * CorePilot text + symbol mark (kept distinct from Linear’s brand).
 */
export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-white transition-opacity hover:opacity-90 ${className}`}
      aria-label="CorePilot home"
    >
      <span
        className={`relative flex shrink-0 items-center justify-center rounded-md bg-navy-700 ring-1 ring-border ${
          compact ? "h-6 w-6" : "h-7 w-7"
        }`}
        aria-hidden="true"
      >
        <svg
          width={compact ? 14 : 16}
          height={compact ? 14 : 16}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.5L20 7v10l-8 4.5L4 17V7l8-4.5Z"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12.5h4.2l2.3-3.2"
            stroke="currentColor"
            className="text-white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="15.5" cy="8.8" r="1.15" className="fill-accent" />
        </svg>
      </span>
      <span
        className={`font-display font-semibold tracking-tight ${
          compact ? "text-[13px]" : "text-[15px]"
        }`}
      >
        Core<span className="text-accent">Pilot</span>
      </span>
    </Link>
  );
}
