import { Hero } from "@/components/sections/hero";
// import { Product } from "@/components/sections/product";
// import { CTA } from "@/components/sections/cta";

/**
 * Marketing landing — composed from one-file-per-section components.
 * Add new sections under `components/sections/` and drop them in below.
 */
export default function MarketingHome() {
  return (
    <main className="bg-[#070A0F]">
      <Hero />
      {/* <Product /> */}
      {/* <CTA /> */}
    </main>
  );
}
