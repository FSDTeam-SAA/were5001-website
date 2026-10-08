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
} from "lucide-react";
import { useCartStore } from "@/store/cart.store";

const PAYMENT_OPTIONS = [
  { id: "visa", name: "Visa", badge: "VISA", badgeColor: "#00579f" },
  { id: "mastercard", name: "Mastercard", badge: "MC", badgeColor: "#eb001b" },
  { id: "crypto", name: "Crypto", badge: "USDT", badgeColor: "#26a17b" },
  { id: "paypal", name: "PayPal", badge: "PP", badgeColor: "#003087" },
  { id: "revolut", name: "Revolut", badge: "REV", badgeColor: "#0075eb" },
];

export default function CartBanner() {
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

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const total = getTotal();

  const currentPaymentOption =
    PAYMENT_OPTIONS.find((p) => p.id === selectedPayment) ?? PAYMENT_OPTIONS[0];

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
          <div className="relative w-full max-w-md rounded-2xl border border-[#d6a43a]/60 bg-[#0d1017] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(214,164,58,0.3)]">
            <div className="flex items-center gap-3 pb-3 border-b border-[#261f14]">
              <ShieldCheck className="size-7 text-[#ffda5d]" />
              <div>
                <h4 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold text-[#ffda5d]">
                  Checkout Confirmation
                </h4>
                <p className="text-xs text-[#8e9ca7]">Order Total: ${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm text-[#cbd6dc]">
              <p>
                You are proceeding to secure checkout with{" "}
                <span className="font-bold text-[#ffda5d]">{currentPaymentOption.name}</span>.
              </p>
              <p className="text-xs text-[#8e9ca7]">
                Once payment is confirmed, an agent will meet you immediately in-game or via
                livechat to complete the delivery within 2–20 minutes.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="flex-1 rounded-xl border border-[#271f14] bg-[#141822] py-2.5 text-xs font-bold text-[#8e9ca7] hover:bg-[#1a202c] hover:text-white"
              >
                Back to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Order submitted successfully! Please join livechat to finalize your trade.");
                  setCheckoutModalOpen(false);
                }}
                className="flex-1 rounded-xl bg-[linear-gradient(180deg,#f3b23e,#c77a10)] py-2.5 text-xs font-black tracking-wider text-[#2a1705] shadow-[0_4px_16px_rgba(214,164,58,0.4)] hover:bg-[linear-gradient(180deg,#ffd46e,#d88b18)]"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
