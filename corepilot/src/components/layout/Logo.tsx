import Link from "next/link";

type LogoProps = {
  className?: string;
};

/** CorePilot mark + wordmark — distinct from Linear’s logo. */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-white transition-opacity hover:opacity-80 ${className}`}
      aria-label="CorePilot home"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2.5L20 7v10l-8 4.5L4 17V7l8-4.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12.5h4.2l2.3-3.2"
            stroke="currentColor"
            className="text-[#5b9fd4]"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="15.5" cy="8.8" r="1.1" fill="#5b9fd4" />
        </svg>
      </span>
      <span className="font-display text-[14px] font-semibold tracking-tight">CorePilot</span>
    </Link>
  );
}
