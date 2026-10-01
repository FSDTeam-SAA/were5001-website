import Image from "next/image";

function ProductCard({ variant }: { variant: "osrs" | "rs3" }) {
  const position =
    variant === "osrs" ? "bg-[-89.75%_-87.16%]" : "bg-[-204.72%_-87.16%]";
  const panelImage =
    variant === "osrs"
      ? "/assets/product-panel.png"
      : "/assets/hero-raw1.png";
  return (
    <article
      aria-label={variant === "osrs" ? "Buy OSRS Gold" : "Buy RS3 Gold"}
      className="relative h-[533px] w-[544px] overflow-hidden max-[1100px]:h-[min(48vw,533px)] max-[1100px]:w-[min(49vw,544px)] max-[640px]:h-[310px] max-[640px]:w-[316px]"
    >
      <Image
        src={panelImage}
        alt=""
        fill
        priority
        sizes="(max-width: 640px) 316px, (max-width: 1100px) 49vw, 544px"
        className="object-cover"
      />
      <div
        className={`absolute bottom-[2.12%] left-[4.45%] right-[2.55%] top-[1.33%] bg-[url('/assets/product-art.png')] bg-[length:392.37%_573.22%] bg-no-repeat ${position} ${variant === "osrs" ? "left-[calc(50%-183.5px)] right-auto w-[367px]" : ""}`}
      />
    </article>
  );
}

export default function Banner() {
  return (
    <section className="relative h-[1043px] overflow-hidden max-[1100px]:h-auto max-[1100px]:min-h-[994px] max-[640px]:min-h-[900px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,.8)_100%),linear-gradient(90deg,rgba(0,0,0,.2),rgba(0,0,0,.2)),url('/assets/hero-background.png')] bg-cover bg-center" />
      <div className="relative z-[1] h-full max-[1100px]:flex max-[1100px]:h-auto max-[1100px]:min-h-[994px] max-[1100px]:flex-col max-[1100px]:items-center max-[1100px]:gap-5 max-[1100px]:pt-10 max-[640px]:min-h-[900px] max-[640px]:pt-[50px]">
        <div
          className="absolute left-1/2 top-[77.33px] h-[266.67px] w-[1938.67px] -translate-x-1/2 max-[1100px]:static max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:translate-x-0"
          data-node-id="51629:14056"
        >
          <Image
            src="/assets/banner-crown.png"
            alt=""
            width={160}
            height={236}
            priority
            className="absolute left-[858.66px] -top-10 h-[157.33px] w-[106.67px] object-contain max-[1100px]:relative max-[1100px]:left-1/2 max-[1100px]:top-0 max-[1100px]:mb-[-25px] max-[1100px]:block max-[1100px]:h-[118px] max-[1100px]:w-20 max-[1100px]:-translate-x-1/2"
          />
          <div className="absolute left-[709.34px] top-[10.67px] font-[family-name:var(--font-inter)] text-[114.67px] font-light leading-none text-[#a5a9ae] max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:mr-10 max-[1100px]:inline-block max-[1100px]:text-[72px]">
            SE
          </div>
          <div className="absolute left-[962.66px] top-4 font-[family-name:var(--font-inter)] text-[106.67px] font-medium leading-none text-[#b5b8bd] max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:-ml-10 max-[1100px]:inline-block max-[1100px]:text-[68px]">
            NX
          </div>
          <h1 className="absolute left-[610.66px] top-[157.33px] flex gap-[11px] font-[family-name:var(--font-eb-garamond)] text-[53.33px] font-bold leading-none max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:mt-3 max-[1100px]:justify-center max-[1100px]:text-[40px] max-[640px]:flex-col max-[640px]:gap-0.5 max-[640px]:text-[34px]">
            <span className="text-[#9ea3a9]">Buy &amp; Sell</span>
            <strong className="text-[#9d916a]">OSRS &amp; RS3 Gold</strong>
          </h1>
          <p className="absolute left-[698.66px] top-56 w-[530.67px] text-center font-[family-name:var(--font-inter)] text-[21.33px] font-normal leading-none text-[#697881] max-[1100px]:relative max-[1100px]:left-auto max-[1100px]:top-auto max-[1100px]:mt-2 max-[1100px]:w-auto max-[1100px]:text-xs">
            TRUSTED BY THOUSANDS OF PLAYERS
          </p>
        </div>
        <div className="absolute left-1/2 top-[275px] flex -translate-x-1/2 gap-[19px] max-[1100px]:static max-[1100px]:translate-x-0 max-[640px]:flex-col">
          <ProductCard variant="osrs" />
          <ProductCard variant="rs3" />
        </div>
      </div>
    </section>
  );
}
