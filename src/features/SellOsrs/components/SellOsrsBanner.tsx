"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  ChessQueen,
  ChevronDown,
  FileText,
  Handshake,
  MessageCircle,
  CreditCard,
  Coins,
  Crown,
  Check,
} from "lucide-react";

const RATE_PER_M = 0.22;
const DEFAULT_AMOUNT = 100;
const AMOUNT_OPTIONS = [50, 100, 250, 500, 1000, 2500];

// 12 Payment Methods shown in the screenshot
export type PaymentMethod = {
  id: string;
  name: string;
  type: "image" | "svg";
  imageSrc?: string;
  svgComponent?: React.ReactNode;
};

export default function SellOsrsBanner() {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [selectedPayment, setSelectedPayment] = useState<string>("crypto");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const total = (amount * RATE_PER_M).toFixed(2);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAmountChange = (val: string) => {
    const num = Number(val);
    if (!isNaN(num)) {
      setAmount(Math.max(0, num));
    }
  };

  const handleGetQuote = () => {
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
    }, 4000);
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: "crypto",
      name: "Crypto",
      type: "svg",
      svgComponent: (
        <span className="font-[family-name:var(--font-inter)] text-[15px] font-black tracking-wider text-[#0094ff] uppercase">
          CRYPTO
        </span>
      ),
    },
    {
      id: "zelle",
      name: "Zelle",
      type: "svg",
      svgComponent: (
        <span className="font-sans text-[18px] font-bold tracking-tight text-[#7414ca] lowercase">
          zelle
        </span>
      ),
    },
    {
      id: "cashapp",
      name: "Cash App",
      type: "svg",
      svgComponent: (
        <div className="flex items-center gap-1.5">
          <span className="grid size-5.5 place-items-center rounded-md bg-[#00d632] text-xs font-black text-white">
            $
          </span>
          <span className="font-sans text-xs font-bold text-[#111111]">
            Cash App
          </span>
        </div>
      ),
    },
    {
      id: "interac",
      name: "Interac e-Transfer",
      type: "image",
      imageSrc: "/assets/footer/payment-03.png",
    },
    {
      id: "skrill",
      name: "Skrill",
      type: "image",
      imageSrc: "/assets/footer/payment-01.png",
    },
    {
      id: "neteller",
      name: "Neteller",
      type: "image",
      imageSrc: "/assets/footer/payment-02.png",
    },
    {
      id: "venmo",
      name: "Venmo",
      type: "svg",
      svgComponent: (
        <span className="font-sans text-[17px] font-extrabold italic tracking-tight text-[#008cff]">
          venmo
        </span>
      ),
    },
    {
      id: "paypal",
      name: "PayPal",
      type: "image",
      imageSrc: "/assets/footer/payment-04.png",
    },
    {
      id: "sepa",
      name: "SEPA",
      type: "image",
      imageSrc: "/assets/footer/payment-14.png",
    },
    {
      id: "uk-bank",
      name: "UK Bank Transfer",
      type: "image",
      imageSrc: "/assets/footer/payment-13.png",
    },
    {
      id: "revolut",
      name: "Revolut",
      type: "svg",
      svgComponent: (
        <span className="font-sans text-[16px] font-black tracking-tight text-[#191c1f]">
          Revolut
        </span>
      ),
    },
    {
      id: "wise",
      name: "Wise",
      type: "svg",
      svgComponent: (
        <div className="flex items-center gap-1 font-sans text-[17px] font-black tracking-tight text-[#00b9ff]">
          <span>7wise</span>
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-28">
      {/* 1. Background image: osrs-imag-3.jpg */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/osrs-imag-3.jpg')" }}
      />
      {/* Light black shadow overlay for aesthetic depth */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      {/* Subtle atmospheric vignette & smooth bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,transparent_35%,rgba(3,7,13,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03070d] via-[#03070d]/50 to-transparent" />

      {/* Subtle top golden light beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[880px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.22),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1140px] px-6 max-[640px]:px-4">
        {/* ========================================================= */}
        {/* 2. Top Header with Ornamental Lines and Diamonds          */}
        {/* ========================================================= */}
        <header className="pt-2 text-center sm:pt-4">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span className="h-px w-20 bg-[linear-gradient(90deg,transparent,#d6a43a)] sm:w-36" />
            <span className="text-sm text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.8)]">
              ◇
            </span>
            <h1 className="font-[family-name:var(--font-eb-garamond)] text-4xl font-bold tracking-[0.04em] text-[#ffda5d] drop-shadow-[0_3px_18px_rgba(214,164,58,0.45)] sm:text-5xl lg:text-[54px]">
              SELL OSRS GOLD
            </h1>
            <span className="text-sm text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.8)]">
              ◇
            </span>
            <span className="h-px w-20 bg-[linear-gradient(270deg,transparent,#d6a43a)] sm:w-36" />
          </div>
          <p className="mt-3 text-sm font-semibold tracking-wider text-[#a0aeb9] sm:text-base">
            Fast Payouts • Best Rates • Trusted by Thousands
          </p>
        </header>

        {/* ========================================================= */}
        {/* 3. 3-Step Process Bar                                     */}
        {/* ========================================================= */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#3b2d18]/90 bg-[linear-gradient(180deg,rgba(20,16,11,0.92),rgba(9,9,8,0.96))] px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-md sm:px-6 sm:py-4">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-3 max-[980px]:grid-cols-1 max-[980px]:gap-3.5">
            {/* Step 1: GET A QUOTE */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">
                  1
                </span>
              </div>
              <div className="grid size-9 shrink-0 place-items-center text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <MessageCircle className="size-6" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  GET A QUOTE
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  Contact our livechat and tell us how much gold you want to sell
                </div>
              </div>
            </div>

            {/* Separator 1 */}
            <span className="shrink-0 px-1 text-xl font-bold text-[#6d5732] max-[980px]:hidden">
              ›
            </span>

            {/* Step 2: TRADE IN GAME */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">
                  2
                </span>
              </div>
              <div className="grid size-9 shrink-0 place-items-center text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <Handshake className="size-6" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  TRADE IN GAME
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  We&apos;ll meet you in game for a safe and secure trade.
                </div>
              </div>
            </div>

            {/* Separator 2 */}
            <span className="shrink-0 px-1 text-xl font-bold text-[#6d5732] max-[980px]:hidden">
              ›
            </span>

            {/* Step 3: GET PAID */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">
                  3
                </span>
              </div>
              <div className="grid size-9 shrink-0 place-items-center text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <CreditCard className="size-6" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  GET PAID
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  Receive your payment within 2–20 minutes.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. Main Two-Column Trade Desk Layout                      */}
        {/* ========================================================= */}
        <div className="mt-8 grid grid-cols-[1fr_360px] gap-6 max-[1020px]:grid-cols-1">
          {/* ==================== LEFT CARD ==================== */}
          <div className="overflow-hidden rounded-2xl border border-[#3b2d18]/90 bg-[linear-gradient(180deg,rgba(16,14,11,0.96),rgba(8,10,12,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-xl sm:p-8 max-[640px]:p-5">
            {/* Header with Coin Stack Icon */}
            <div className="flex items-center gap-4 border-b border-[#291f13] pb-5">
              <div className="relative grid size-13 shrink-0 place-items-center rounded-2xl border border-[#d6a43a]/60 bg-[linear-gradient(180deg,#382509,#140e04)] shadow-[0_0_20px_rgba(214,164,58,0.35)]">
                <Coins className="size-7 text-[#ffda5d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold tracking-wide text-[#ffda5d] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-3xl">
                  SELL OSRS GOLD
                </h2>
                <p className="text-sm font-medium text-[#9daab5]">
                  Fast • Safe • Trusted by Thousands of Players
                </p>
              </div>
            </div>

            {/* Field: Amount of Gold */}
            <div className="mt-6">
              <label
                htmlFor="sell-amount-input"
                className="block text-sm font-bold tracking-wide text-[#ffda5d]"
              >
                Amount of Gold
              </label>

              <div ref={dropdownRef} className="relative mt-2">
                <div className="flex h-13 items-center rounded-xl border border-[#312517] bg-[#070a0e] px-4 shadow-inner transition-colors focus-within:border-[#d6a43a] focus-within:ring-2 focus-within:ring-[#d6a43a]/25">
                  <div className="grid size-6 shrink-0 place-items-center pr-1 text-[#ffd75a]">
                    <Coins className="size-5" />
                  </div>
                  <input
                    id="sell-amount-input"
                    type="number"
                    min={1}
                    value={amount || ""}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full min-w-0 bg-transparent pl-2 text-base font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="grid size-8 place-items-center rounded-lg text-[#9aa7b2] transition-colors hover:bg-[#d6a43a]/10 hover:text-white"
                    aria-label="Toggle amount presets"
                  >
                    <ChevronDown
                      className={`size-5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180 text-[#ffda5d]" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Amount presets dropdown */}
                {dropdownOpen && (
                  <div className="absolute top-full left-0 z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-[#3d2c16] bg-[#0d1017] p-2 shadow-2xl backdrop-blur-xl">
                    <div className="grid grid-cols-3 gap-1.5">
                      {AMOUNT_OPTIONS.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => {
                            setAmount(val);
                            setDropdownOpen(false);
                          }}
                          className={`rounded-lg py-2 text-xs font-bold transition-all sm:text-sm ${
                            amount === val
                              ? "border border-[#d6a43a] bg-[#d6a43a]/20 text-[#ffda5d]"
                              : "bg-[#141822] text-[#9aa7b2] hover:bg-[#1e2433] hover:text-white"
                          }`}
                        >
                          {val >= 1000 ? `${val / 1000}B` : `${val}M`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Field: CHOOSE YOUR PAYMENT METHOD */}
            <div className="mt-8">
              <div className="mb-3.5 text-xs font-bold tracking-wider uppercase text-[#ffda5d] sm:text-sm">
                CHOOSE YOUR PAYMENT METHOD
              </div>

              {/* 12 Payment Methods Grid (4 cols x 3 rows) */}
              <div className="grid grid-cols-4 gap-3 max-[820px]:grid-cols-3 max-[520px]:grid-cols-2">
                {paymentMethods.map((method) => {
                  const isSelected = selectedPayment === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`group relative flex h-13 items-center justify-center rounded-xl bg-white px-2.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-[#ffda5d] shadow-[0_0_18px_rgba(214,164,58,0.7)] scale-[1.02]"
                          : "opacity-95 hover:opacity-100 hover:scale-[1.01] hover:shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
                      }`}
                      aria-pressed={isSelected}
                      aria-label={`Select ${method.name}`}
                    >
                      {method.type === "image" && method.imageSrc ? (
                        <Image
                          src={method.imageSrc}
                          alt={method.name}
                          width={100}
                          height={36}
                          className="max-h-7 w-auto max-w-full object-contain"
                        />
                      ) : (
                        method.svgComponent
                      )}

                      {/* Selected Indicator */}
                      {isSelected && (
                        <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-[9px] font-black text-yellow-950 shadow-[0_0_8px_rgba(214,164,58,0.85)]">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ==================== RIGHT CARD (Payout Summary) ==================== */}
          <div className="flex flex-col">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#3b2d18]/90 bg-[linear-gradient(180deg,rgba(16,14,11,0.96),rgba(8,10,12,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-xl sm:p-7">
              {/* Amber Glow Accent */}
              <div className="pointer-events-none absolute -top-10 -right-10 size-36 bg-[radial-gradient(ellipse_at_center,rgba(214,164,58,0.2),transparent_70%)] blur-2xl" />

              {/* Header */}
              <div className="flex items-center gap-2.5 pb-5">
                <FileText className="size-6 text-[#ffda5d]" strokeWidth={2.2} />
                <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold tracking-wide text-[#ffda5d]">
                  Payout Summary
                </h3>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#261f14]" />

              {/* Game Item */}
              <div className="flex items-center justify-between py-6">
                <span className="text-base font-semibold text-[#8e9ca7]">
                  Game:
                </span>
                <div className="flex flex-col items-center">
                  {/* Two round runic shields matching the screenshot */}
                  <div className="flex items-center gap-1">
                    <span className="grid size-7 place-items-center rounded-full border border-[#8e9ca7]/50 bg-[linear-gradient(135deg,#3c454e,#1e242b)] text-xs font-black text-white shadow-sm">
                      B
                    </span>
                    <span className="grid size-7 place-items-center rounded-full border border-[#8e9ca7]/50 bg-[linear-gradient(135deg,#3c454e,#1e242b)] text-xs font-black text-white shadow-sm">
                      S
                    </span>
                  </div>
                  <span className="mt-1 text-xs font-bold tracking-widest text-[#cbd6dc]">
                    OSRS
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#261f14]" />

              {/* Amount Item */}
              <div className="flex items-center justify-between py-4.5">
                <span className="text-base font-semibold text-[#8e9ca7]">
                  Amount:
                </span>
                <span className="text-lg font-bold text-[#e6edf2]">
                  {amount || 0}M
                </span>
              </div>

              {/* Rate Item */}
              <div className="flex items-center justify-between py-4.5">
                <span className="text-base font-semibold text-[#8e9ca7]">
                  Rate:
                </span>
                <span className="text-lg font-bold text-[#e6edf2]">
                  ${RATE_PER_M.toFixed(2)}/M
                </span>
              </div>

              {/* Total Calculation */}
              <div className="mt-auto pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold text-[#e6edf2]">
                    Total:
                  </span>
                  <span className="font-[family-name:var(--font-eb-garamond)] text-4xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_2px_14px_rgba(214,164,58,0.55)] sm:text-5xl">
                    ${total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button: SELL NOW with exact button gem style */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={handleGetQuote}
            id="sell-osrs-submit-btn"
            aria-label="Sell Now"
            className="group relative flex aspect-[204/63] w-[340px] cursor-pointer items-center justify-center bg-[url('/assets/slideshow/blank-buy-btn.png')] bg-contain bg-center bg-no-repeat transition-transform duration-200 active:scale-[0.97] hover:scale-[1.03] hover:bg-[url('/assets/slideshow/blank-buy-btn-hover.png')] drop-shadow-[0_12px_32px_rgba(214,164,58,0.55)] hover:drop-shadow-[0_16px_44px_rgba(214,164,58,0.85)] max-[640px]:w-[280px]"
          >
            {/* Positioned ChessQueen matching homepage Buy Now button */}
            <ChessQueen
              className="pointer-events-none absolute left-[18%] top-[45%] -translate-y-1/2 h-[27%] w-auto aspect-square text-[#4a1204] fill-[#4a1204]/30 drop-shadow-[0_1px_1px_rgba(255,225,120,0.75)] transition-transform duration-200 group-hover:scale-110"
              strokeWidth={2.4}
            />
            {/* Authentic Roman serif typography matching embedded BUY NOW font */}
            <span className="font-serif text-[18px] sm:text-[21px] font-bold tracking-[0.06em] text-[#4a1204] drop-shadow-[0_1px_1px_rgba(255,230,130,0.9)] select-none pl-4">
              SELL NOW
            </span>
          </button>



          {quoteSubmitted && (
            <div
              role="status"
              className="mt-1 rounded-lg border border-emerald-500/40 bg-emerald-950/60 px-4 py-2 text-center text-xs font-semibold text-emerald-300"
            >
              ✓ Request initiated! Please join livechat to finalize your trade immediately.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
