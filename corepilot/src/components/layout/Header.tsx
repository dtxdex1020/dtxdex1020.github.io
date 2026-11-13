import { Logo } from "./Logo";

/**
 * Marketing nav — Linear homepage language:
 * logo left, muted text links, white pill CTA (black text).
 */
export function Header() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex h-[56px] w-full max-w-[1120px] items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo />

        <nav className="flex items-center gap-5" aria-label="Primary">
          <a
            href="#overview"
            className="hidden text-[13px] text-[#8a8a8a] transition-colors hover:text-white sm:inline"
          >
            Product
          </a>
          <a
            href="#get-started"
            className="text-[13px] text-[#8a8a8a] transition-colors hover:text-white"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="inline-flex h-[28px] items-center rounded-full bg-white px-3 text-[13px] font-medium text-black transition-opacity hover:opacity-90"
          >
            Sign up
          </a>
          <button
            type="button"
            className="ml-1 flex h-8 w-8 items-center justify-center text-white sm:hidden"
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="block h-px w-4 bg-white" />
              <span className="block h-px w-4 bg-white" />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
