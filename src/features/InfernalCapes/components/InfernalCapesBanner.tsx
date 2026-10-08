"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Gem,
  ArrowRight,
  ShoppingCart,
  Check,
  Shield,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  INFERNAL_CAPE_STEPS,
  BUILD_OPTIONS,
  WEAPON_OPTIONS,
  LIMITATION_OPTIONS,
  calculateInfernalPrice,
} from "../constants";
import { useCartStore } from "@/store/cart.store";

export default function InfernalCapesBanner() {
  // Matching screenshot default selection: Pure + Armadyl Crossbow = $116.99
  const [selectedBuild, setSelectedBuild] = useState<"main" | "zerker" | "pure">("pure");
  const [selectedWeapon, setSelectedWeapon] = useState<
    "twisted_bow" | "bow_of_faerdhinen" | "armadyl_crossbow"
  >("armadyl_crossbow");
  const [noRigour, setNoRigour] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = calculateInfernalPrice(selectedBuild, selectedWeapon, noRigour);

  const currentBuildObj = BUILD_OPTIONS.find((b) => b.id === selectedBuild) || BUILD_OPTIONS[2];
  const currentWeaponObj =
    WEAPON_OPTIONS.find((w) => w.id === selectedWeapon) || WEAPON_OPTIONS[2];

  const handleAddToCart = () => {
    const limitationsLabel = noRigour ? " (No Rigour)" : "";
    const itemName = `Infernal Cape - ${currentBuildObj.name} + ${currentWeaponObj.name}${limitationsLabel}`;

    addItem({
      id: `infernal-${selectedBuild}-${selectedWeapon}-${noRigour ? "no-rigour" : "standard"}`,
      name: itemName,
      price: currentPrice,
      image: currentBuildObj.image,
      inStock: true,
      category: "OSRS Infernal Cape Service",
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-32">
      {/* 1. Theme Background Artwork */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/assets/SELL-OSRS-GOLD.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(3,6,10,0.5)_20%,rgba(3,6,10,0.85)_70%,#03060a_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#ff5722]/15 blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Page Main Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10">
          {/* Diamond Ornament */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,transparent,#d6a43a)] opacity-70" />
            <span className="text-[#d6a43a] text-lg font-serif">◇</span>
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,#d6a43a,transparent)] opacity-70" />
          </div>

          <h1 className="font-[family-name:var(--font-eb-garamond)] text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.12em] uppercase">
            <span className="text-[#e5a93c] drop-shadow-[0_2px_14px_rgba(214,164,58,0.55)]">
              OSRS INFERNAL CAPE
            </span>{" "}
            <span className="text-[#f1f5f9] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
              SERVICE
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base font-medium text-[#8e9ca7]">
            Guaranteed TzKal-Zuk completion • Hand-done by veteran capers • 100% safe &amp; secure.
          </p>
        </div>

        {/* 4-Step Process Tutorial Section (From User Request) */}
        <div className="mb-10 rounded-2xl border border-[#261f18] bg-[#0a0d14]/90 p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {INFERNAL_CAPE_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="relative flex items-center gap-3.5 rounded-xl border border-[#1e2532] bg-[#0f1420]/80 p-4 transition-all hover:border-[#d6a43a]/50"
              >
                {/* Step badge with Gem */}
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#d49320,#8c590b)] text-white shadow-md">
                  <Gem className="size-5" />
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#ffda5d] text-[10px] font-black text-[#1a1205]">
                    {step.step}
                  </span>
                </div>

                {/* Step Text */}
                <p className="text-xs sm:text-[13px] font-semibold leading-snug text-[#cbd6dc]">
                  {step.title}
                </p>

                {/* Arrow connecting next step (on lg) */}
                {idx < 3 && (
                  <ArrowRight className="pointer-events-none hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 size-4 text-[#d6a43a]/60 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: SELECT YOUR ACCOUNT BUILD (matching screenshot) */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-3.5 flex items-center gap-2">
            <span className="text-[#d6a43a]">1.</span> SELECT YOUR ACCOUNT BUILD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {BUILD_OPTIONS.map((build) => {
              const isSelected = selectedBuild === build.id;
              return (
                <button
                  key={build.id}
                  type="button"
                  onClick={() => setSelectedBuild(build.id)}
                  className={`group relative flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#d6a43a] bg-[#161309]/90 shadow-[0_0_20px_rgba(214,164,58,0.25)] ring-1 ring-[#d6a43a]"
                      : "border-[#1e2633] bg-[#090d14]/85 hover:border-[#d6a43a]/50 hover:bg-[#0f1420]"
                  }`}
                >
                  {/* Radio Circle */}
                  <div
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-[#d6a43a] bg-[#d6a43a]"
                        : "border-[#4a5568] bg-[#090d14] group-hover:border-[#d6a43a]/60"
                    }`}
                  >
                    {isSelected && <div className="size-2 rounded-full bg-[#03060a]" />}
                  </div>

                  {/* Build Icon */}
                  <div className="relative flex size-8 shrink-0 items-center justify-center">
                    <Image
                      src={build.image}
                      alt={build.name}
                      width={32}
                      height={32}
                      className="size-7 object-contain drop-shadow-md"
                      unoptimized
                    />
                  </div>

                  {/* Detail */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold tracking-wide text-white">
                      {build.name}
                    </div>
                    <div className="text-xs text-[#8e9ca7] font-medium truncate">
                      {build.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: WEAPON TO USE (matching screenshot) */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-3.5 flex items-center gap-2">
            <span className="text-[#d6a43a]">2.</span> WEAPON TO USE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {WEAPON_OPTIONS.map((weapon) => {
              const isSelected = selectedWeapon === weapon.id;
              return (
                <button
                  key={weapon.id}
                  type="button"
                  onClick={() => setSelectedWeapon(weapon.id)}
                  className={`group relative flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#d6a43a] bg-[#161309]/90 shadow-[0_0_20px_rgba(214,164,58,0.25)] ring-1 ring-[#d6a43a]"
                      : "border-[#1e2633] bg-[#090d14]/85 hover:border-[#d6a43a]/50 hover:bg-[#0f1420]"
                  }`}
                >
                  {/* Radio Circle */}
                  <div
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-[#d6a43a] bg-[#d6a43a]"
                        : "border-[#4a5568] bg-[#090d14] group-hover:border-[#d6a43a]/60"
                    }`}
                  >
                    {isSelected && <div className="size-2 rounded-full bg-[#03060a]" />}
                  </div>

                  {/* Weapon Icon */}
                  <div className="relative flex size-8 shrink-0 items-center justify-center">
                    <Image
                      src={weapon.image}
                      alt={weapon.name}
                      width={32}
                      height={32}
                      className="size-7 object-contain drop-shadow-md"
                      unoptimized
                    />
                  </div>

                  {/* Detail */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold tracking-wide text-white">
                      {weapon.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: ACCOUNT LIMITATIONS (matching screenshot) */}
        <div className="mb-10">
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-3.5 flex items-center gap-2">
            <span className="text-[#d6a43a]">3.</span> ACCOUNT LIMITATIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {LIMITATION_OPTIONS.map((lim) => {
              return (
                <button
                  key={lim.id}
                  type="button"
                  onClick={() => setNoRigour(!noRigour)}
                  className={`group relative flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    noRigour
                      ? "border-[#d6a43a] bg-[#161309]/90 shadow-[0_0_20px_rgba(214,164,58,0.25)] ring-1 ring-[#d6a43a]"
                      : "border-[#1e2633] bg-[#090d14]/85 hover:border-[#d6a43a]/50 hover:bg-[#0f1420]"
                  }`}
                >
                  {/* Checkbox Circle */}
                  <div
                    className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                      noRigour
                        ? "border-[#d6a43a] bg-[#d6a43a]"
                        : "border-[#4a5568] bg-[#090d14] group-hover:border-[#d6a43a]/60"
                    }`}
                  >
                    {noRigour && <Check className="size-3.5 stroke-[3] text-[#03060a]" />}
                  </div>

                  {/* Limitation Icon */}
                  <div className="relative flex size-8 shrink-0 items-center justify-center">
                    <Image
                      src={lim.image}
                      alt={lim.name}
                      width={32}
                      height={32}
                      className="size-7 object-contain drop-shadow-md"
                      unoptimized
                    />
                  </div>

                  {/* Detail */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold tracking-wide text-white">
                      {lim.name}
                    </div>
                    <div className="text-[11px] text-[#8e9ca7]">+$10.00 extra fee</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTTOM PRICE & ACTION BAR (matching screenshot) */}
        <div className="rounded-2xl border border-[#d6a43a]/40 bg-[#090d14]/95 p-5 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(214,164,58,0.15)] backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Price Display */}
            <div>
              <div className="font-[family-name:var(--font-eb-garamond)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_2px_14px_rgba(214,164,58,0.5)]">
                ${currentPrice.toFixed(2)}
              </div>
              <div className="text-xs text-[#8e9ca7] font-medium mt-1">
                {currentBuildObj.name} • {currentWeaponObj.name}
                {noRigour ? " • No Rigour" : ""}
              </div>
            </div>

            {/* Action Buttons: Request Custom Quote & ADD TO CART */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto justify-end">
              <Link
                href="/contact"
                className="flex h-12 items-center justify-center rounded-xl border border-[#2b3548] bg-[#141c2b] px-6 text-xs sm:text-sm font-bold tracking-wider text-[#cbd6dc] transition-all duration-200 hover:border-[#d6a43a]/50 hover:bg-[#1a2538] hover:text-white cursor-pointer"
              >
                REQUEST CUSTOM QUOTE
              </Link>

              <button
                type="button"
                onClick={handleAddToCart}
                id="infernal-add-to-cart-btn"
                aria-label="Add Infernal Cape to Cart"
                className="group relative flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] px-7 font-bold tracking-wider text-white shadow-[0_6px_22px_rgba(214,147,32,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-200 active:scale-[0.98] hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] hover:shadow-[0_8px_28px_rgba(214,147,32,0.6)] text-xs sm:text-sm"
              >
                {addedToast ? (
                  <>
                    <Check className="size-4.5 text-white" />
                    <span>ADDED TO CART!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-4.5 text-white" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
