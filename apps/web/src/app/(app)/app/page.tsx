import { EqueLogo } from "@/components/eque-logo";

export default function AppHome() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-md border border-eque-line bg-eque-surface p-8 text-center sm:p-10">
        <EqueLogo className="mx-auto h-10 w-10" />
        <p
          className="font-display mt-6 text-[11px] tracking-[0.2em] text-eque-muted"
          aria-hidden="true"
        >
          ┌─ app / 002 ─┐
        </p>
        <h1 className="font-display mt-4 text-2xl font-bold tracking-[-0.02em] text-eque-hero">
          Eque App
        </h1>
        <p className="font-body mx-auto mt-3 max-w-[40ch] text-sm leading-[1.6] text-eque-text-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. The main
          application shell lives here.
        </p>
        <a
          href="/"
          className="font-display mt-8 inline-flex h-10 items-center border border-eque-border px-5 text-[13px] font-medium tracking-[0.04em] text-eque-text transition-colors duration-150 hover:border-eque-teal/40 hover:text-eque-teal"
        >
          ← Back to site
        </a>
      </div>
    </main>
  );
}
