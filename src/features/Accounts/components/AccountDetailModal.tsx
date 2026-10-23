"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShieldCheck,
  Crown,
  ShoppingCart,
  Swords,
  ScrollText,
  Mail,
  Lock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { GameAccount } from "../types";

interface AccountDetailModalProps {
  account: GameAccount | null;
  onClose: () => void;
  onAddToCart: (account: GameAccount) => void;
  onBuyNow: (account: GameAccount) => void;
}

export default function AccountDetailModal({
  account,
  onClose,
  onAddToCart,
  onBuyNow,
}: AccountDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (account) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [account, onClose]);

  if (!account) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      {/* Dark Ambient Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#020509]/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#d6a43a]/70 bg-[linear-gradient(160deg,#0a131b_0%,#040a0f_100%)] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(214,164,58,0.25)] text-white z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Golden top accent line */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd46e] to-transparent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 grid size-9 place-items-center rounded-xl border border-[#2b3a47] bg-[#0c1822]/80 text-[#9cb0bd] transition-colors hover:border-[#d6a43a] hover:text-[#ffd46e] cursor-pointer"
        >
          <X className="size-4" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto p-5 sm:p-7">
          {/* Header section with image and title */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
            {/* Account Artwork / Thumbnail */}
            <div className="relative mx-auto md:mx-0 flex flex-col items-center justify-center w-full max-w-[220px] aspect-square rounded-xl border border-[#2c3d4a] bg-[radial-gradient(ellipse_at_center,rgba(214,164,58,0.12),transparent_70%),#070d13] p-4 shadow-inner overflow-hidden">
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                In Stock ({account.stock})
              </span>
              <Image
                src={account.image}
                alt={account.name}
                width={200}
                height={200}
                className="max-h-36 w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
              />
              <span className="mt-2 text-[11px] font-mono font-bold tracking-wider text-[#d6a43a]">
                #{account.acc_id}
              </span>
            </div>

            {/* Account Meta & Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-md border border-[#d6a43a]/50 bg-[#d6a43a]/15 px-2.5 py-0.5 text-xs font-bold text-[#ffd46e]">
                  {account.game} Account
                </span>
                <span className="rounded-md border border-[#273844] bg-[#0b1620] px-2.5 py-0.5 text-xs font-semibold text-[#a8b8c4]">
                  {account.category}
                </span>
              </div>

              <h2
                id="account-modal-title"
                className="font-[family-name:var(--font-eb-garamond)] text-2xl sm:text-3xl font-bold text-[#f5ebd0] leading-snug"
              >
                {account.name}
              </h2>

              {/* Combat & Stats counters */}
              <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="rounded-xl border border-[#223340] bg-[#070e14] p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#8e9ca7]">
                    <Swords className="size-3 text-[#d6a43a]" />
                    <span>Combat</span>
                  </div>
                  <div className="font-[family-name:var(--font-orbitron)] text-lg sm:text-xl font-bold text-[#ffd46e] mt-0.5">
                    {account.combatLevel ?? "N/A"}
                  </div>
                </div>

                <div className="rounded-xl border border-[#223340] bg-[#070e14] p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#8e9ca7]">
                    <Sparkles className="size-3 text-[#d6a43a]" />
                    <span>Total Level</span>
                  </div>
                  <div className="font-[family-name:var(--font-orbitron)] text-lg sm:text-xl font-bold text-[#ffd46e] mt-0.5">
                    {account.totalLevel ?? "N/A"}
                  </div>
                </div>

                <div className="rounded-xl border border-[#223340] bg-[#070e14] p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#8e9ca7]">
                    <ScrollText className="size-3 text-[#d6a43a]" />
                    <span>Quest Pts</span>
                  </div>
                  <div className="font-[family-name:var(--font-orbitron)] text-lg sm:text-xl font-bold text-[#ffd46e] mt-0.5">
                    {account.questPoints ?? "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-xl border border-[#1f303d] bg-[#070d13]/80 p-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#d6a43a] mb-1.5">
              Account Overview &amp; Build Details
            </h3>
            <p className="text-sm leading-relaxed text-[#c3d1dc]">
              {account.description}
            </p>
          </div>

          {/* Highlights pills */}
          {account.highlights && account.highlights.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-bold tracking-wider uppercase text-[#d6a43a] mb-2">
                Notable Unlocks &amp; Gear
              </h3>
              <div className="flex flex-wrap gap-2">
                {account.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#2b3c4a] bg-[#0b1722] px-3 py-1 text-xs font-semibold text-[#d8e3eb]"
                  >
                    <span className="text-[#ffd46e]">✓</span>
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Security & Ownership Guarantees */}
          <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2.5">
              <ShieldCheck className="size-4" />
              <span>SECNX Security &amp; Ownership Guarantee</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#b8cbd6]">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-emerald-400 shrink-0" />
                <span>100% Email Changeable to your own email</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
                <span>100% Hand-trained without bots or macros</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="size-3.5 text-emerald-400 shrink-0" />
                <span>Zero offenses / Pristine clean ban history</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="size-3.5 text-[#ffd46e] shrink-0" />
                <span>Lifetime SECNX anti-recovery warranty</span>
              </div>
            </div>
          </div>

          {/* Pricing & Call to Actions */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1d2d3a] pt-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8e9ca7]">
                Instant Purchase Price
              </span>
              <div className="font-[family-name:var(--font-eb-garamond)] text-3xl sm:text-4xl font-black text-[#ffda5d] drop-shadow-[0_2px_8px_rgba(214,164,58,0.5)]">
                ${account.price.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(account);
                  onClose();
                }}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#d6a43a]/60 bg-[#121c25] px-4 text-xs sm:text-sm font-bold text-[#ffd46e] transition-all hover:bg-[#d6a43a]/20 hover:border-[#d6a43a] cursor-pointer"
              >
                <ShoppingCart className="size-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onBuyNow(account);
                  onClose();
                }}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f3b23e_0%,#e09520_50%,#c77a10_100%)] px-6 text-xs sm:text-sm font-black tracking-wide text-[#2a1705] shadow-[0_4px_16px_rgba(214,164,58,0.4)] transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                <Crown className="size-4 fill-[#2a1705]" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Live Chat note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#8e9ca7]">
            <MessageSquare className="size-3.5 text-[#d6a43a]" />
            <span>Have specific questions about this account?</span>
            <Link
              href="/contact"
              className="font-bold text-[#ffd46e] underline hover:text-white"
            >
              Ask our 24/7 Live Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
