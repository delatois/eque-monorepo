"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { EqueLogo, EqueWordmark } from "@/components/eque-logo";
import { cn } from "@/lib/utils";

/* Z-index scale (systemic layers only):
 *   z-50  navbar bar (stays above the mobile panel so the toggle is reachable)
 *   z-40  mobile menu panel (slides in under the bar)
 *   z-10  hero content
 */

const NAV_LINKS = [
  { label: "Product", href: "#" },
  { label: "Features", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Docs", href: "#" },
];

const EASE: [number, number, number, number] = [0.2, 0, 0, 1];

const panelVariants = {
  hidden: { opacity: 0, y: -16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE, staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: EASE } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE } },
};

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 top-0 h-[2px] w-full bg-eque-text transition-all duration-200",
          open && "top-1/2 -translate-y-1/2 rotate-45 bg-eque-teal",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-eque-text transition-all duration-200",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[2px] w-full bg-eque-text transition-all duration-200",
          open && "bottom-1/2 translate-y-1/2 -rotate-45 bg-eque-teal",
        )}
      />
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="relative mx-auto mt-3 w-full max-w-7xl px-4 sm:mt-4 sm:px-6">
          {/* Floating bar — 64px, single line on desktop */}
          <div className="flex h-16 items-center justify-between gap-4 border border-eque-line bg-eque-bg/80 px-4 backdrop-blur-xl sm:px-5">
            <a href="/" aria-label="eque home" className="shrink-0">
              <EqueWordmark className="hidden h-7 md:block" />
              <EqueLogo className="h-8 w-8 md:hidden" />
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-display text-[13px] font-medium tracking-[0.08em] text-eque-text-2 transition-colors duration-150 hover:text-eque-teal"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a
                href="#"
                className="font-display inline-flex h-9 items-center border border-eque-border px-4 text-[13px] font-medium tracking-[0.04em] text-eque-text transition-colors duration-150 hover:border-eque-teal/40 hover:text-eque-teal"
              >
                Launch App
              </a>
            </div>

            {/* Mobile hamburger — 44px touch target */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center border border-eque-line text-eque-text transition-colors duration-150 hover:border-eque-teal/40 md:hidden"
            >
              <HamburgerIcon open={open} />
            </button>
          </div>

          {/* Mobile panel — slides down from the top */}
          <AnimatePresence>
            {open && (
              <motion.nav
                id="mobile-menu"
                aria-label="Mobile"
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="absolute inset-x-4 top-[calc(100%+8px)] z-40 border border-eque-line bg-eque-surface/95 backdrop-blur-xl sm:inset-x-6 md:hidden"
              >
                <motion.ul>
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      variants={itemVariants}
                      className={cn(i > 0 && "border-t border-eque-line")}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between px-5 py-4"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-display text-[11px] text-eque-muted">
                            0{i + 1}
                          </span>
                          <span className="font-display text-base font-medium text-eque-text transition-colors duration-150 group-hover:text-eque-teal">
                            {link.label}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-display text-eque-muted transition-all duration-150 group-hover:translate-x-1 group-hover:text-eque-teal"
                        >
                          →
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div variants={itemVariants} className="border-t border-eque-line p-4">
                  <a
                    href="#"
                    onClick={() => setOpen(false)}
                    className="pixel-notch font-display flex h-11 items-center justify-center bg-eque-teal text-sm font-medium tracking-[0.02em] text-eque-ink transition-colors duration-150 hover:bg-eque-teal-hover"
                  >
                    Launch App
                  </a>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </MotionConfig>
  );
}
