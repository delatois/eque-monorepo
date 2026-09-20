import { PixelWipe, EQUE_DARK, EQUE_TEAL } from "./pixel-wipe";

/**
 * Section 3 — the same ASCII wipe in reverse: teal floods back to dark.
 * Placeholder content until the real Product section lands here.
 */
export function ProductTeaser() {
  return (
    <PixelWipe
      from={EQUE_TEAL}
      to={EQUE_DARK}
      glyphColor={EQUE_DARK}
      label="Product teaser"
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display max-w-[20ch] text-3xl font-bold tracking-[-0.02em] text-balance text-[#E4EAF0] md:text-4xl">
          Lorem ipsum dolor sit amet
        </h2>
        <p className="font-body mt-4 max-w-[52ch] leading-[1.6] text-[#A9B5C2]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    </PixelWipe>
  );
}
