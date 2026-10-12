"use client";

import Image from "next/image";
import { ChessQueen } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "@/components/CheckoutModal";

type Variant = "osrs" | "rs3";

const PRODUCTS: Record<
  Variant,
  { game: string; pricePerM: number; panel: string; logo: string; logoWidth: number; logoHeight: number }
> = {
  osrs: {
    game: "OSRS",
    pricePerM: 0.22,
    panel: "/assets/product-panel.png",
    logo: "/assets/card-1.png",
    logoWidth: 600,
    logoHeight: 231,
  },
  rs3: {
    game: "RS3",
    pricePerM: 0.027,
    panel: "/assets/hero-raw1.png",
    logo: "/assets/card-2.png",
    logoWidth: 600,
    logoHeight: 180,
  },
};

/** Keep only digits and a single decimal point. */
function sanitize(value: string) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  return rest.length ? `${whole}.${rest.join("")}` : whole;
}

/*
 * Input pair styled like the old secnx.com site:
 * [ value | M ]  ⇄  [ $ | value ]
 * Light input field + gold "box" label using the original box texture.
 */
const fieldClass =
  "h-full min-w-0 flex-1 bg-[#f5f4f2] px-[2.4cqw] text-center font-[family-name:var(--font-open-sans)] text-[4.3cqw] font-bold text-[#040b11] outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_#d6a43a]";
const boxClass =
  "grid h-full w-[9.5cqw] shrink-0 place-items-center bg-[url('/assets/slideshow/box-bg.png')] bg-cover bg-center bg-no-repeat font-[family-name:var(--font-open-sans)] text-[4.3cqw] font-bold text-[#040b11]";

export default function ProductCard({ variant }: { variant: Variant }) {
  const { game, pricePerM, panel, logo, logoWidth, logoHeight } = PRODUCTS[variant];
  const [millions, setMillions] = useState("0");
  const [dollars, setDollars] = useState("0.00");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleBuyNow = () => {
    let m = parseFloat(millions) || 0;
    if (m <= 0) {
      m = 100;
      setMillions("100");
      setDollars((100 * pricePerM).toFixed(2));
    }
    setCheckoutOpen(true);
  };

  const onMillions = (raw: string) => {
    const v = sanitize(raw);
    setMillions(v);
    setDollars(((parseFloat(v) || 0) * pricePerM).toFixed(2));
  };

  const onDollars = (raw: string) => {
    const v = sanitize(raw);
    setDollars(v);
    const m = (parseFloat(v) || 0) / pricePerM;
    setMillions(m ? String(Math.round(m * 10) / 10) : "0");
  };

  return (
    <>
    <article
      aria-label={`Buy ${game} Gold`}
      className="@container group relative aspect-square w-[420px] overflow-hidden rounded-[6px] shadow-[0_18px_40px_-12px_rgba(0,0,0,.9),0_0_0_1px_rgba(214,164,58,.18)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-12px_rgba(0,0,0,.95),0_0_0_1px_rgba(214,164,58,.45),0_0_34px_-6px_rgba(214,164,58,.35)] max-[1100px]:w-[min(46vw,420px)] max-[640px]:w-[min(88vw,360px)]"
    >
      <Image
        src={panel}
        alt=""
        fill
        preload
        sizes="(max-width: 640px) 88vw, (max-width: 1100px) 46vw, 420px"
        className="object-cover"
      />

      {/* Game Logo in top section */}
      <div className="pointer-events-none absolute inset-x-0 top-[3.5%] flex h-[23cqw] items-center justify-center px-4">
        <Image
          src={logo}
          alt={`${game} Logo`}
          width={logoWidth}
          height={logoHeight}
          priority
          className="max-h-[19cqw] w-auto max-w-[64cqw] object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Title */}
      <h2 className="absolute inset-x-[6%] top-[29.5%] text-center font-[family-name:var(--font-eb-garamond)] text-[7.6cqw] font-semibold leading-none tracking-[.02em] text-[#e2c66a] drop-shadow-[0_2px_2px_rgba(0,0,0,.9)]">
        BUY <span className="text-[#f3ead0]">{game}</span> GOLD
      </h2>

      {/* Price per M — sits between the panel's gold divider lines */}
      <p className="absolute inset-x-0 top-[44.6%] -translate-y-1/2 text-center font-[family-name:var(--font-open-sans)] text-[5.6cqw] font-bold leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,.9)]">
        {pricePerM}
        <span className="text-[#d6a43a]">/M</span>
      </p>

      {/* Inputs (same layout as secnx.com) */}
      <div className="absolute inset-x-[10%] top-[52%] flex h-[10.7cqw] items-center justify-between">
        <label className="flex h-full w-[33.5cqw] overflow-hidden rounded-[5px] shadow-[0_2px_6px_rgba(0,0,0,.55)]">
          <span className="sr-only">{game} gold amount in millions</span>
          <input
            id={`${variant}-amount`}
            type="text"
            inputMode="decimal"
            value={millions}
            onChange={(e) => onMillions(e.target.value)}
            onFocus={(e) => e.target.select()}
            className={fieldClass}
          />
          <span className={boxClass} aria-hidden="true">M</span>
        </label>

        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          className="size-[4.3cqw] text-white transition-colors group-hover:text-[#d6a43a]"
        >
          <path
            fillRule="evenodd"
            d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"
          />
        </svg>

        <label className="flex h-full w-[33.5cqw] overflow-hidden rounded-[5px] shadow-[0_2px_6px_rgba(0,0,0,.55)]">
          <span className="sr-only">Price in US dollars</span>
          <span className={boxClass} aria-hidden="true">$</span>
          <input
            id={`${variant}-total`}
            type="text"
            inputMode="decimal"
            value={dollars}
            onChange={(e) => onDollars(e.target.value)}
            onFocus={(e) => e.target.select()}
            className={fieldClass}
          />
        </label>
      </div>

      {/* Same "Buy Now" button art (normal + hover) with ChessQueen icon */}
      <button
        type="button"
        id={`${variant}-buy-now`}
        aria-label={`Buy ${game} Gold`}
        onClick={handleBuyNow}
        className="group/btn absolute left-1/2 top-[66%] aspect-[204/63] w-[48.5cqw] -translate-x-1/2 cursor-pointer bg-[url('/assets/slideshow/buy-btn.png')] bg-cover bg-center bg-no-repeat transition-transform active:scale-[.97]"
      >
        <ChessQueen
          className="pointer-events-none absolute left-[17%] top-[45%] -translate-y-1/2 h-[32%] w-auto aspect-square text-[#3a1005] fill-[#4a1506]/35 drop-shadow-[0_1px_1px_rgba(255,225,120,0.75)]"
          strokeWidth={2.4}
        />
      </button>

      {/* Tagline — sits on the panel's bottom bar, between its arrows */}
      <p className="absolute inset-x-0 top-[87.2%] -translate-y-1/2 text-center font-[family-name:var(--font-inter)] text-[2.6cqw] font-semibold leading-none tracking-[.28em] text-[#9aa2a2]">
        FAST <span className="text-[#d6a43a]">·</span> SAFE <span className="text-[#d6a43a]">·</span> RELIABLE
      </p>
    </article>

    <CheckoutModal
      isOpen={checkoutOpen}
      onClose={() => setCheckoutOpen(false)}
      orderInfo={{
        game: variant === "osrs" ? "OSRS" : "RS3",
        title: `${game} Gold`,
        amountM: parseFloat(millions) || 100,
        price: Math.max(0.01, parseFloat(dollars) || (100 * pricePerM)),
        productType: variant === "osrs" ? "gold_osrs" : "gold_rs3",
      }}
    />
    </>
  );
}
