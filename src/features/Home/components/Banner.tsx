import Image from "next/image";

function ProductCard({ variant }: { variant: "osrs" | "rs3" }) {
  const isOsrs = variant === "osrs";
  const product = isOsrs
    ? { title: "BUY OSRS GOLD", price: "0.22/M", panel: "/assets/product-panel.png" }
    : { title: "BUY RS3 GOLD", price: "0.027/M", panel: "/assets/hero-raw1.png" };

  return (
    <article
      aria-label={product.title}
      className="relative h-[533px] w-[544px] overflow-hidden max-[1100px]:h-[min(48vw,533px)] max-[1100px]:w-[min(49vw,544px)] max-[640px]:h-[310px] max-[640px]:w-[316px]"
    >
      <Image
        src={product.panel}
        alt=""
        fill
        priority
        sizes="(max-width: 640px) 316px, (max-width: 1100px) 49vw, 544px"
        className="object-cover"
      />
      <div className="absolute inset-x-[7%] top-[35%] flex flex-col items-center text-center max-[640px]:top-[33%]">
        <h2 className="font-[family-name:var(--font-eb-garamond)] text-5xl leading-none text-[#b7a965] drop-shadow-[0_1px_1px_rgba(0,0,0,.85)] max-[1100px]:text-[clamp(20px,3.7vw,48px)]">{product.title}</h2>
        <p className="mt-3 text-xl font-medium leading-none text-[#9aa2a2] drop-shadow-[0_1px_1px_rgba(0,0,0,.85)] max-[1100px]:mt-[1vw] max-[1100px]:text-[clamp(9px,1.55vw,20px)]">FAST - SAFE - RELIABLE</p>
        <p className="mt-8 text-5xl font-normal leading-none text-[#b4a55e] max-[1100px]:mt-[2vw] max-[1100px]:text-[clamp(22px,3.7vw,48px)]">{product.price}</p>
        <div className="mt-8 grid h-14 w-[380px] grid-cols-[1fr_44px_31px_44px_1.2fr] overflow-hidden rounded-md bg-[#eef0ee] text-2xl leading-none shadow-[0_2px_5px_rgba(0,0,0,.6)] max-[1100px]:mt-[2vw] max-[1100px]:h-[clamp(28px,4.4vw,56px)] max-[1100px]:w-[min(43vw,380px)] max-[1100px]:text-[clamp(12px,1.9vw,24px)]">
          <label className="sr-only" htmlFor={`${variant}-amount`}>Gold amount in millions</label>
          <input id={`${variant}-amount`} aria-label="Gold amount in millions" defaultValue="0" inputMode="decimal" className="min-w-0 bg-transparent px-2 text-center text-zinc-600 outline-none placeholder:text-zinc-500" />
          <span className="grid place-items-center bg-[#8d6d20] font-medium text-yellow-950">M</span>
          <span className="grid place-items-center text-lg font-semibold text-[#e6e4dc]" aria-hidden="true">⇄</span>
          <span className="grid place-items-center bg-[#b2944d] font-medium text-yellow-950">$</span>
          <output className="grid place-items-center border-l border-zinc-300 text-zinc-600">0.00</output>
        </div>
        <button type="button" className="mt-7 flex h-14 w-[360px] items-center justify-center gap-2 bg-[linear-gradient(180deg,#ffda5d,#d78b14)] px-5 text-2xl font-semibold text-yellow-950 [clip-path:polygon(9%_0,91%_0,100%_50%,91%_100%,9%_100%,0_50%)] shadow-[0_2px_5px_rgba(0,0,0,.65)] transition-transform hover:scale-[1.03] max-[1100px]:mt-[2vw] max-[1100px]:h-[clamp(28px,4.4vw,56px)] max-[1100px]:w-[min(41vw,360px)] max-[1100px]:text-[clamp(12px,1.9vw,24px)]">
          <span aria-hidden="true">♛</span> Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function Banner() {
  return (
    <section className="relative h-[1043px] overflow-hidden max-[1100px]:h-auto max-[1100px]:min-h-[994px] max-[640px]:min-h-[900px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,.28)_0%,rgba(4,10,20,.12)_26%,rgba(0,0,0,.82)_100%),linear-gradient(90deg,rgba(0,0,0,.32),rgba(0,0,0,.18),rgba(0,0,0,.32)),url('/assets/hero-background.png')] bg-cover bg-center" />
      <div className="relative z-[1] h-full max-[1100px]:flex max-[1100px]:h-auto max-[1100px]:min-h-[994px] max-[1100px]:flex-col max-[1100px]:items-center max-[1100px]:gap-5 max-[1100px]:pt-10 max-[640px]:min-h-[900px] max-[640px]:pt-[50px]">
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
            className="absolute left-[858.66px] -top-10 h-[157.33px] w-[106.67px] object-contain max-[1100px]:relative max-[1100px]:left-1/2 max-[1100px]:top-0 max-[1100px]:mb-[-25px] max-[1100px]:block max-[1100px]:h-[118px] max-[1100px]:w-20 max-[1100px]:-translate-x-1/2"
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
        <div className="absolute left-1/2 top-[340px] flex -translate-x-1/2 gap-[19px] max-[1100px]:static max-[1100px]:translate-x-0 max-[640px]:flex-col">
          <ProductCard variant="osrs" />
          <ProductCard variant="rs3" />
        </div>
      </div>
    </section>
  );
}
