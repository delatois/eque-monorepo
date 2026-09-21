"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// three.js (~600KB) + postprocessing only load on the client, after the
// initial paint — never in the server bundle or the first-paint JS.
const PixelBlast = dynamic(() => import("@/components/PixelBlast"), {
  ssr: false,
});

type PixelBlastLazyProps = ComponentProps<typeof PixelBlast>;

export function PixelBlastLazy(props: PixelBlastLazyProps) {
  return <PixelBlast {...props} />;
}
