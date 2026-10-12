"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  ChessQueen,
  ChevronDown,
  FileText,
  Handshake,
  CreditCard,
  Coins,
  Crown,
  Check,
  User,
  Loader2,
  AlertCircle,
  MessageSquare,
  X,
  Mail,
} from "lucide-react";
import { paymentService } from "@/services/payment.service";

// Standard competitive RS3 rate matching the platform
const RATE_PER_M = 0.027;
const DEFAULT_AMOUNT = 500;
const AMOUNT_OPTIONS = [100, 250, 500, 1000, 2500, 5000];

// 12 Payment Methods matching the design
export type PaymentMethod = {
  id: string;
  name: string;
  type: "image" | "svg";
  imageSrc?: string;
  svgComponent?: React.ReactNode;
};

export default function BuyRs3Banner() {
  const [rsn, setRsn] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [selectedPayment, setSelectedPayment] = useState<string>("paypal");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "info" | "success";
    text: string;
  } | null>(null);
  const [livechatModalOpen, setLivechatModalOpen] = useState(false);
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

    if (amount <= 0) {
      setStatusMessage({
        type: "error",
        text: "Please specify a valid amount of RS3 gold to purchase.",
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
          productType: "gold_rs3",
          productDetails: {
            game: "RS3",
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
          productType: "gold_rs3",
          productDetails: {
            game: "RS3",
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
              BUY RS3 GOLD
            </h1>
            <span className="text-sm text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.8)]">
              ◇
            </span>
            <span className="h-px w-20 bg-[linear-gradient(270deg,transparent,#d6a43a)] sm:w-36" />
          </div>
          <p className="mt-3 text-sm font-semibold tracking-wider text-[#a0aeb9] sm:text-base">
            Fast Delivery • Best Rates • Trusted by Thousands
          </p>
        </header>

        {/* ========================================================= */}
        {/* 3. 3-Step Process Bar                                     */}
        {/* ========================================================= */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#3b2d18]/90 bg-[linear-gradient(180deg,rgba(20,16,11,0.92),rgba(9,9,8,0.96))] px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-md sm:px-6 sm:py-4">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-3 max-[980px]:grid-cols-1 max-[980px]:gap-3.5">
            {/* Step 1: PLACE ORDER */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">
                  1
                </span>
              </div>
              <div className="grid size-9 shrink-0 place-items-center text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <CreditCard className="size-6" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  PLACE ORDER
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  Select amount, enter character name &amp; pay securely.
                </div>
              </div>
            </div>

            {/* Separator 1 */}
            <span className="shrink-0 px-1 text-xl font-bold text-[#6d5732] max-[980px]:hidden">
              ›
            </span>

            {/* Step 2: CONTACT LIVECHAT */}
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
                  MEET IN GAME
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

            {/* Step 3: RECEIVE GOLD */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#d6a43a]/5">
              <div className="relative grid size-11 shrink-0 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-[#d6a43a] bg-[linear-gradient(135deg,#33240b,#140e05)] shadow-[0_0_12px_rgba(214,164,58,0.4)] transition-transform group-hover:scale-105" />
                <span className="relative text-sm font-black tracking-tight text-[#ffda5d]">
                  3
                </span>
              </div>
              <div className="grid size-9 shrink-0 place-items-center text-[#ffda5d] drop-shadow-[0_0_8px_rgba(214,164,58,0.4)]">
                <Coins className="size-6" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold tracking-wide text-[#ffda5d] max-[1120px]:text-xs">
                  RECEIVE GOLD
                </div>
                <div className="text-xs text-[#9aa7b2] leading-snug">
                  Receive your gold safely in 2–20 minutes.
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
                  BUY RS3 GOLD
                </h2>
                <p className="text-sm font-medium text-[#9daab5]">
                  Fast • Safe • Trusted by Thousands of Players
                </p>
              </div>
            </div>

            {/* RSN & Email Fields */}
            <div className="mt-6 grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
              {/* RSN Field */}
              <div>
                <label
                  htmlFor="buy-rs3-rsn-input"
                  className="block text-sm font-bold tracking-wide text-[#ffda5d]"
                >
                  RSN (RuneScape Character Name)
                </label>
                <div className="mt-2 flex h-13 items-center rounded-xl border border-[#312517] bg-[#070a0e] px-4 shadow-inner transition-colors focus-within:border-[#d6a43a] focus-within:ring-2 focus-within:ring-[#d6a43a]/25">
                  <div className="grid size-6 shrink-0 place-items-center pr-1 text-[#ffd75a]">
                    <User className="size-5" />
                  </div>
                  <input
                    id="buy-rs3-rsn-input"
                    type="text"
                    value={rsn}
                    onChange={(e) => setRsn(e.target.value)}
                    placeholder="Enter your RuneScape name"
                    className="w-full min-w-0 bg-transparent pl-2 text-base font-medium text-white placeholder-[#505a64] outline-none sm:text-lg"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="buy-rs3-email-input"
                  className="block text-sm font-bold tracking-wide text-[#ffda5d]"
                >
                  Customer Email <span className="text-amber-400">*</span>
                </label>
                <div className="mt-2 flex h-13 items-center rounded-xl border border-[#312517] bg-[#070a0e] px-4 shadow-inner transition-colors focus-within:border-[#d6a43a] focus-within:ring-2 focus-within:ring-[#d6a43a]/25">
                  <div className="grid size-6 shrink-0 place-items-center pr-1 text-[#ffd75a]">
                    <Mail className="size-5" />
                  </div>
                  <input
                    id="buy-rs3-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. your-email@gmail.com"
                    className="w-full min-w-0 bg-transparent pl-2 text-base font-medium text-white placeholder-[#505a64] outline-none sm:text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Field: Amount of Gold */}
            <div className="mt-6">
              <label
                htmlFor="buy-rs3-amount-input"
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
                    id="buy-rs3-amount-input"
                    type="number"
                    min={1}
                    value={amount || ""}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full min-w-0 bg-transparent pl-2 text-base font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:text-lg"
                  />
                  <span className="shrink-0 select-none px-2 text-sm font-bold text-[#ffda5d]">
                    M
                  </span>
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

          {/* ==================== RIGHT CARD (Order / Payout Summary) ==================== */}
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

              {/* Game Item: Stylized RS3 Logo matching screenshot */}
              <div className="flex items-center justify-between py-6">
                <span className="text-base font-semibold text-[#8e9ca7]">
                  Game:
                </span>
                <div className="flex items-center">
                  <span className="font-[family-name:var(--font-eb-garamond)] text-3xl font-black tracking-tight text-[#e6edf2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    RS
                  </span>
                  <span className="font-[family-name:var(--font-eb-garamond)] text-[38px] font-black italic bg-[linear-gradient(180deg,#ffe37a_0%,#e09520_60%,#b86c05_100%)] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(214,164,58,0.65)] -ml-1">
                    3
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
                  ${RATE_PER_M.toFixed(3)}/M
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

        {/* Bottom CTA Button: Exactly matching /buy/osrs button */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={handleBuyOrder}
            disabled={isLoading}
            id="buy-rs3-submit-btn"
            aria-label="Buy RS3 Gold Now"
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
                    Selected Payment: <span className="capitalize font-semibold text-white">{selectedPayment}</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#cbd6dc]">
                <p>
                  To pay via <strong>{selectedPayment.toUpperCase()}</strong> for <strong>{amount}M RS3 Gold (${total})</strong>, our live agents are standing by to provide the exact direct payment address or tag.
                </p>
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
                  href="/contact"
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
