import PixelBlast from "@/components/PixelBlast";

/**
 * Hero section — full-viewport interactive PixelBlast backdrop.
 *
 * Interactivity note: ripples fire on `pointerdown` directly on the
 * PixelBlast canvas. The content wrapper is `pointer-events-none` so taps
 * pass through to the canvas (only the CTA links re-enable pointer events).
 * Without this, the centered content div would swallow taps and no ripple
 * would appear.
 */
export function Hero() {
  return (
    <section
      className="relative flex min-h-[min(100svh,56rem)] items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* PixelBlast backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <PixelBlast
            variant="triangle"
            pixelSize={5}
            color="#1FFFC3"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.45}
            edgeFade={0.2}
            transparent
          />
        </div>
      </div>

      {/* Legibility wash */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, rgba(7,10,15,0.55), rgba(7,10,15,0.88) 75%)",
        }}
      />

      {/* Content — clicks pass through to the canvas for ripples */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center md:px-12">
        <h1 className="font-display mx-auto max-w-[16ch] text-[clamp(2.75rem,1.6rem+5vw,5rem)] leading-[1.0] font-bold tracking-[-0.03em] text-balance text-[#F4F7FA]">
          Lorem ipsum dolor sit{" "}
          <span className="text-[#1FFFC3]">amet consectetur</span>
        </h1>

        <p className="font-body mx-auto mt-6 max-w-[52ch] text-lg leading-[1.6] text-[#A9B5C2]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad
          minim veniam.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="pixel-notch font-display pointer-events-auto inline-flex h-11 items-center bg-[#1FFFC3] px-6 text-sm font-medium tracking-[0.02em] text-[#031A14] transition-colors duration-120 hover:bg-[#5CFFD3] hover:shadow-[0_0_24px_rgba(31,255,195,0.24)] active:translate-y-[1px] active:bg-[#00E0A4]"
          >
            Launch App
          </a>
          <a
            href="#"
            className="bracket font-display pointer-events-auto inline-flex h-11 items-center border border-[#252F3C] px-6 text-sm font-medium tracking-[0.02em] text-[#1FFFC3] transition-colors duration-120 hover:border-[rgba(31,255,195,0.4)] hover:bg-[rgba(31,255,195,0.08)] active:bg-[rgba(31,255,195,0.16)]"
          >
            Read the docs
          </a>
        </div>
      </div>

      {/* Bottom meta strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 border-t border-[#1A222D]">
        <div className="font-display mx-auto flex max-w-7xl items-center justify-center px-6 py-3 text-[11px] tracking-[0.04em] text-[#718094] md:px-12">
          <span aria-hidden="true">▌ ▌ ▌</span>
        </div>
      </div>
    </section>
  );
}
