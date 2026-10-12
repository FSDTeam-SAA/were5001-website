import Link from "next/link";
import { AlertCircle, ShoppingCart, Home } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 py-16">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-[radial-gradient(circle,rgba(214,164,58,0.12)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#3b2d18] bg-[linear-gradient(180deg,#120e0a,#07080b)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.95)] text-white text-center sm:p-10">
        <div className="mx-auto grid size-16 place-items-center rounded-full border border-amber-500/40 bg-[linear-gradient(135deg,#36250b,#181005)] text-[#ffda5d] shadow-[0_0_24px_rgba(214,164,58,0.35)]">
          <AlertCircle className="size-9 text-[#ffd75a]" />
        </div>

        <h1 className="mt-5 font-[family-name:var(--font-eb-garamond)] text-3xl font-bold tracking-wide text-[#ffda5d] sm:text-4xl">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-sm text-[#9aa7b2] leading-relaxed">
          Your payment session was cancelled. No charges were made to your account, and your reserved items remain safe.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/cart"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f3b23e,#c77a10)] py-3 px-6 text-xs font-black tracking-wider text-[#2a1705] shadow-[0_4px_16px_rgba(214,164,58,0.4)] hover:bg-[linear-gradient(180deg,#ffd46e,#d88b18)] transition-all"
          >
            <ShoppingCart className="size-4" />
            <span>Return to Cart</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#2b2216] bg-[#12151e] py-3 px-6 text-xs font-bold text-[#8e9ca7] hover:bg-[#1a202c] hover:text-white transition-colors"
          >
            <Home className="size-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
