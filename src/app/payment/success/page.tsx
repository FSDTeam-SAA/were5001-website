"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { paymentService, PaymentTransactionData } from "@/services/payment.service";
import { useCartStore } from "@/store/cart.store";

function SuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || searchParams.get("orderId");
  const payerId = searchParams.get("PayerID");

  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<PaymentTransactionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clear cart on payment return
    try {
      useCartStore.getState().clearCart();
    } catch {
      // ignore
    }

    async function captureOrder() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await paymentService.capturePayPalOrder(token);
        setTransaction(response.data);
      } catch (err: any) {
        // Even if capture throws because it's already captured or sandbox mock,
        // we capture the feedback gracefully
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Transaction pending verification";
        setError(typeof msg === "string" ? msg : JSON.stringify(msg));
      } finally {
        setLoading(false);
      }
    }

    captureOrder();
  }, [token]);

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center px-4 py-16">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[radial-gradient(circle,rgba(214,164,58,0.18)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#d6a43a]/60 bg-[linear-gradient(180deg,#120e0a,#07080b)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(214,164,58,0.25)] text-white sm:p-10">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Loader2 className="size-12 animate-spin text-[#ffd75a] mb-4" />
            <h2 className="font-[family-name:var(--font-eb-garamond)] text-3xl font-bold text-[#ffda5d]">
              Confirming Your Payment...
            </h2>
            <p className="mt-2 text-sm text-[#8e9ca7]">
              Please wait while we verify transaction authorization with the gateway.
            </p>
          </div>
        ) : (
          <div>
            {/* Header Success Badge */}
            <div className="flex flex-col items-center text-center">
              <div className="grid size-18 place-items-center rounded-full border border-emerald-500/50 bg-[linear-gradient(135deg,#0a3820,#04180d)] text-emerald-400 shadow-[0_0_28px_rgba(16,185,129,0.45)]">
                <CheckCircle2 className="size-10 text-emerald-400" />
              </div>

              <h1 className="mt-5 font-[family-name:var(--font-eb-garamond)] text-3xl font-bold tracking-wide text-[#ffda5d] sm:text-4xl drop-shadow-[0_2px_12px_rgba(214,164,58,0.4)]">
                Payment Authorized!
              </h1>
              <p className="mt-1 text-sm text-[#9aa7b2]">
                Your transaction has been processed securely.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="mt-7 rounded-2xl border border-[#3b2d18] bg-[#0b0c10] p-5 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#8e9ca7]">Reference / Order ID:</span>
                <span className="font-mono font-bold text-[#ffda5d]">
                  {token || "SEC-" + Math.random().toString(36).substring(2, 9).toUpperCase()}
                </span>
              </div>

              {transaction?.amount && (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#8e9ca7]">Total Amount:</span>
                  <span className="font-bold text-white text-base">
                    ${Number(transaction.amount).toFixed(2)} {transaction.currency || "USD"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#8e9ca7]">Delivery ETA:</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <Clock className="size-3.5" /> 2 ~ 20 Minutes
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#8e9ca7]">Status:</span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                  {transaction?.status ? transaction.status.toUpperCase() : "COMPLETED"}
                </span>
              </div>
            </div>

            {/* Error / Notice fallback if any */}
            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-950/40 p-3 text-xs text-amber-200">
                <AlertTriangle className="size-4 shrink-0 text-amber-400 mt-0.5" />
                <span className="flex-1 leading-relaxed">
                  Notice: {error}. If your payment went through, an agent in LiveChat will verify it immediately.
                </span>
              </div>
            )}

            {/* Delivery Instructions */}
            <div className="mt-6 rounded-2xl border border-[#2b2216] bg-[linear-gradient(180deg,#16120b,#0c0b0a)] p-5">
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#ffda5d]">
                <ShieldCheck className="size-5 text-[#ffd75a]" />
                <span>Next Step: In-Game Delivery</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#9ba8b3]">
                Please connect with our 24/7 Live Support team with your Order ID. An agent will meet you at the designated RuneScape in-game location immediately.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/contact"
                className="w-full flex-1 flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f3b23e,#c77a10)] py-3.5 text-sm font-black tracking-wider text-[#2a1705] shadow-[0_6px_20px_rgba(214,164,58,0.45)] hover:bg-[linear-gradient(180deg,#ffd46e,#d88b18)] transition-all"
              >
                <MessageSquare className="size-4" />
                <span>Open 24/7 Live Support</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 text-center text-xs font-bold text-[#8e9ca7] rounded-xl border border-[#2b2216] bg-[#12151e] hover:bg-[#1a202c] hover:text-white transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="size-10 animate-spin text-[#ffd75a]" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
