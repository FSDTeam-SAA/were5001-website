"use client";

import Image from "next/image";
import { ChessQueen } from "lucide-react";
import { useState } from "react";

const RATE_PER_M = 0.22;
const MIN_ORDER = 50;

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000, 2500];

const paymentMethods = [
  { id: "crypto", name: "Crypto", image: "/assets/footer/payment-07.png" },
  { id: "interac", name: "Interac e-Transfer", image: "/assets/footer/payment-03.png" },
  { id: "skrill", name: "Skrill", image: "/assets/footer/payment-01.png" },
  { id: "neteller", name: "Neteller", image: "/assets/footer/payment-02.png" },
  { id: "paypal", name: "PayPal", image: "/assets/footer/payment-04.png" },
  { id: "paysafecard", name: "paysafecard", image: "/assets/footer/payment-09.png" },
  { id: "przelewy24", name: "Przelewy24", image: "/assets/footer/payment-08.png" },
  { id: "paysafecash", name: "Paysafe:cash", image: "/assets/footer/payment-10.png" },
  { id: "blik", name: "blik", image: "/assets/footer/payment-15.png" },
  { id: "alipay", name: "Alipay", image: "/assets/footer/payment-05.png" },
  { id: "uk-bank", name: "UK Bank Transfer", image: "/assets/footer/payment-13.png" },
  { id: "eu-bank", name: "EU Bank Transfer", image: "/assets/footer/payment-12.png" },
  { id: "bancontact", name: "Bancontact", image: "/assets/footer/payment-16.png" },
  { id: "sepa", name: "SEPA", image: "/assets/footer/payment-14.png" },
  { id: "ideal", name: "iDeal", image: "/assets/footer/payment-11.png" },
];

export default function BuyOsrsBanner() {
  const [rsn, setRsn] = useState("");
  const [amount, setAmount] = useState<number>(100);
  const [selectedPayment, setSelectedPayment] = useState<string>("crypto");

  const total = (amount * RATE_PER_M).toFixed(2);

  const handleAmountChange = (val: string) => {
    const num = Number(val);
    if (!isNaN(num)) {
      setAmount(Math.max(0, num));
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#03070d] pt-16 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-10 sm:pb-28">
      {/* Background Castle Art with Vignette & Ambient Golden Orbs */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 mix-blend-luminosity"
        style={{ backgroundImage: "url('/assets/hero-background.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(214,164,58,0.18),transparent_75%),linear-gradient(180deg,rgba(3,7,13,0.70)_0%,rgba(3,7,13,0.92)_55%,#020f14_100%)]" />

      {/* Decorative Top Ambient Light Beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[380px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,218,93,0.18),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1180px] px-6 max-[640px]:px-4">
        {/* 1. Top Section Header (Increased spacing and bold, legible typography) */}
        <header className="pt-2 text-center sm:pt-4">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-24 bg-[linear-gradient(90deg,transparent,#d6a43a)] sm:w-32" />
            <span className="text-base text-[#ffda5d] drop-shadow-[0_0_10px_rgba(214,164,58,0.9)]">◇</span>
            <h1 className="font-[family-name:var(--font-eb-garamond)] text-4xl font-bold tracking-wider text-[#ffda5d] drop-shadow-[0_3px_18px_rgba(214,164,58,0.45)] sm:text-5xl lg:text-[54px]">
              BUY OSRS GOLD
            </h1>
            <span className="text-base text-[#ffda5d] drop-shadow-[0_0_10px_rgba(214,164,58,0.9)]">◇</span>
            <span className="h-px w-24 bg-[linear-gradient(270deg,transparent,#d6a43a)] sm:w-32" />
          </div>
          <p className="mt-3 text-sm font-semibold tracking-wider uppercase text-[#a0aeb9] sm:text-base">
            Fast • Safe • Trusted by Thousands of Players
          </p>
        </header>

        {/* 2. Step-by-Step Process Bar (Guaranteed Zero Overflow with min-w-0 & Balanced Padding) */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#3b2d18]/90 bg-[linear-gradient(180deg,rgba(24,19,12,0.92),rgba(11,10,8,0.96))] px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-md sm:px-6 sm:py-4">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-3 max-[980px]:grid-cols-1 max-[980px]:gap-3.5">
            {/* Step 1 */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">1</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffd75a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5.5 shrink-0 drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  PLACE YOUR ORDER
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  Enter details &amp; pay securely.
                </div>
              </div>
            </div>

            {/* Separator Chevron 1 */}
            <span className="shrink-0 px-1 text-xl font-bold text-[#6d5732] max-[980px]:hidden">›</span>

            {/* Step 2 */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">2</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffd75a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5.5 shrink-0 drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  CONTACT LIVECHAT
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  24/7 instant confirmation.
                </div>
              </div>
            </div>

            {/* Separator Chevron 2 */}
            <span className="shrink-0 px-1 text-xl font-bold text-[#6d5732] max-[980px]:hidden">›</span>

            {/* Step 3 */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">3</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffd75a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5.5 shrink-0 drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  MEET US IN GAME
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  Receive gold safely in 2–20 min.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Order Form Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#3e2c14] bg-[linear-gradient(180deg,rgba(16,13,9,0.96),rgba(8,9,11,0.98))] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-xl sm:p-9 max-[640px]:p-5">
          {/* Card Top Row: Title + Telemetry Badges */}
          <div className="flex items-center justify-between border-b border-[#291f13] pb-6 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-4">
            <div className="flex items-center gap-4">
              <div className="relative grid size-13 place-items-center rounded-2xl border border-[#d6a43a]/60 bg-[linear-gradient(180deg,#382509,#140e04)] shadow-[0_0_20px_rgba(214,164,58,0.35)]">
                <span className="text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" role="img" aria-label="Gold coins">
                  💰
                </span>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold tracking-wide text-[#ffda5d] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-3xl">
                  BUY OSRS GOLD
                </h2>
                <p className="text-sm font-medium text-[#9daab5]">Instant Delivery • 100% Sourced by Real Players</p>
              </div>
            </div>

            {/* Right Telemetry Badges */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2.5 rounded-full border border-[#342718] bg-[#14110c] px-4 py-2 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffd75a" strokeWidth="2.5" className="size-4.5 shrink-0">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
                <div className="text-xs sm:text-sm">
                  <span className="text-[#8e9ca7]">Min Order: </span>
                  <span className="font-bold text-[#ffda5d]">{MIN_ORDER}M</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-full border border-[#342718] bg-[#14110c] px-4 py-2 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffd75a" strokeWidth="2.5" className="size-4.5 shrink-0">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <div className="text-xs sm:text-sm">
                  <span className="text-[#8e9ca7]">Delivery: </span>
                  <span className="font-bold text-[#ffda5d]">2 ~ 20 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content Split: Left (Inputs + Presets + Payment Grid), Right (Order Summary) */}
          <div className="mt-8 grid grid-cols-[1fr_330px] gap-8 max-[1060px]:grid-cols-1">
            {/* Left Column */}
            <div>
              {/* Two Main Inputs: RSN & Amount (No overflow, spacious, clear typography) */}
              <div className="grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
                {/* RSN Input */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="rsn-input" className="text-sm font-bold tracking-wide text-[#ffda5d]">
                      RSN (RuneScape Name)
                    </label>
                    <span className="text-xs font-medium text-[#778693]">Character Name</span>
                  </div>
                  <div className="flex h-13 items-center gap-3 rounded-xl border border-[#312517] bg-[#0b0c0f] px-4 shadow-inner transition-colors focus-within:border-[#d6a43a] focus-within:ring-2 focus-within:ring-[#d6a43a]/25">
                    <span className="shrink-0 text-base text-[#ffd75a]" aria-hidden="true">
                      👤
                    </span>
                    <input
                      id="rsn-input"
                      type="text"
                      value={rsn}
                      onChange={(e) => setRsn(e.target.value)}
                      placeholder="Enter your RuneScape name"
                      className="w-full min-w-0 bg-transparent text-sm font-medium text-white placeholder-[#505a64] outline-none sm:text-base"
                    />
                  </div>
                </div>

                {/* Amount of Gold Input (Zero overflow, spinner hidden, M firmly inside) */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="amount-input" className="text-sm font-bold tracking-wide text-[#ffda5d]">
                      Amount of Gold
                    </label>
                    <span className="text-xs font-semibold text-[#ffda5d]">≈ ${total} USD</span>
                  </div>
                  <div className="flex h-13 items-center rounded-xl border border-[#312517] bg-[#0b0c0f] px-4 shadow-inner transition-colors focus-within:border-[#d6a43a] focus-within:ring-2 focus-within:ring-[#d6a43a]/25">
                    <span className="shrink-0 pr-3 text-base text-[#ffd75a]" aria-hidden="true">
                      🪙
                    </span>
                    <input
                      id="amount-input"
                      type="number"
                      min={MIN_ORDER}
                      value={amount || ""}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="w-full min-w-0 bg-transparent text-base font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:text-lg"
                    />
                    <span className="shrink-0 select-none pl-2 text-sm font-black tracking-wider text-[#ffd75a] sm:text-base">
                      M
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Preset Selector Chips (Bigger, bolder, easier to click) */}
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="text-xs font-bold tracking-wide text-[#808f9c] sm:text-sm">Quick Select:</span>
                {PRESET_AMOUNTS.map((preset) => {
                  const isCurrent = amount === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-200 sm:text-sm ${isCurrent
                        ? "border border-[#d6a43a] bg-[#d6a43a]/25 text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.4)]"
                        : "border border-[#261f14] bg-[#120f0c] text-[#a4b0ba] hover:border-[#4a3a22] hover:text-white"
                        }`}
                    >
                      {preset >= 1000 ? `${preset / 1000}B` : `${preset}M`}
                    </button>
                  );
                })}
              </div>

              {/* Payment Methods Section */}
              <div className="mt-8">
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="text-sm font-bold tracking-wider uppercase text-[#ffda5d] sm:text-base">
                    CHOOSE PAYMENT METHOD
                  </div>
                  <span className="text-xs font-semibold text-[#808f9c]">15 Secure Options</span>
                </div>

                {/* 15 Payment Methods Grid (Spacious, elegant rounded tiles) */}
                <div className="grid grid-cols-4 gap-3 max-[880px]:grid-cols-3 max-[540px]:grid-cols-2">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedPayment === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`group relative flex h-13.5 items-center justify-center rounded-xl bg-white px-3 py-2 shadow-[0_3px_10px_rgba(0,0,0,0.5)] transition-all duration-200 ${isSelected
                          ? "ring-2 ring-[#ffda5d] shadow-[0_0_20px_rgba(214,164,58,0.65)] scale-[1.02]"
                          : "opacity-95 hover:opacity-100 hover:scale-[1.01] hover:shadow-[0_5px_16px_rgba(0,0,0,0.6)]"
                          }`}
                        aria-pressed={isSelected}
                        aria-label={`Select ${method.name}`}
                      >
                        <Image
                          src={method.image}
                          alt={method.name}
                          width={110}
                          height={38}
                          className="max-h-7.5 w-auto max-w-full object-contain"
                        />
                        {/* Selected Gold Checkmark Badge */}
                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 grid size-4.5 place-items-center rounded-full bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-[10px] font-black text-yellow-950 shadow-[0_0_8px_rgba(214,164,58,0.85)]">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Luxury Order Summary Receipt Card */}
            <div className="flex flex-col">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#3e2c14] bg-[linear-gradient(180deg,#14100c,#09090b)] p-6 shadow-inner sm:p-7">
                {/* Subtle Amber Glow Accent */}
                <div className="pointer-events-none absolute -top-10 -right-10 size-36 bg-[radial-gradient(ellipse_at_center,rgba(214,164,58,0.2),transparent_70%)] blur-2xl" />

                {/* Summary Header */}
                <div className="flex items-center justify-between border-b border-[#291f13] pb-4.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg text-[#ffd75a]" aria-hidden="true">
                      📋
                    </span>
                    <h3 className="text-base font-bold tracking-wide text-[#ffda5d]">
                      Order Summary
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#20180d] px-2.5 py-0.5 text-xs font-bold text-[#d6a43a]">
                    Live
                  </span>
                </div>

                {/* Line Items */}
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between text-[#9aa7b2]">
                    <span>Game:</span>
                    <span className="flex items-center gap-1.5 font-bold text-[#e6edf2]">
                      <span className="rounded bg-[#20180d] px-1.5 py-0.5 text-xs font-bold text-[#ffd75a] border border-[#d6a43a]/35">
                        OSRS
                      </span>
                      Old School
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#9aa7b2]">
                    <span>Amount:</span>
                    <span className="font-bold text-[#ffda5d]">{amount || 0}M GP</span>
                  </div>

                  <div className="flex items-center justify-between text-[#9aa7b2]">
                    <span>Rate:</span>
                    <span className="font-bold text-[#e6edf2]">${RATE_PER_M} / M</span>
                  </div>

                  <div className="flex items-center justify-between text-[#9aa7b2]">
                    <span>Delivery Time:</span>
                    <span className="font-semibold text-emerald-400">2 ~ 20 Mins</span>
                  </div>

                  <div className="flex items-center justify-between text-[#9aa7b2]">
                    <span>ID Verification:</span>
                    <span className="font-semibold text-emerald-400">Not Required</span>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="my-6 h-px bg-[linear-gradient(90deg,transparent,#3d2c16,transparent)]" />

                {/* Total Calculation */}
                <div className="mt-auto">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-semibold text-[#9aa7b2]">Total:</span>
                    <span className="font-[family-name:var(--font-eb-garamond)] text-3xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_2px_14px_rgba(214,164,58,0.55)] sm:text-4xl">
                      ${total}
                    </span>
                  </div>
                  <div className="mt-1 text-right text-xs text-[#707f8c]">
                    No hidden checkout fees
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA: The Authentic Home Page Button Style (Spacious & Prominent) */}
          <div className="mt-12 flex flex-col items-center justify-center gap-3.5">
            {/* Authentic RuneScape Fantasy Gem Buy Button from Homepage with ChessQueen */}
            <button
              type="button"
              id="buy-osrs-submit-btn"
              aria-label="Buy OSRS Gold Now"
              className="group relative aspect-[204/63] w-[340px] cursor-pointer bg-[url('/assets/slideshow/buy-btn.png')] bg-contain bg-center bg-no-repeat transition-transform duration-200 active:scale-[0.97] hover:scale-[1.03] hover:bg-[url('/assets/slideshow/buy-btn-hover.png')] drop-shadow-[0_12px_32px_rgba(214,164,58,0.55)] hover:drop-shadow-[0_16px_44px_rgba(214,164,58,0.85)] max-[640px]:w-[280px]"
            >
              <ChessQueen
                className="pointer-events-none absolute left-[18%] top-[45%] -translate-y-1/2 h-[27%] w-auto aspect-square text-[#3a1005] fill-[#4a1506]/35 drop-shadow-[0_1px_1px_rgba(255,225,120,0.75)] transition-transform duration-200 group-hover:scale-110"
                strokeWidth={2.4}
              />
            </button>

            {/* Trust Assurances Underneath Button */}
            <div className="mt-1 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-[#8e9ba6] sm:text-sm max-[640px]:gap-3">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Instant In-Game Trade
              </span>
              <span className="text-[#414f5b]">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#d6a43a]">🛡️</span> 100% Sourced by Pro Gamers
              </span>
              <span className="text-[#414f5b]">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-sky-400">🔒</span> 256-Bit SSL Encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
