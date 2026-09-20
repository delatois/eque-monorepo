"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEAL = "#1FFFC3";
const DARK = "#070A0F";
const INK = "#031A14";
const CELL = 34; // grid cell size in CSS px

interface Cell {
  col: number;
  row: number;
  rainDelay: number;
  fillAt: number;
  fallDist: number;
  jitter: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * PixelWipe — pinned scroll-driven transition section.
 *
 * Scroll phases (single scrubbed timeline, pinned for +=300%):
 *   1. rain   — ASCII ▲ triangles fall from the top, staggered per column
 *   2. fill   — triangles lock in one by one, screen floods teal
 *   3. reveal — canvas fades, circle image + paragraph reveal on teal
 *
 * Canvas is driven by one shared progress value (rAF render loop);
 * DOM tweens (bg morph, content reveal) live on the scrubbed timeline.
 * prefers-reduced-motion skips straight to the final state.
 */
export function PixelWipe() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
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

      const buildGrid = () => {
        const rect = section.getBoundingClientRect();
        cssW = rect.width;
        cssH = rect.height;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.floor(cssW * dpr));
        canvas.height = Math.max(1, Math.floor(cssH * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cols = Math.ceil(cssW / CELL);
        const rows = Math.ceil(cssH / CELL);
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
      const render = () => {
        const p = progressRef.current;
        ctx.clearRect(0, 0, cssW, cssH);
        if (p <= 0) return;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < cells.length; i++) {
          const c = cells[i];
          if (!c) continue;
          const cx = (c.col + 0.5) * CELL;
          const baseY = (c.row + 0.5) * CELL;
          const filled = p >= c.fillAt;

          if (!filled) {
            const rt = (p - c.rainDelay) / 0.25;
            if (rt <= 0) continue;
            const t = Math.min(rt, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            const y = baseY - (1 - ease) * c.fallDist;
            ctx.globalAlpha = Math.min(t * 1.6, 1) * 0.9;
            ctx.fillStyle = TEAL;
            ctx.font = `${CELL * 0.6}px "Spline Sans Mono", monospace`;
            ctx.fillText("▲", cx, y);
          } else {
            // lock-in pop, then solid triangle
            const lt = Math.min((p - c.fillAt) / 0.04, 1);
            const pop = 0.6 + 0.4 * (1 - Math.pow(1 - lt, 2));
            const s = CELL * 0.4 * c.jitter * pop;
            ctx.globalAlpha = 1;
            ctx.fillStyle = TEAL;
            ctx.beginPath();
            ctx.moveTo(cx, baseY - s);
            ctx.lineTo(cx + s * 0.95, baseY + s * 0.72);
            ctx.lineTo(cx - s * 0.95, baseY + s * 0.72);
            ctx.closePath();
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      };

      // rAF loop runs only while the section is pinned/active
      let raf = 0;
      let running = false;
      const loop = () => {
        render();
        if (running) raf = requestAnimationFrame(loop);
      };
      const startLoop = () => {
        if (!running) {
          running = true;
          raf = requestAnimationFrame(loop);
        }
      };
      const stopLoop = () => {
        running = false;
        cancelAnimationFrame(raf);
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
        gsap.set(section, { backgroundColor: TEAL });
        gsap.set(canvas, { display: "none" });
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        gsap.set(circleRef.current, { scale: 1 });
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
          },
          onToggle: (self) => {
            if (self.isActive) startLoop();
            else stopLoop();
          },
        },
      });

      tl.addLabel("rain", 0);
      // bg morph: dark -> teal while cells lock in
      tl.to(section, { backgroundColor: TEAL, duration: 0.5 }, 0.25);
      tl.addLabel("fill", 0.35);
      // canvas fades once the screen is flooded
      tl.to(canvas, { opacity: 0, duration: 0.06 }, 0.8);
      tl.addLabel("reveal", 0.82);
      tl.fromTo(
        circleRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.1 },
        0.82
      );
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.12 },
        0.84
      );

      // recalc after fonts load (glyph metrics / layout)
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh).catch(() => {});

      return () => {
        stopLoop();
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-svh overflow-hidden"
      style={{ backgroundColor: DARK }}
      aria-label="Pixel wipe transition"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Final state: circle image + copy on teal */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex items-center justify-center px-6 opacity-0"
      >
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-[11px] tracking-[0.2em] text-[#031A14]/60">
            ┌─ transition / 002 ─┐
          </p>
          <div
            ref={circleRef}
            className="mt-8 h-40 w-40 overflow-hidden rounded-full bg-[#070A0F] opacity-0 ring-4 ring-[#031A14]/15 md:h-48 md:w-48"
          >
            <Image
              src="/eque-logo.png"
              alt="eque"
              width={192}
              height={192}
              className="h-full w-full object-contain p-10"
            />
          </div>
          <h2 className="font-display mt-8 max-w-[20ch] text-3xl font-bold tracking-[-0.02em] text-balance text-[#031A14] md:text-4xl">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="font-body mt-4 max-w-[52ch] leading-[1.6] text-[#031A14]/75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
      </div>
    </section>
  );
}
