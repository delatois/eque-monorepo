import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The eque logo mark (teal "E").
 * Used on mobile navbar + favicon source.
 */
export function EqueLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/eque-logo.png"
      alt="eque logo"
      width={512}
      height={512}
      priority
      className={cn("h-8 w-8 object-contain", className)}
    />
  );
}

/**
 * Full wordmark lockup (mark + "Eque").
 * Used on desktop navbar.
 */
export function EqueWordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/eque-wordmark.png"
      alt="eque"
      width={700}
      height={200}
      priority
      className={cn("h-7 w-auto object-contain", className)}
    />
  );
}
