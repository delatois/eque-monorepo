"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PixelWipe, EQUE_DARK, EQUE_TEAL } from "./pixel-wipe";
import { cn } from "@/lib/utils";

interface FloaterIcon {
  src: string;
  alt: string;
  /** display size — deliberately abstract: big / medium / small */
  size: string;
  pos: string;
  layer: "back" | "mid" | "front";
}

const ICONS: FloaterIcon[] = [
  { src: "/images/tesla.png",     alt: "Tesla",     size: "w-24 md:w-32", pos: "left-[6%] top-[10%]",     layer: "back"  },
  { src: "/images/spacex.png",    alt: "SpaceX",    size: "w-16 md:w-20", pos: "right-[10%] top-[16%]",   layer: "front" },
  { src: "/images/nvidia.png",    alt: "NVIDIA",    size: "w-28 md:w-36", pos: "left-[3%] top-[42%]",     layer: "mid"   },
  { src: "/images/qqq.png",       alt: "QQQ",       size: "w-10 md:w-12", pos: "right-[20%] top-[30%]",    layer: "back"  },
  { src: "/images/google.png",    alt: "Google",    size: "w-16 md:w-20", pos: "left-[12%] bottom-[26%]",  layer: "front" },
  { src: "/images/apple.png",     alt: "Apple",     size: "w-12 md:w-14", pos: "right-[8%] bottom-[30%]", layer: "mid"   },
  { src: "/images/meta.png",      alt: "Meta",      size: "w-20 md:w-24", pos: "left-[36%] bottom-[10%]", layer: "back"  },
  { src: "/images/microsoft.png", alt: "Microsoft", size: "w-10 md:w-12", pos: "right-[5%] top-[58%]",     layer: "front" },
];

const LAYER_CLASS: Record<FloaterIcon["layer"], string> = {
  // back sits behind the copy, slightly out of focus for depth
  back: "z-0 blur-[1.5px] brightness-[0.85]",
  mid: "z-10",
  // front floats above the copy
  front: "z-20",
};

const SHADOW_CLASS: Record<FloaterIcon["layer"], string> = {
  // box-shadow (not drop-shadow filter): same look on circular icons,
  // but doesn't force the browser to re-rasterize the filter every frame
  back: "shadow-[0_6px_10px_rgba(0,0,0,0.45)]",
  mid: "shadow-[0_10px_18px_rgba(0,0,0,0.5)]",
  front: "shadow-[0_14px_28px_rgba(0,0,0,0.6)]",
};

/**
 * Zero-gravity drift: each icon wanders on its own slow sine loop.
 * Only x/y/rotation are touched here — the scrubbed reveal timeline owns
 * scale/autoAlpha on the outer wrapper, so the two never fight.
 */
function Floaters() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".float-inner").forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-26, 26),
          y: gsap.utils.random(-34, 34),
          rotation: gsap.utils.random(-14, 14),
          duration: gsap.utils.random(3.5, 6.5),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 2),
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {ICONS.map((icon) => (
        <div
          key={icon.src}
          className={cn("wipe-icon absolute", icon.pos, LAYER_CLASS[icon.layer])}
        >
          <div className={cn("float-inner rounded-full", SHADOW_CLASS[icon.layer])}>
            <Image
              src={icon.src}
              alt=""
              width={144}
              height={144}
              className={cn(icon.size, "h-auto rounded-full")}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Section 2 — dark wipes to teal, revealing the token lineup:
 * 8 stock icons floating in zero-g around centered copy.
 */
export function TokenLineup() {
  return (
    <PixelWipe
      from={EQUE_DARK}
      to={EQUE_TEAL}
      glyphColor={EQUE_TEAL}
      label="Token lineup"
      floaters={<Floaters />}
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
