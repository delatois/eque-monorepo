"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const EQUE_DARK = "#070A0F";
export const EQUE_TEAL = "#1FFFC3";
export const EQUE_INK = "#031A14";

const GLYPH = "◢";
// smaller cells = denser grid; phones get chunkier cells (fewer glyphs to draw)
const cellSize = () =>
  typeof window !== "undefined" && window.innerWidth < 768 ? 46 : 34;

interface Cell {
  col: number;
  row: number;
  rainDelay: number;
  fillAt: number;
  fallDist: number;
  jitter: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

interface PixelWipeProps {
  /** bg color when the section starts */
  from: string;
  /** bg color when the wipe completes */
  to: string;
  /** ASCII triangle color */
  glyphColor: string;
  label: string;
  /** centered reveal copy */
  children: ReactNode;
  /** optional absolutely-positioned floating layer (icons, etc.) */
  floaters?: ReactNode;
}

/**
 * PixelWipe — pinned scroll-driven transition section.
 *
 * Scroll phases (single scrubbed timeline, pinned for +=300%):
 *   1. rain   — ASCII ◢ triangles fall from the top, staggered per column
 *   2. fill   — triangles lock in one by one, screen floods toward `to`
 *   3. reveal — canvas fades, `floaters` + centered `children` reveal
 *
 * Canvas is driven by one shared progress value (rAF render loop);
 * DOM tweens (bg morph, reveal) live on the scrubbed timeline.
 * prefers-reduced-motion skips straight to the final state.
 */
export function PixelWipe({
  from,
  to,
  glyphColor,
  label,
  children,
  floaters,
}: PixelWipeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      if (!section || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // ---- grid -----------------------------------------------------------
      let cells: Cell[] = [];
      let cssW = 0;
      let cssH = 0;
      let cell = cellSize();

      const buildGrid = () => {
        const rect = section.getBoundingClientRect();
        cssW = rect.width;
        cssH = rect.height;
        cell = cellSize();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.floor(cssW * dpr));
        canvas.height = Math.max(1, Math.floor(cssH * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cols = Math.ceil(cssW / cell);
        const rows = Math.ceil(cssH / cell);
        cells = [];
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            cells.push({
              col,
              row,
              rainDelay: (col / Math.max(cols - 1, 1)) * 0.12 + rand(0, 0.08),
              fillAt: 0.35 + Math.random() * 0.4,
              fallDist: rand(cssH * 0.4, cssH * 1.1),
              jitter: rand(0.85, 1.15),
            });
          }
        }
      };
      buildGrid();

      // ---- canvas render --------------------------------------------------
      // Rendered ON DEMAND only (when scroll progress changes) — never in a
      // perpetual rAF loop. A full grid of fillText() every frame burns phone
      // CPUs even when the user isn't scrolling or the canvas is faded out.
      const render = () => {
        const p = progressRef.current;
        ctx.clearRect(0, 0, cssW, cssH);
        if (p <= 0) return;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = glyphColor;

        for (let i = 0; i < cells.length; i++) {
          const c = cells[i];
          if (!c) continue;
          const cx = (c.col + 0.5) * cell;
          const baseY = (c.row + 0.5) * cell;
          const filled = p >= c.fillAt;

          if (!filled) {
            const rt = (p - c.rainDelay) / 0.25;
            if (rt <= 0) continue;
            const t = Math.min(rt, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            const y = baseY - (1 - ease) * c.fallDist;
            ctx.globalAlpha = Math.min(t * 1.6, 1) * 0.9;
            ctx.font = `${cell * 0.72}px "Spline Sans Mono", monospace`;
            ctx.fillText(GLYPH, cx, y);
          } else {
            // lock-in pop, then solid glyph
            const lt = Math.min((p - c.fillAt) / 0.04, 1);
            const pop = 0.6 + 0.4 * (1 - Math.pow(1 - lt, 2));
            ctx.globalAlpha = 1;
            ctx.font = `${cell * 0.8 * c.jitter * pop}px "Spline Sans Mono", monospace`;
            ctx.fillText(GLYPH, cx, baseY);
          }
        }
        ctx.globalAlpha = 1;
      };
      render(); // paint initial (empty) frame

      const onResize = () => {
        buildGrid();
        render();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      // ---- reduced motion: jump to final state ----------------------------
      if (reduceMotion) {
        gsap.set(section, { backgroundColor: to });
        gsap.set(canvas, { display: "none" });
        gsap.set(".wipe-icon", { scale: 1, autoAlpha: 1 });
        gsap.set(".wipe-copy", { autoAlpha: 1, y: 0 });
        window.removeEventListener("resize", onResize);
        return;
      }

      // ---- scrubbed timeline ----------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            render();
          },
        },
      });

      tl.addLabel("rain", 0);
      // bg morph: from -> to while cells lock in
      tl.to(section, { backgroundColor: to, duration: 0.5 }, 0.25);
      tl.addLabel("fill", 0.35);
      // canvas fades once the screen is flooded
      tl.to(canvas, { autoAlpha: 0, duration: 0.06 }, 0.8);
      tl.addLabel("reveal", 0.82);
      if (section.querySelectorAll(".wipe-icon").length > 0) {
        tl.fromTo(
          ".wipe-icon",
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.08, stagger: 0.012 },
          "reveal"
        );
      }
      tl.fromTo(
        ".wipe-copy",
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 0.12 },
        "reveal+=0.02"
      );

      // recalc after fonts load (glyph metrics / layout)
      document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

      return () => {
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-svh overflow-hidden"
      style={{ backgroundColor: from }}
      aria-label={label}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {floaters}

      {/* Centered reveal copy */}
      <div className="wipe-copy absolute inset-0 z-10 flex items-center justify-center px-6">
        {children}
      </div>
    </section>
  );
}
