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
  { rx: 640, ry: 450, duration: 95, direction: 1 }, // outer — slow clockwise
  { rx: 410, ry: 295, duration: 62, direction: -1 }, // inner — counter-clockwise
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

/**
 * Icon state machine, driven by the wipe's ScrollTrigger:
 *   - pin active + progress < 0.93 → floating (zero-g drift)
 *   - pin active + progress >= 0.97 → orbit (two elliptical rings around copy)
 *   - pin inactive → icons exit
 * Enter = grow from invisible (scale 0) to full size as the section settles.
 * Exit = shrink back to invisible. Opacity + transform only — no blur filters,
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
      const cx = W / 2;
      const cy = H / 2;
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
        // orbit: elliptical ring around the centered copy (stays upright)
        const ang =
          (slot.idx / slot.count) * Math.PI * 2 +
          slot.ring.direction * ((t * Math.PI * 2) / slot.ring.duration);
        const ox = cx + Math.cos(ang) * ringRx[icon.orbit]!;
        const oy = cy + Math.sin(ang) * ringRy[icon.orbit]!;
        gsap.set(el, {
          x: lerp(fx, ox, b),
          y: lerp(fy, oy, b),
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
    }

    // ---- enter / exit -----------------------------------------------------
    // transform + opacity only: from invisible (scale 0) up to full size on
    // settle, back down to invisible on exit. No blur — blur filters force a
    // re-raster every frame and are the main source of the scroll jank.
    const enterIcons = () => {
      gsap.killTweensOf(anims);
      gsap.fromTo(
        anims,
        { autoAlpha: 0, scale: 0, y: 70 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.5)",
          stagger: 0.08,
          overwrite: true,
        }
      );
    };
    const exitIcons = () => {
      gsap.killTweensOf(anims);
      gsap.to(anims, {
        autoAlpha: 0,
        scale: 0,
        y: -50,
        duration: 0.6,
        ease: "back.in(1.4)",
        stagger: 0.035,
        overwrite: true,
      });
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
      if (!self.isActive) {
        if (mode.active) {
          mode.active = false;
          exitIcons();
        }
        return;
      }
      if (!mode.active) {
        mode.active = true;
        enterIcons();
      }
      const p = self.progress;
      if (p >= 0.97) setMode("orbit");
      else if (p <= 0.93) setMode("float");
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
 * Icons float in zero-g while the wipe runs, then settle into two
 * elliptical orbits around the copy once the section is in place.
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
