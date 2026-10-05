import Image from "next/image";
import HeroSlideshow from "./HeroSlideshow";
import ProductCard from "./ProductCard";

export default function Banner() {
  return (
    <section className="relative h-[900px] overflow-hidden max-[1100px]:h-auto max-[1100px]:min-h-0">
      <HeroSlideshow />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,.28)_0%,rgba(4,10,20,.12)_26%,rgba(0,0,0,.82)_100%),linear-gradient(90deg,rgba(0,0,0,.32),rgba(0,0,0,.18),rgba(0,0,0,.32))]" />
      <div className="relative z-[1] h-full max-[1100px]:flex max-[1100px]:h-auto  max-[1100px]:flex-col max-[1100px]:items-center max-[1100px]:gap-5 max-[1100px]:pt-10  max-[640px]:pt-[50px]">
        <div
          className="absolute left-1/2 top-[77.33px] h-[200px] w-[1938.67px] -translate-x-1/2 max-[1100px]:static max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:translate-x-0"
          data-node-id="51629:14056"
        >
          <Image
            src="/assets/banner-crown.png"
            alt=""
            width={160}
            height={136}
            priority
            className="animate-float-gentle animate-pulse-glow absolute left-[858.66px] -top-10 h-[157.33px] w-[106.67px] object-contain max-[1100px]:relative max-[1100px]:left-1/2 max-[1100px]:top-0 max-[1100px]:mb-[-25px] max-[1100px]:block max-[1100px]:h-[118px] max-[1100px]:w-20 max-[1100px]:-translate-x-1/2"
          />
          <div className="absolute left-[709.34px] top-[10.67px] font-[family-name:var(--font-inter)] text-[114.67px] font-light leading-none text-[#a5a9ae] max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:mr-10 max-[1100px]:inline-block max-[1100px]:text-[50px]">
            SE
          </div>
          <div className="absolute left-[962.66px] top-4 font-[family-name:var(--font-inter)] text-[106.67px] font-medium leading-none text-[#b5b8bd] max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:-ml-10 max-[1100px]:inline-block max-[1100px]:text-[40px]">
            NX
          </div>
          <h1 className="absolute left-[610.66px] top-[157.33px] flex gap-[11px] font-[family-name:var(--font-eb-garamond)] text-[53.33px] font-bold leading-none drop-shadow-[0_3px_5px_rgba(0,0,0,.9)] max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:mt-3 max-[1100px]:justify-center max-[1100px]:text-[40px] max-[640px]:flex-col max-[640px]:gap-0.5 max-[640px]:text-[34px]">
            <span className="text-[#e0e4e8]">Buy &amp; Sell</span>
            <strong className="text-[#e2c66a]">OSRS &amp; RS3 Gold</strong>
          </h1>
          <p className="absolute left-[698.66px] top-56 w-[530.67px] text-center font-[family-name:var(--font-inter)] text-[21.33px] font-semibold leading-none tracking-[.08em] text-[#d2dbe0] drop-shadow-[0_2px_4px_rgba(0,0,0,.9)] max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:mt-2 max-[1100px]:w-auto max-[1100px]:text-xs">
            TRUSTED BY THOUSANDS OF PLAYERS
          </p>
        </div>
        <div className="absolute left-1/2 top-[352px] flex -translate-x-1/2 gap-10 max-[1100px]:static max-[1100px]:translate-x-0 max-[1100px]:gap-[3vw] max-[1100px]:pb-12 max-[640px]:flex-col max-[640px]:gap-6">
          <ProductCard variant="osrs" />
          <ProductCard variant="rs3" />
        </div>
      </div>
    </section>
  );
}
