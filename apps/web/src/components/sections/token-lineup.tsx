"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelWipe, EQUE_DARK, EQUE_TEAL } from "./pixel-wipe";
import { cn } from "@/lib/utils";

interface OrbitIcon {
  src: string;
  alt: string;
  /** base display size in px (scaled down responsively) */
  size: number;
  /** 0 = outer ring, 1 = inner ring */
  orbit: 0 | 1;
  /** float-mode anchor, % of the layer */
  xPct: number;
  yPct: number;
  /** zero-g drift params */
  ampX: number;
  ampY: number;
  speed: number;
  phase: number;
  rotAmp: number;
  layer: "back" | "mid" | "front";
}

const ICONS: OrbitIcon[] = [
  // outer ring — 4 icons
  { src: "/images/tesla.webp",  alt: "Tesla",  size: 104, orbit: 0, xPct: 12, yPct: 15, ampX: 26, ampY: 20, speed: 0.32, phase: 0.4, rotAmp: 7, layer: "back" },
  { src: "/images/nvidia.webp", alt: "NVIDIA", size: 104, orbit: 0, xPct: 84, yPct: 13, ampX: 22, ampY: 26, speed: 0.28, phase: 2.1, rotAmp: 6, layer: "back" },
  { src: "/images/meta.webp",   alt: "Meta",   size: 88,  orbit: 0, xPct: 10, yPct: 77, ampX: 24, ampY: 18, speed: 0.36, phase: 4.4, rotAmp: 8, layer: "mid"  },
  { src: "/images/apple.webp",  alt: "Apple",  size: 88,  orbit: 0, xPct: 86, yPct: 75, ampX: 20, ampY: 24, speed: 0.3,  phase: 1.2, rotAmp: 5, layer: "mid"  },
  // inner ring — 4 icons
  { src: "/images/microsoft.webp", alt: "Microsoft", size: 72, orbit: 1, xPct: 25, yPct: 31, ampX: 18, ampY: 22, speed: 0.42, phase: 3.1, rotAmp: 9,  layer: "mid"   },
  { src: "/images/qqq.webp",       alt: "QQQ",       size: 64, orbit: 1, xPct: 70, yPct: 27, ampX: 22, ampY: 16, speed: 0.38, phase: 5.3, rotAmp: 7,  layer: "front" },
  { src: "/images/spacex.webp",    alt: "SpaceX",    size: 64, orbit: 1, xPct: 28, yPct: 65, ampX: 16, ampY: 20, speed: 0.45, phase: 0.9, rotAmp: 10, layer: "front" },
  { src: "/images/google.webp",    alt: "Google",    size: 64, orbit: 1, xPct: 68, yPct: 65, ampX: 20, ampY: 18, speed: 0.34, phase: 2.8, rotAmp: 6,  layer: "front" },
];

/**
 * Orbit rings (px at scale 1, desktop): wide ellipses with generous
 * clearance around the centered copy, morpho-style. Counter-rotating.
 */
const RINGS = [
  { rx: 640, ry: 450, duration: 120, direction: 1 }, // outer — slow clockwise
  { rx: 410, ry: 295, duration: 85, direction: -1 }, // inner — counter-clockwise
];

const LAYER_CLASS: Record<OrbitIcon["layer"], string> = {
  // depth order AMONG icons only — the whole layer sits at z-0, behind the
  // copy (z-10), so no icon ever covers the text
  back: "z-0",
  mid: "z-10",
  front: "z-20",
};

const LAYER_FX: Record<OrbitIcon["layer"], string> = {
  // back sits deepest — soft focus + dimmed for depth. Static class (rasterized
  // once), never animated: animating blur filters per-frame melts phone GPUs.
  back: "blur-[1.5px] brightness-[0.8]",
  mid: "",
  front: "",
};

const SHADOW_CLASS: Record<OrbitIcon["layer"], string> = {
  // box-shadow (not drop-shadow filter): same look on circular icons,
  // but doesn't force the browser to re-rasterize the filter every frame
  back: "shadow-[0_6px_10px_rgba(0,0,0,0.45)]",
  mid: "shadow-[0_10px_18px_rgba(0,0,0,0.5)]",
  front: "shadow-[0_14px_28px_rgba(0,0,0,0.6)]",
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---- scrubbed entrance --------------------------------------------------
// Each icon owns a slice of wipe progress: it grows + disperses out from the
// center as the user scrolls through its window. Slow scroll = slow,
// one-by-one appearance; the section settles exactly as the icons finish.
// Windows never overlap (LEN < STEP) so icons truly appear one at a time.
const ENTER_START = 0.78;
const ENTER_STEP = 0.0215;
const ENTER_LEN = 0.02;
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.30158; // softer than the default 1.70158
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// ---- starfield ----------------------------------------------------------
// Deterministic pseudo-random (mulberry32): identical on SSR and client, so
// no hydration mismatch. Tiny ink dots scattered across the section for
// depth — the calm starfield behind the icons, morpho-style.
const mulberry32 = (seed: number) => {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

interface Star {
  x: number;
  y: number;
  s: number;
  o: number;
  twinkle: boolean;
  dur: number;
  delay: number;
}

const STARS: Star[] = (() => {
  const rand = mulberry32(20260921);
  return Array.from({ length: 110 }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    s: rand() < 0.82 ? 1 : 2,
    o: 0.1 + rand() * 0.28,
    twinkle: rand() < 0.22,
    dur: 3 + rand() * 3.5,
    delay: rand() * 5,
  }));
})();

/**
 * Icon state machine, driven by the wipe's ScrollTrigger:
 *   - pin active + progress < 0.89 → floating (zero-g drift)
 *   - pin active + progress >= 0.94 → orbit (two elliptical rings around copy)
 *   - pin inactive → icons exit (shrink in place)
 * Enter is SCRUB-driven: each icon owns a slice of wipe progress (0.78–0.95)
 * and grows from invisible at the center, dispersing out to its anchor, one
 * icon at a time — at the speed of the user's scroll. Exit = shrink back to
 * invisible via a quick tween. Opacity + transform only — no blur filters,
 * so the animation stays on the compositor and never janks.
 * One gsap.ticker drives every icon, but ONLY while the pin is active; a blend
 * value morphs float <-> orbit.
 */
function Floaters({
  registerHandler,
}: {
  registerHandler: (fn: (self: ScrollTrigger) => void) => void;
}) {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const outers = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-floater]")
    );
    const anims = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-floater-anim]")
    );
    const boxes = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-floater-box]")
    );
    if (outers.length !== ICONS.length) return;

    const starfield = layer.querySelector<HTMLElement>("[data-starfield]");

    // ---- responsive measurements --------------------------------------
    // Rings scale to fit the viewport; the copy is measured so the rings keep
    // clearance around it instead of plowing through the text.
    let W = 0;
    let H = 0;
    let ringRx = [RINGS[0]!.rx, RINGS[1]!.rx];
    let ringRy = [RINGS[0]!.ry, RINGS[1]!.ry];
    const measure = () => {
      W = layer.clientWidth;
      H = layer.clientHeight;
      const copyBox = layer.parentElement?.querySelector<HTMLElement>(
        ".wipe-copy > *"
      );
      const cw = copyBox?.offsetWidth ?? 0;
      const ch = copyBox?.offsetHeight ?? 0;
      const clearance = W < 768 ? 90 : 130;
      const needRx = cw / 2 + clearance;
      const needRy = ch / 2 + clearance;

      // fit the (clearance-aware) outer ring inside the viewport
      const wantRx = Math.max(RINGS[0]!.rx, needRx);
      const wantRy = Math.max(RINGS[0]!.ry, needRy);
      const fit = Math.min(
        1,
        (W / 2 - 40) / wantRx,
        (H / 2 - 40) / wantRy
      );
      const s = Math.max(fit, 0.35);
      ringRx = [
        wantRx * s,
        Math.max(RINGS[1]!.rx, needRx * 0.66) * s,
      ];
      ringRy = [
        wantRy * s,
        Math.max(RINGS[1]!.ry, needRy * 0.66) * s,
      ];

      const iconScale = Math.max(s, 0.55);
      boxes.forEach((box, i) => {
        const icon = ICONS[i];
        if (!icon) return;
        const px = Math.round(icon.size * iconScale);
        box.style.width = `${px}px`;
        box.style.height = `${px}px`;
      });
    };
    measure();
    window.addEventListener("resize", measure);

    // ---- orbit slot per icon (evenly spaced on its ring) ----------------
    const slots = ICONS.map((icon, i) => {
      let idx = 0;
      for (let j = 0; j < i; j++) {
        if (ICONS[j]?.orbit === icon.orbit) idx++;
      }
      const count = ICONS.filter((ic) => ic.orbit === icon.orbit).length;
      return { ring: RINGS[icon.orbit]!, idx, count };
    });

    // ---- shared state ---------------------------------------------------
    const blend = { v: 0 }; // 0 = floating, 1 = orbiting
    const prog = { v: 0 }; // latest wipe progress, mirrored for the ticker
    const mode: { name: "float" | "orbit"; active: boolean } = {
      name: "float",
      active: false,
    };

    gsap.set(outers, { xPercent: -50, yPercent: -50 });

    const tick = () => {
      // pin not on screen: skip all per-frame work (battery + heat)
      if (!mode.active) return;
      const t = gsap.ticker.time;
      const b = blend.v;
      const p = prog.v;
      const cx = W / 2;
      const cy = H / 2;
      // starfield fades in across the entrance span
      if (starfield) {
        gsap.set(starfield, {
          autoAlpha: clamp01((p - ENTER_START) / 0.17),
        });
      }
      for (let i = 0; i < outers.length; i++) {
        const el = outers[i];
        const icon = ICONS[i];
        const slot = slots[i];
        if (!el || !icon || !slot) continue;
        // float: zero-g drift around its anchor
        const fx =
          (icon.xPct / 100) * W +
          Math.sin(t * icon.speed + icon.phase) * icon.ampX;
        const fy =
          (icon.yPct / 100) * H +
          Math.cos(t * icon.speed * 0.9 + icon.phase * 1.3) * icon.ampY;
        const fr = Math.sin(t * icon.speed * 0.7 + icon.phase) * icon.rotAmp;
        // scrubbed entrance: this icon's own progress window. It grows from
        // invisible at the center, then disperses out to its anchor — one
        // icon at a time, at the speed of the user's scroll.
        const animEl = anims[i];
        if (!animEl) continue;
        const lp = clamp01((p - (ENTER_START + i * ENTER_STEP)) / ENTER_LEN);
        gsap.set(animEl, {
          scale: lp <= 0 ? 0 : easeOutBack(lp),
          autoAlpha: lp <= 0 ? 0 : Math.min(1, lp * 2),
        });
        const d = easeOutCubic(lp);
        const dx = lerp(cx, fx, d);
        const dy = lerp(cy, fy, d);
        // orbit: elliptical ring around the centered copy (stays upright)
        const ang =
          (slot.idx / slot.count) * Math.PI * 2 +
          slot.ring.direction * ((t * Math.PI * 2) / slot.ring.duration);
        const ox = cx + Math.cos(ang) * ringRx[icon.orbit]!;
        const oy = cy + Math.sin(ang) * ringRy[icon.orbit]!;
        gsap.set(el, {
          x: lerp(dx, ox, b),
          y: lerp(dy, oy, b),
          rotation: fr * (1 - b),
        });
      }
    };

    if (!reduceMotion) {
      gsap.ticker.add(tick);
      tick();
    } else {
      // static fallback: parked at float anchors, always visible
      outers.forEach((el, i) => {
        const icon = ICONS[i];
        if (!el || !icon) return;
        gsap.set(el, {
          x: (icon.xPct / 100) * W,
          y: (icon.yPct / 100) * H,
        });
      });
      gsap.set(anims, { autoAlpha: 1 });
      if (starfield) gsap.set(starfield, { autoAlpha: 1 });
    }

    // ---- enter / exit -----------------------------------------------------
    // transform + opacity only: from invisible (scale 0) up to full size on
    // settle, back down to invisible on exit. No blur — blur filters force a
    // re-raster every frame and are the main source of the scroll jank.
    // ---- exit -------------------------------------------------------------
    // Entrance is scrub-driven (see tick) — exit stays a quick tween:
    // shrink in place to invisible. transform + opacity only, no filters.
    const exitIcons = () => {
      gsap.killTweensOf(anims);
      gsap.to(anims, {
        autoAlpha: 0,
        scale: 0,
        duration: 0.55,
        ease: "back.in(1.5)",
        stagger: 0.03,
        overwrite: true,
      });
      if (starfield) {
        gsap.to(starfield, {
          autoAlpha: 0,
          duration: 0.4,
          overwrite: true,
        });
      }
    };
    const setMode = (m: "float" | "orbit") => {
      if (mode.name === m) return;
      mode.name = m;
      gsap.to(blend, {
        v: m === "orbit" ? 1 : 0,
        duration: 1.4,
        ease: "power2.inOut",
        overwrite: true,
      });
    };

    // ---- scroll state machine ---------------------------------------------
    const handleTrigger = (self: ScrollTrigger) => {
      if (reduceMotion) return;
      prog.v = self.progress;
      if (!self.isActive) {
        if (mode.active) {
          mode.active = false;
          exitIcons();
        }
        return;
      }
      if (!mode.active) {
        mode.active = true;
        // entrance is scrub-owned now — just kill any running exit tween
        gsap.killTweensOf(anims);
        if (starfield) gsap.killTweensOf(starfield);
      }
      const p = self.progress;
      if (p >= 0.94) setMode("orbit");
      else if (p <= 0.89) setMode("float");
    };
    registerHandler(handleTrigger);

    return () => {
      window.removeEventListener("resize", measure);
      gsap.ticker.remove(tick);
      gsap.killTweensOf(blend);
      registerHandler(() => {});
    };
  }, [registerHandler]);

  return (
    <div
      ref={layerRef}
      // z-0: creates a stacking context, so every icon stays BEHIND the copy
      // (z-10) — icons can never cover the text, even mid-orbit.
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      {/* starfield — static ink dots for depth behind the icons. Twinkle is
          opacity-only (compositor-friendly); ~1/5 of the dots twinkle. */}
      <div data-starfield className="absolute inset-0 opacity-0">
        {STARS.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#031A14]"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              opacity: st.o,
              animation: st.twinkle
                ? `eque-twinkle ${st.dur}s ease-in-out ${st.delay}s infinite`
                : undefined,
            }}
          />
        ))}
      </div>
      {ICONS.map((icon) => (
        <div
          key={icon.src}
          data-floater
          className={cn(
            "absolute top-0 left-0 will-change-transform",
            LAYER_CLASS[icon.layer]
          )}
        >
          <div data-floater-anim className="opacity-0">
            <div
              data-floater-box
              className={cn(
                "overflow-hidden rounded-full",
                LAYER_FX[icon.layer],
                SHADOW_CLASS[icon.layer]
              )}
            >
              <Image
                src={icon.src}
                alt=""
                width={288}
                height={288}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Section 2 — dark wipes to teal, revealing the token lineup.
 * Icons disperse from the center into zero-g drift while the wipe settles,
 * then morph into two slow elliptical orbits around the copy once the
 * section is in place. A static starfield adds depth behind them.
 * All icons render behind the copy.
 */
export function TokenLineup() {
  const handlerRef = useRef<(self: ScrollTrigger) => void>(() => {});
  const registerHandler = useCallback(
    (fn: (self: ScrollTrigger) => void) => {
      handlerRef.current = fn;
    },
    []
  );

  return (
    <PixelWipe
      from={EQUE_DARK}
      to={EQUE_TEAL}
      glyphColor={EQUE_TEAL}
      label="Token lineup"
      onTrigger={(self) => handlerRef.current(self)}
      floaters={<Floaters registerHandler={registerHandler} />}
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display max-w-[20ch] text-3xl font-bold tracking-[-0.02em] text-balance text-[#031A14] md:text-4xl">
          Lorem ipsum dolor sit amet
        </h2>
        <p className="font-body mt-4 max-w-[52ch] leading-[1.6] text-[#031A14]/75">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    </PixelWipe>
  );
}
