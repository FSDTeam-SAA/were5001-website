"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  X,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";
import {
  paymentService,
  PaymentProductType,
} from "@/services/payment.service";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderInfo: {
    game: "OSRS" | "RS3" | "ITEM" | "SERVICE";
    title: string;
    amountM?: number;
    price: number;
    productType: PaymentProductType;
    defaultRsn?: string;
    details?: Record<string, any>;
  };
}

export default function CheckoutModal({
  isOpen,
  onClose,
  orderInfo,
}: CheckoutModalProps) {
  const [rsn, setRsn] = useState(orderInfo.defaultRsn || "");
  const [email, setEmail] = useState("");
  const [selectedGateway, setSelectedGateway] = useState<"card-pay" | "paypal" | "skrill">(
    "card-pay"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address for your order receipt.");
      return;
    }

    if (orderInfo.price <= 0) {
      setErrorMessage("Order amount must be greater than $0.00.");
      return;
    }

    if (selectedGateway === "card-pay") {
      const itemTitle = orderInfo.amountM
        ? `${orderInfo.amountM}M ${orderInfo.game} Gold`
        : orderInfo.title;
      const chatUrl = `/contact?pay=card pay&item=${encodeURIComponent(itemTitle)}&price=${orderInfo.price.toFixed(2)}`;
      window.location.href = chatUrl;
      return;
    }

    setIsLoading(true);

    try {
      if (selectedGateway === "paypal") {
        const result = await paymentService.createPayPalOrder({
          amount: Number(orderInfo.price.toFixed(2)),
          currency: "USD",
          customerEmail: trimmedEmail,
          productType: orderInfo.productType,
          productDetails: {
            ...orderInfo.details,
            gameCharacterName: rsn.trim() || undefined,
            quantityM: orderInfo.amountM,
            game: orderInfo.game,
          },
        });

        if (result.data?.approveUrl) {
          window.location.href = result.data.approveUrl;
          return;
        } else {
          throw new Error("No PayPal approval link received from server.");
        }
      } else {
        const result = await paymentService.createSkrillPayment({
          amount: Number(orderInfo.price.toFixed(2)),
          currency: "USD",
          customerEmail: trimmedEmail,
          productType: orderInfo.productType,
          productDetails: {
            ...orderInfo.details,
            gameCharacterName: rsn.trim() || undefined,
            quantityM: orderInfo.amountM,
            game: orderInfo.game,
          },
        });

        if (result.data?.checkoutUrl && result.data?.formFields) {
          paymentService.executeSkrillRedirect(
            result.data.checkoutUrl,
            result.data.formFields
          );
          return;
        } else {
          throw new Error("Unable to initiate Skrill checkout session.");
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Payment initiation failed. Please check connection and try again.";
      setErrorMessage(
        typeof msg === "string" ? msg : JSON.stringify(msg)
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#d6a43a]/60 bg-[linear-gradient(180deg,#14110c,#0a0a0d)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(214,164,58,0.25)] text-white sm:p-7">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 size-40 bg-[radial-gradient(ellipse_at_center,rgba(214,164,58,0.25),transparent_70%)] blur-2xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 grid size-8 place-items-center rounded-lg text-[#9aa7b2] transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
          aria-label="Close Checkout"
        >
          <X className="size-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#2d2215]">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#d6a43a]/50 bg-[linear-gradient(135deg,#34240b,#140e05)] text-[#ffda5d] shadow-[0_0_14px_rgba(214,164,58,0.3)]">
            <ShieldCheck className="size-6 text-[#ffda5d]" />
          </div>
          <div>
            <h3
              id="checkout-modal-title"
              className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold tracking-wide text-[#ffda5d] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
            >
              Secure Checkout
            </h3>
            <p className="text-xs text-[#8e9ca7]">
              Instant Delivery via 24/7 Live Support
            </p>
          </div>
        </div>

        {/* Order Summary Pill */}
        <div className="mt-5 rounded-xl border border-[#3b2d18] bg-[#0c0d11] p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#d6a43a]/20 px-2 py-0.5 text-[11px] font-black tracking-wider text-[#ffda5d]">
                {orderInfo.game}
              </span>
              <span className="text-sm font-bold text-white">
                {orderInfo.title}
              </span>
            </div>
            {orderInfo.amountM !== undefined && (
              <p className="mt-1 text-xs text-[#9aa7b2]">
                Quantity: <strong className="text-[#ffd75a]">{orderInfo.amountM}M Gold</strong>
              </p>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs text-[#8e9ca7]">Total Due:</span>
            <div className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold text-[#ffda5d]">
              ${orderInfo.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay} className="mt-5 space-y-4">
          {/* Email Address Input */}
          <div>
            <label
              htmlFor="checkout-email"
              className="block text-xs font-bold tracking-wide text-[#ffda5d] uppercase mb-1.5"
            >
              Customer Email Address <span className="text-amber-300">*</span>
            </label>
            <input
              id="checkout-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. your-email@gmail.com"
              className="w-full rounded-xl border border-[#312517] bg-[#0b0c0f] px-4 py-2.5 text-sm font-medium text-white placeholder-[#586470] outline-none transition-colors focus:border-[#d6a43a] focus:ring-1 focus:ring-[#d6a43a]"
            />
            <p className="mt-1 text-[11px] text-[#788794]">
              Receipt and instant delivery verification will be sent to this email.
            </p>
          </div>

          {/* RuneScape Name (RSN) Input */}
          <div>
            <label
              htmlFor="checkout-rsn"
              className="block text-xs font-bold tracking-wide text-[#ffda5d] uppercase mb-1.5"
            >
              RuneScape Name (RSN)
            </label>
            <input
              id="checkout-rsn"
              type="text"
              value={rsn}
              onChange={(e) => setRsn(e.target.value)}
              placeholder="Character name for in-game trade (optional)"
              className="w-full rounded-xl border border-[#312517] bg-[#0b0c0f] px-4 py-2.5 text-sm font-medium text-white placeholder-[#586470] outline-none transition-colors focus:border-[#d6a43a] focus:ring-1 focus:ring-[#d6a43a]"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold tracking-wide text-[#ffda5d] uppercase mb-2">
              Select Payment Method
            </label>
            <div className="space-y-2.5">
              {/* Featured Combined Card Pay Option */}
              <button
                type="button"
                onClick={() => setSelectedGateway("card-pay")}
                className={`relative flex w-full items-center justify-between rounded-xl bg-white p-2.5 transition-all cursor-pointer ${
                  selectedGateway === "card-pay"
                    ? "ring-2 ring-[#ffda5d] shadow-[0_0_20px_rgba(214,164,58,0.7)] scale-[1.01]"
                    : "opacity-85 hover:opacity-100 hover:scale-[1.005]"
                }`}
              >
                <div className="flex h-11 w-full items-center justify-center">
                  <Image
                    src="/assets/footer/card-pay-combined.svg"
                    alt="Card Pay (PayPal, Credit Card, Debit Card, Apple Pay, Google Pay)"
                    width={460}
                    height={90}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
                {selectedGateway === "card-pay" && (
                  <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-[11px] font-black text-yellow-950 shadow-[0_0_8px_rgba(214,164,58,0.85)]">
                    ✓
                  </span>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                {/* PayPal Option */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway("paypal")}
                  className={`relative flex h-12 items-center justify-center rounded-xl bg-white px-3 transition-all cursor-pointer ${
                    selectedGateway === "paypal"
                      ? "ring-2 ring-[#ffda5d] shadow-[0_0_16px_rgba(214,164,58,0.6)] scale-[1.02]"
                      : "opacity-85 hover:opacity-100 hover:scale-[1.01]"
                  }`}
                >
                  <Image
                    src="/assets/footer/payment-04.png"
                    alt="PayPal"
                    width={110}
                    height={34}
                    className="max-h-6 w-auto object-contain"
                  />
                  {selectedGateway === "paypal" && (
                    <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-[11px] font-black text-yellow-950 shadow-[0_0_8px_rgba(214,164,58,0.85)]">
                      ✓
                    </span>
                  )}
                </button>

                {/* Skrill Option */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway("skrill")}
                  className={`relative flex h-12 items-center justify-center rounded-xl bg-white px-3 transition-all cursor-pointer ${
                    selectedGateway === "skrill"
                      ? "ring-2 ring-[#ffda5d] shadow-[0_0_16px_rgba(214,164,58,0.6)] scale-[1.02]"
                      : "opacity-85 hover:opacity-100 hover:scale-[1.01]"
                  }`}
                >
                  <Image
                    src="/assets/footer/payment-01.png"
                    alt="Skrill"
                    width={110}
                    height={34}
                    className="max-h-6 w-auto object-contain"
                  />
                  {selectedGateway === "skrill" && (
                    <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-[11px] font-black text-yellow-950 shadow-[0_0_8px_rgba(214,164,58,0.85)]">
                      ✓
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-500/50 bg-red-950/60 p-3 text-xs text-red-200"
            >
              <AlertCircle className="size-4 shrink-0 text-red-400 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-[#271f14] bg-[#141822] py-3 text-xs font-bold text-[#8e9ca7] transition-colors hover:bg-[#1a202c] hover:text-white disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 relative flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f3b23e,#c77a10)] py-3 text-xs font-black tracking-wider text-[#2a1705] shadow-[0_4px_16px_rgba(214,164,58,0.45)] transition-all hover:bg-[linear-gradient(180deg,#ffd46e,#d88b18)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin text-[#2a1705]" />
                  <span>Connecting to Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="size-3.5" />
                  <span>
                    {selectedGateway === "card-pay"
                      ? "Pay with Card Pay (LiveChat)"
                      : selectedGateway === "paypal"
                      ? "Pay with PayPal"
                      : "Pay with Skrill"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
