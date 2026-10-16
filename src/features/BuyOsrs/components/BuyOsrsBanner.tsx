"use client";

import Image from "next/image";
import { ChessQueen, Loader2, AlertCircle, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { paymentService } from "@/services/payment.service";

const RATE_PER_M = 0.22;
const MIN_ORDER = 50;

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000, 2500];

const paymentMethods = [
  {
    id: "card-pay",
    name: "Card Pay (PayPal, Credit Card, Debit Card, Apple Pay, Google Pay)",
    image: "/assets/footer/card-pay-combined.svg",
    isFeatured: true,
  },
  { id: "crypto", name: "Crypto", image: "/assets/footer/payment-07.png" },
  { id: "interac", name: "Interac e-Transfer", image: "/assets/footer/payment-03.png" },
  { id: "skrill", name: "Skrill", image: "/assets/footer/payment-01.png" },
  { id: "neteller", name: "Neteller", image: "/assets/footer/payment-02.png" },
  { id: "paysafecard", name: "paysafecard", image: "/assets/footer/payment-09.png" },
  { id: "przelewy24", name: "Przelewy24", image: "/assets/footer/payment-08.png" },
  { id: "paysafecash", name: "Paysafe:cash", image: "/assets/footer/payment-10.png" },
  { id: "blik", name: "blik", image: "/assets/footer/payment-15.png" },
  { id: "alipay", name: "Alipay", image: "/assets/footer/payment-05.png" },
  { id: "uk-bank", name: "UK Bank Transfer", image: "/assets/footer/payment-13.png" },
  { id: "eu-bank", name: "EU Bank Transfer", image: "/assets/footer/payment-12.png" },
  { id: "bancontact", name: "Bancontact", image: "/assets/footer/payment-16.png" },
  { id: "ideal", name: "iDeal", image: "/assets/footer/payment-11.png" },
];

export default function BuyOsrsBanner() {
  const [rsn, setRsn] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(100);
  const [selectedPayment, setSelectedPayment] = useState<string>("paypal");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "info" | "success";
    text: string;
  } | null>(null);
  const [livechatModalOpen, setLivechatModalOpen] = useState(false);

  const total = (amount * RATE_PER_M).toFixed(2);

  const handleAmountChange = (val: string) => {
    const num = Number(val);
    if (!isNaN(num)) {
      setAmount(Math.max(0, num));
    }
  };

  const handleBuyOrder = async () => {
    setStatusMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid email address to receive order details and receipt.",
      });
      return;
    }

    if (amount < MIN_ORDER) {
      setStatusMessage({
        type: "error",
        text: `Minimum order amount is ${MIN_ORDER}M Gold.`,
      });
      return;
    }

    const priceNum = parseFloat(total);

    if (selectedPayment === "paypal") {
      setIsLoading(true);
      try {
        const result = await paymentService.createPayPalOrder({
          amount: priceNum,
          currency: "USD",
          customerEmail: trimmedEmail,
          productType: "gold_osrs",
          productDetails: {
            game: "OSRS",
            quantityM: amount,
            gameCharacterName: rsn.trim() || undefined,
          },
        });
        if (result.data?.approveUrl) {
          window.location.href = result.data.approveUrl;
        } else {
          throw new Error("No PayPal approval link received from server.");
        }
      } catch (err: any) {
        setIsLoading(false);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to initiate PayPal checkout. Please check server connection.";
        setStatusMessage({
          type: "error",
          text: typeof msg === "string" ? msg : JSON.stringify(msg),
        });
      }
    } else if (selectedPayment === "skrill") {
      setIsLoading(true);
      try {
        const result = await paymentService.createSkrillPayment({
          amount: priceNum,
          currency: "USD",
          customerEmail: trimmedEmail,
          productType: "gold_osrs",
          productDetails: {
            game: "OSRS",
            quantityM: amount,
            gameCharacterName: rsn.trim() || undefined,
          },
        });
        if (result.data?.checkoutUrl && result.data?.formFields) {
          paymentService.executeSkrillRedirect(
            result.data.checkoutUrl,
            result.data.formFields
          );
        } else {
          throw new Error("Failed to initialize Skrill payment session.");
        }
      } catch (err: any) {
        setIsLoading(false);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to initiate Skrill checkout. Please check server connection.";
        setStatusMessage({
          type: "error",
          text: typeof msg === "string" ? msg : JSON.stringify(msg),
        });
      }
    } else {
      // Manual payment method chosen
      setLivechatModalOpen(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#03070d] pt-16 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-10 sm:pb-28">
      {/* Background OSRS Art */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/osrs-imag-3.jpg')" }}
      />
      {/* Light black shadow overlay for aesthetic depth */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      {/* Subtle atmospheric vignette & smooth bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,transparent_35%,rgba(3,7,13,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03070d] via-[#03070d]/50 to-transparent" />

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
          {/* Card Top Row: Title */}
          <div className="flex items-center justify-between border-b border-[#291f13] pb-6">
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
          </div>

          {/* Form Content Split: Left (Inputs + Presets + Payment Grid), Right (Order Summary) */}
          <div className="mt-8 grid grid-cols-[1fr_330px] gap-8 max-[1060px]:grid-cols-1">
            {/* Left Column */}
            <div>
              {/* Inputs: RSN & Email */}
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

                {/* Email Input */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="email-input" className="text-sm font-bold tracking-wide text-[#ffda5d]">
                      Customer Email <span className="text-amber-400">*</span>
                    </label>
                    <span className="text-xs font-medium text-[#778693]">Receipt &amp; Order</span>
                  </div>
                  <div className="flex h-13 items-center gap-3 rounded-xl border border-[#312517] bg-[#0b0c0f] px-4 shadow-inner transition-colors focus-within:border-[#d6a43a] focus-within:ring-2 focus-within:ring-[#d6a43a]/25">
                    <span className="shrink-0 text-base text-[#ffd75a]" aria-hidden="true">
                      ✉️
                    </span>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. your-email@gmail.com"
                      className="w-full min-w-0 bg-transparent text-sm font-medium text-white placeholder-[#505a64] outline-none sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Amount of Gold Input */}
              <div className="mt-5">
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

                {/* 1. Featured Big Card Pay Button (PayPal, Credit Card, Debit Card, Apple Pay, Google Pay) */}
                {(() => {
                  const cardPay = paymentMethods.find((m) => m.id === "card-pay");
                  if (!cardPay) return null;
                  const isSelected = selectedPayment === cardPay.id;
                  return (
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(cardPay.id)}
                        className={`group relative flex w-full flex-col items-center justify-center rounded-2xl bg-white p-3 sm:p-4 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "ring-3 ring-[#ffda5d] shadow-[0_0_26px_rgba(214,164,58,0.7)] scale-[1.01]"
                            : "opacity-95 hover:opacity-100 hover:scale-[1.005] hover:shadow-[0_6px_22px_rgba(0,0,0,0.65)]"
                        }`}
                        aria-pressed={isSelected}
                        aria-label="Select Card Pay (PayPal, Credit Card, Debit Card, Apple Pay, Google Pay)"
                      >
                        <Image
                          src={cardPay.image}
                          alt="PayPal, Credit Card, Debit Card, Apple Pay, Google Pay"
                          width={1000}
                          height={130}
                          className="h-14 sm:h-16 w-auto max-w-full object-contain"
                          priority
                        />

                        {isSelected && (
                          <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-xs font-black text-yellow-950 shadow-[0_0_10px_rgba(214,164,58,0.9)]">
                            ✓
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })()}

                {/* Other Payment Methods Grid */}
                <div className="grid grid-cols-4 gap-3 max-[880px]:grid-cols-3 max-[540px]:grid-cols-2">
                  {paymentMethods
                    .filter((m) => m.id !== "card-pay")
                    .map((method) => {
                      const isSelected = selectedPayment === method.id;
                      return (
                        <button
                          type="button"
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`group relative flex h-13.5 items-center justify-center rounded-xl bg-white px-3 py-2 shadow-[0_3px_10px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer ${
                            isSelected
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
              onClick={handleBuyOrder}
              disabled={isLoading}
              aria-label="Buy OSRS Gold Now"
              className="group relative aspect-[204/63] w-[340px] cursor-pointer bg-[url('/assets/slideshow/buy-btn.png')] bg-contain bg-center bg-no-repeat transition-transform duration-200 active:scale-[0.97] hover:scale-[1.03] hover:bg-[url('/assets/slideshow/buy-btn-hover.png')] drop-shadow-[0_12px_32px_rgba(214,164,58,0.55)] hover:drop-shadow-[0_16px_44px_rgba(214,164,58,0.85)] disabled:opacity-60 disabled:cursor-not-allowed max-[640px]:w-[280px]"
            >
              <ChessQueen
                className="pointer-events-none absolute left-[18%] top-[45%] -translate-y-1/2 h-[27%] w-auto aspect-square text-[#3a1005] fill-[#4a1506]/35 drop-shadow-[0_1px_1px_rgba(255,225,120,0.75)] transition-transform duration-200 group-hover:scale-110"
                strokeWidth={2.4}
              />
            </button>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 rounded-lg border border-[#d6a43a]/40 bg-[#16120b] px-4 py-2 text-xs font-semibold text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.3)] animate-pulse">
                <Loader2 className="size-4 animate-spin text-[#ffd75a]" />
                <span>Connecting to Secure Payment Gateway...</span>
              </div>
            )}

            {/* Status Feedback Message */}
            {statusMessage && (
              <div
                role="alert"
                className={`flex max-w-md items-center gap-2.5 rounded-xl border px-4 py-2.5 text-xs font-medium shadow-md ${
                  statusMessage.type === "error"
                    ? "border-red-500/50 bg-red-950/70 text-red-200"
                    : "border-emerald-500/50 bg-emerald-950/70 text-emerald-200"
                }`}
              >
                <AlertCircle className="size-4 shrink-0 text-red-400" />
                <span>{statusMessage.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Manual Payment Method Guidance Modal */}
        {livechatModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-md rounded-2xl border border-[#d6a43a]/60 bg-[#0d1017] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(214,164,58,0.3)] text-white">
              <button
                type="button"
                onClick={() => setLivechatModalOpen(false)}
                className="absolute top-4 right-4 text-[#8e9ca7] hover:text-white"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
              <div className="flex items-center gap-3 pb-3 border-b border-[#261f14]">
                <MessageSquare className="size-7 text-[#ffda5d]" />
                <div>
                  <h4 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold text-[#ffda5d]">
                    Live Support Checkout
                  </h4>
                  <p className="text-xs text-[#8e9ca7]">
                    Selected Payment:{" "}
                    <span className="font-semibold text-white">
                      {selectedPayment === "card-pay" ? "Card Pay (Credit/Debit/Apple/Google Pay/PayPal)" : selectedPayment.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#cbd6dc]">
                {selectedPayment === "card-pay" ? (
                  <p>
                    You are purchasing <strong>{amount}M OSRS Gold</strong> for <strong>${total} USD</strong> using <strong>Card Pay</strong>. Our 24/7 LiveChat team will send your secure payment link and confirm your delivery in game immediately!
                  </p>
                ) : (
                  <p>
                    To pay via <strong>{selectedPayment.toUpperCase()}</strong> for <strong>{amount}M OSRS Gold (${total})</strong>, our live agents are standing by to provide the exact direct payment address or tag.
                  </p>
                )}
                <p className="text-xs text-[#8e9ca7]">
                  Delivery is completed in-game immediately upon payment confirmation (2–20 minutes).
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLivechatModalOpen(false)}
                  className="flex-1 rounded-xl border border-[#271f14] bg-[#141822] py-2.5 text-xs font-bold text-[#8e9ca7] hover:bg-[#1a202c] hover:text-white"
                >
                  Close
                </button>
                <a
                  href={`/contact?pay=${selectedPayment === "card-pay" ? "card pay" : selectedPayment}&item=${encodeURIComponent(`${amount}M OSRS Gold`)}&price=${total}`}
                  className="flex-1 text-center rounded-xl bg-[linear-gradient(180deg,#f3b23e,#c77a10)] py-2.5 text-xs font-black tracking-wider text-[#2a1705] shadow-[0_4px_16px_rgba(214,164,58,0.4)] hover:bg-[linear-gradient(180deg,#ffd46e,#d88b18)]"
                >
                  Open LiveChat
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
