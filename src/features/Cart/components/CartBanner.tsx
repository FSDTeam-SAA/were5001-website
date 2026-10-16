"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ChevronDown,
  Crown,
  ChessQueen,
  Lock,
  Check,
  CreditCard,
  Coins,
  ShieldCheck,
  Loader2,
  AlertCircle,
  X,
  Mail,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import { paymentService } from "@/services/payment.service";

const PAYMENT_OPTIONS = [
  {
    id: "card-pay",
    name: "Card Pay (PayPal, Cards, Apple/Google Pay)",
    badge: "CARD PAY",
    badgeColor: "#d97706",
    isCardPay: true,
  },
  { id: "skrill", name: "Skrill", badge: "SKRILL", badgeColor: "#811345" },
  { id: "crypto", name: "Crypto", badge: "USDT", badgeColor: "#26a17b" },
  { id: "interac", name: "Interac e-Transfer", badge: "INTERAC", badgeColor: "#d69e2e" },
  { id: "neteller", name: "Neteller", badge: "NETELLER", badgeColor: "#84cc16" },
  { id: "paysafecard", name: "paysafecard", badge: "PAYSAFE", badgeColor: "#0284c7" },
  { id: "blik", name: "BLIK", badge: "BLIK", badgeColor: "#e11d48" },
  { id: "alipay", name: "Alipay", badge: "ALIPAY", badgeColor: "#0284c7" },
  { id: "bancontact", name: "Bancontact", badge: "BANCONTACT", badgeColor: "#f59e0b" },
  { id: "ideal", name: "iDEAL", badge: "IDEAL", badgeColor: "#ec4899" },
];

export default function CartBanner() {
  const router = useRouter();
  const {
    items,
    selectedPayment,
    setSelectedPayment,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotal,
  } = useCartStore();

  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [rsn, setRsn] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const total = getTotal();

  const currentPaymentOption =
    PAYMENT_OPTIONS.find((p) => p.id === selectedPayment) ?? PAYMENT_OPTIONS[0];

  const handleCheckoutPay = async () => {
    setCheckoutError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setCheckoutError("Please enter a valid email address to receive order details.");
      return;
    }

    if (items.length === 0 || total <= 0) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    // If card-pay is selected, redirect to LiveChat with cart summary details
    if (selectedPayment === "card-pay") {
      const itemListNames = items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
      const chatUrl = `/contact?pay=card pay&item=${encodeURIComponent(itemListNames)}&price=${total.toFixed(2)}`;
      router.push(chatUrl);
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedPayment === "paypal") {
        const result = await paymentService.createPayPalOrder({
          amount: Number(total.toFixed(2)),
          currency: "USD",
          customerEmail: trimmedEmail,
          productType: "item",
          productDetails: {
            gameCharacterName: rsn.trim() || undefined,
            items: items.map((i) => ({
              id: i.id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
              category: i.category,
            })),
          },
        });
        if (result.data?.approveUrl) {
          window.location.href = result.data.approveUrl;
          return;
        } else {
          throw new Error("No PayPal approval link received from server.");
        }
      } else if (selectedPayment === "skrill") {
        const result = await paymentService.createSkrillPayment({
          amount: Number(total.toFixed(2)),
          currency: "USD",
          customerEmail: trimmedEmail,
          productType: "item",
          productDetails: {
            gameCharacterName: rsn.trim() || undefined,
            items: items.map((i) => ({
              id: i.id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
              category: i.category,
            })),
          },
        });
        if (result.data?.checkoutUrl && result.data?.formFields) {
          paymentService.executeSkrillRedirect(
            result.data.checkoutUrl,
            result.data.formFields
          );
          return;
        } else {
          throw new Error("Failed to initialize Skrill checkout session.");
        }
      } else {
        // Direct any other manual payment to livechat
        const itemListNames = items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
        const chatUrl = `/contact?pay=${encodeURIComponent(selectedPayment)}&item=${encodeURIComponent(itemListNames)}&price=${total.toFixed(2)}`;
        router.push(chatUrl);
      }
    } catch (err: any) {
      setIsProcessing(false);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Payment initiation failed. Please check server connection.";
      setCheckoutError(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-28">
      {/* 1. Background image matching theme */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: "url('/assets/SELL-OSRS-GOLD.png')" }}
      />

      {/* Atmospheric dark gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_20%,rgba(18,14,10,0.55),rgba(3,6,10,0.92)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,10,0.72)_0%,rgba(3,6,10,0.85)_50%,#020609_100%)]" />

      {/* Subtle top golden light beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[880px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.22),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 2-Column Cart Desk Layout Matching Screenshot              */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
          {/* ==================== LEFT CARD: Product (X Items) ==================== */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-[#3b2d18]/90 bg-[linear-gradient(180deg,rgba(16,14,11,0.96),rgba(8,10,12,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-xl sm:p-7">
            <div>
              {/* Header: Product (X Items) + Clear Cart */}
              <div className="flex items-center justify-between border-b border-[#261f14] pb-4">
                <h2 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold tracking-wide text-[#ffda5d] sm:text-3xl">
                  Product ({totalItems} {totalItems === 1 ? "Item" : "Items"})
                </h2>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#8e9ca7] transition-colors hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                    <span>Clear Cart</span>
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="mt-5 space-y-3.5">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="grid size-16 place-items-center rounded-2xl border border-[#d6a43a]/30 bg-[#141822]/80 text-[#ffd75a] shadow-[0_0_24px_rgba(214,164,58,0.2)]">
                      <ShoppingCart className="size-8" />
                    </div>
                    <p className="mt-4 font-[family-name:var(--font-eb-garamond)] text-2xl font-bold text-[#ffda5d]">
                      Your Cart is Empty
                    </p>
                    <p className="mt-1 text-sm text-[#8e9ca7]">
                      Browse our high-tier items or gold to get started.
                    </p>
                    <Link
                      href="/items"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f3b23e_0%,#e09520_50%,#c77a10_100%)] px-5 py-2.5 text-sm font-bold text-[#2a1705] shadow-[0_4px_16px_rgba(214,164,58,0.4)] transition-all hover:scale-105"
                    >
                      <span>Explore Items</span>
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 rounded-xl border border-[#271f14] bg-[#070a0e] p-3.5 shadow-inner transition-colors hover:border-[#d6a43a]/40 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Runic Thumbnail Frame with Corners */}
                        <div className="relative size-13 shrink-0 overflow-hidden rounded-xl border border-[#d6a43a]/40 bg-[linear-gradient(135deg,#0a1b2a,#050e16)] shadow-[0_0_12px_rgba(0,0,0,0.8)]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={52}
                            height={52}
                            className="size-full object-contain p-1"
                          />
                        </div>

                        {/* Title and In Stock */}
                        <div className="min-w-0">
                          <h3 className="truncate text-sm sm:text-base font-bold tracking-wide text-[#e6edf2]">
                            {item.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                            <span>In Stock</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quantity, Price & Delete Action */}
                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        {/* Quantity Controller: [-] Qty [+] */}
                        <div className="flex h-10 items-center rounded-lg border border-[#312517] bg-[#0c1015] px-1.5 shadow-inner">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="grid size-7 place-items-center rounded text-[#8e9ca7] transition-colors hover:bg-[#d6a43a]/15 hover:text-white cursor-pointer"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-xs sm:text-sm font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="grid size-7 place-items-center rounded text-[#8e9ca7] transition-colors hover:bg-[#d6a43a]/15 hover:text-white cursor-pointer"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="min-w-18 text-right font-[family-name:var(--font-eb-garamond)] text-2xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_1px_4px_rgba(214,164,58,0.4)]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        {/* Trash Delete Action */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="grid size-8 place-items-center rounded-lg text-[#8e9ca7] transition-colors hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer: Continue Shopping Link */}
            <div className="mt-8 border-t border-[#261f14] pt-4">
              <Link
                href="/items"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#d6a43a] transition-colors hover:text-[#ffda5d]"
              >
                <ArrowLeft className="size-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* ==================== RIGHT CARD: Order Summary ==================== */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#3b2d18]/90 bg-[linear-gradient(180deg,rgba(16,14,11,0.96),rgba(8,10,12,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,215,90,0.12)] backdrop-blur-xl sm:p-7">
            {/* Amber Glow Accent */}
            <div className="pointer-events-none absolute -top-10 -right-10 size-36 bg-[radial-gradient(ellipse_at_center,rgba(214,164,58,0.2),transparent_70%)] blur-2xl" />

            <div>
              {/* Header: ShoppingCart Icon + Order Summary */}
              <div className="flex items-center gap-3 pb-4">
                <ShoppingCart className="size-6 text-[#ffda5d]" strokeWidth={2.2} />
                <div>
                  <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold tracking-wide text-[#ffda5d]">
                    Order Summary
                  </h3>
                  <p className="text-xs font-semibold text-[#8e9ca7]">
                    {totalItems} {totalItems === 1 ? "Item" : "Items"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#261f14]" />

              {/* Subtotal Row */}
              <div className="flex items-center justify-between py-5">
                <span className="text-sm font-semibold text-[#8e9ca7]">Subtotal</span>
                <span className="text-base font-bold text-[#e6edf2]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Payment Method Selector Dropdown */}
              <div className="py-2">
                <label className="block text-xs font-semibold text-[#8e9ca7] mb-2">
                  Payment Method
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPaymentDropdownOpen((prev) => !prev)}
                    className="flex h-12 w-full items-center justify-between rounded-xl border border-[#312517] bg-[#070a0e] px-3.5 shadow-inner transition-colors hover:border-[#d6a43a]/50 cursor-pointer"
                    aria-expanded={paymentDropdownOpen}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="rounded px-2 py-0.5 text-[11px] font-black text-white shadow-sm"
                        style={{ backgroundColor: currentPaymentOption.badgeColor }}
                      >
                        {currentPaymentOption.badge}
                      </span>
                      <span className="text-sm font-bold text-[#e6edf2]">
                        {currentPaymentOption.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`size-4 text-[#8e9ca7] transition-transform duration-200 ${
                        paymentDropdownOpen ? "rotate-180 text-[#ffda5d]" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Options */}
                  {paymentDropdownOpen && (
                    <div className="absolute top-full left-0 z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-[#3d2c16] bg-[#0d1017] p-1.5 shadow-2xl backdrop-blur-xl">
                      {PAYMENT_OPTIONS.map((opt) => {
                        const isSelected = selectedPayment === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedPayment(opt.id);
                              setPaymentDropdownOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#d6a43a]/20 text-[#ffda5d]"
                                : "text-[#8e9ca7] hover:bg-[#141822] hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className="rounded px-2 py-0.5 text-[10px] font-black text-white"
                                style={{ backgroundColor: opt.badgeColor }}
                              >
                                {opt.badge}
                              </span>
                              <span>{opt.name}</span>
                            </div>
                            {isSelected && <Check className="size-4 text-[#ffda5d]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {/* Visual preview if card-pay selected */}
                  {selectedPayment === "card-pay" && (
                    <div className="mt-2.5 overflow-hidden rounded-xl border border-[#d6a43a]/50 bg-white p-2.5 shadow-[0_4px_16px_rgba(214,164,58,0.25)]">
                      <Image
                        src="/assets/footer/card-pay-combined.svg"
                        alt="Card Pay (PayPal, Credit Card, Debit Card, Apple Pay, Google Pay)"
                        width={460}
                        height={90}
                        className="h-10 w-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="mt-6 border-t border-[#261f14] pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-[#e6edf2]">Total</span>
                  <div className="text-right">
                    <span className="font-[family-name:var(--font-eb-garamond)] text-4xl sm:text-5xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_2px_14px_rgba(214,164,58,0.55)]">
                      ${total.toFixed(2)}
                    </span>
                    <div className="text-xs text-[#707f8c] font-medium mt-0.5">
                      No Hidden Fees
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action: Proceed to Payment Button */}
            <div className="mt-7 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                disabled={items.length === 0}
                id="cart-proceed-payment-btn"
                aria-label="Proceed to Payment"
                className="group relative flex aspect-[204/63] w-full max-w-[340px] cursor-pointer items-center justify-center bg-[url('/assets/slideshow/blank-buy-btn.png')] bg-contain bg-center bg-no-repeat transition-transform duration-200 active:scale-[0.97] hover:scale-[1.03] hover:bg-[url('/assets/slideshow/blank-buy-btn-hover.png')] drop-shadow-[0_12px_32px_rgba(214,164,58,0.55)] hover:drop-shadow-[0_16px_44px_rgba(214,164,58,0.85)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:drop-shadow-none"
              >
                <div className="flex items-center justify-center gap-2 px-6">
                  <ChessQueen
                    className="h-5 w-5 text-[#3a1005] fill-[#4a1506]/35 drop-shadow-[0_1px_1px_rgba(255,225,120,0.75)] transition-transform duration-200 group-hover:scale-110 shrink-0"
                    strokeWidth={2.4}
                  />
                  <span className="font-[family-name:var(--font-eb-garamond)] text-[16px] font-black tracking-wider text-[#3a1005] drop-shadow-[0_1px_1px_rgba(255,225,120,0.85)] sm:text-[18px] whitespace-nowrap">
                    Proceed to Payment
                  </span>
                </div>
              </button>

              {/* Security Reservation Note */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#8e9ca7]">
                <Lock className="size-3.5 text-[#ffda5d]" />
                <span>Your items are reserved while you complete checkout.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Dialog Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#d6a43a]/60 bg-[#0d1017] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(214,164,58,0.3)] text-white">
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              disabled={isProcessing}
              className="absolute top-4 right-4 text-[#8e9ca7] hover:text-white disabled:opacity-50"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-[#261f14]">
              <ShieldCheck className="size-7 text-[#ffda5d]" />
              <div>
                <h4 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold text-[#ffda5d]">
                  Secure Cart Checkout
                </h4>
                <p className="text-xs text-[#8e9ca7]">
                  Order Total: <strong className="text-[#ffd75a]">${total.toFixed(2)} USD</strong> ({totalItems} items)
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3.5">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="cart-checkout-email"
                  className="block text-xs font-bold tracking-wide text-[#ffda5d] uppercase mb-1"
                >
                  Customer Email <span className="text-amber-400">*</span>
                </label>
                <div className="flex h-11 items-center rounded-xl border border-[#312517] bg-[#070a0e] px-3 shadow-inner focus-within:border-[#d6a43a]">
                  <Mail className="size-4 text-[#ffd75a] mr-2 shrink-0" />
                  <input
                    id="cart-checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for delivery receipt"
                    className="w-full min-w-0 bg-transparent text-sm font-medium text-white placeholder-[#505a64] outline-none"
                  />
                </div>
              </div>

              {/* RSN */}
              <div>
                <label
                  htmlFor="cart-checkout-rsn"
                  className="block text-xs font-bold tracking-wide text-[#ffda5d] uppercase mb-1"
                >
                  RuneScape Character Name (RSN)
                </label>
                <div className="flex h-11 items-center rounded-xl border border-[#312517] bg-[#070a0e] px-3 shadow-inner focus-within:border-[#d6a43a]">
                  <User className="size-4 text-[#ffd75a] mr-2 shrink-0" />
                  <input
                    id="cart-checkout-rsn"
                    type="text"
                    value={rsn}
                    onChange={(e) => setRsn(e.target.value)}
                    placeholder="In-game character name (optional)"
                    className="w-full min-w-0 bg-transparent text-sm font-medium text-white placeholder-[#505a64] outline-none"
                  />
                </div>
              </div>

              {/* Selected Gateway info */}
              <div>
                <label className="block text-xs font-bold tracking-wide text-[#ffda5d] uppercase mb-1.5">
                  Payment Gateway
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment("card-pay")}
                    className={`flex items-center justify-between rounded-xl py-2 px-3.5 text-xs font-bold border transition-all ${
                      selectedPayment === "card-pay"
                        ? "border-[#d6a43a] bg-[#d6a43a]/20 text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.3)]"
                        : "border-[#271f14] bg-[#141822] text-[#8e9ca7] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-amber-500/20 text-amber-300 px-2 py-0.5 text-[10px] font-black">CARD PAY</span>
                      <span>Card Pay (PayPal, Credit/Debit, Apple/Google Pay)</span>
                    </div>
                    {selectedPayment === "card-pay" && <Check className="size-3.5 text-[#ffd75a]" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("paypal")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold border transition-all ${
                        selectedPayment === "paypal"
                          ? "border-[#d6a43a] bg-[#d6a43a]/20 text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.3)]"
                          : "border-[#271f14] bg-[#141822] text-[#8e9ca7] hover:text-white"
                      }`}
                    >
                      <span>PayPal</span>
                      {selectedPayment === "paypal" && <Check className="size-3.5 text-[#ffd75a]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("skrill")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold border transition-all ${
                        selectedPayment === "skrill"
                          ? "border-[#d6a43a] bg-[#d6a43a]/20 text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.3)]"
                          : "border-[#271f14] bg-[#141822] text-[#8e9ca7] hover:text-white"
                      }`}
                    >
                      <span>Skrill</span>
                      {selectedPayment === "skrill" && <Check className="size-3.5 text-[#ffd75a]" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error feedback */}
              {checkoutError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-500/50 bg-red-950/70 p-3 text-xs text-red-200"
                >
                  <AlertCircle className="size-4 shrink-0 text-red-400 mt-0.5" />
                  <span className="flex-1">{checkoutError}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                disabled={isProcessing}
                className="flex-1 rounded-xl border border-[#271f14] bg-[#141822] py-2.5 text-xs font-bold text-[#8e9ca7] hover:bg-[#1a202c] hover:text-white disabled:opacity-50"
              >
                Back to Cart
              </button>
              <button
                type="button"
                onClick={handleCheckoutPay}
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f3b23e,#c77a10)] py-2.5 text-xs font-black tracking-wider text-[#2a1705] shadow-[0_4px_16px_rgba(214,164,58,0.4)] hover:bg-[linear-gradient(180deg,#ffd46e,#d88b18)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-3.5" />
                    <span>Confirm &amp; Pay</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
