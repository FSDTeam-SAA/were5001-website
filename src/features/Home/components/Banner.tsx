import Image from "next/image";
import HeroSlideshow from "./HeroSlideshow";
import ProductCard from "./ProductCard";

export default function Banner() {
  return (
    <section className="relative min-h-[900px] overflow-hidden max-[1100px]:h-auto max-[1100px]:min-h-0">
      <HeroSlideshow />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,.28)_0%,rgba(4,10,20,.12)_26%,rgba(0,0,0,.82)_100%),linear-gradient(90deg,rgba(0,0,0,.32),rgba(0,0,0,.18),rgba(0,0,0,.32))]" />

      <div className="relative z-[1] mx-auto flex h-full flex-col items-center pt-8 pb-16 max-[640px]:pt-6 max-[640px]:pb-12">
        {/* Main Logo & Headline */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/hero-logo.svg"
            alt="SECNX"
            width={340}
            height={144}
            priority
            className="h-auto w-[220px] drop-shadow-[0_4px_24px_rgba(214,164,58,0.35)] sm:w-[280px] md:w-[330px]"
          />
          <h1 className="mt-3 flex items-center justify-center gap-2.5 font-[family-name:var(--font-eb-garamond)] text-[34px] font-bold leading-tight drop-shadow-[0_3px_5px_rgba(0,0,0,.9)] sm:text-[44px] md:text-[53.33px] max-[640px]:flex-col max-[640px]:gap-0.5 max-[640px]:text-[30px]">
            <span className="text-[#e0e4e8]">Buy &amp; Sell</span>
            <strong className="text-[#e2c66a]">OSRS &amp; RS3 Gold</strong>
          </h1>
          <p className="mt-2 text-center font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[.08em] text-[#d2dbe0] drop-shadow-[0_2px_4px_rgba(0,0,0,.9)] sm:text-sm md:text-[18px]">
            TRUSTED BY THOUSANDS OF PLAYERS
          </p>
        </div>

        {/* Product Cards */}
        <div className="mt-8 flex items-center justify-center gap-10 max-[1100px]:gap-[3vw] max-[640px]:mt-6 max-[640px]:flex-col max-[640px]:gap-6">
          <ProductCard variant="osrs" />
          <ProductCard variant="rs3" />
        </div>
      </div>
    </section>
  );
}

