"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Crown,
  Lock,
  ShoppingCart,
  Check,
  Shield,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  BUILD_OPTIONS,
  WEAPON_OPTIONS,
  LIMITATION_OPTIONS,
  calculateInfernalPrice,
} from "../constants";
import { useCartStore } from "@/store/cart.store";

const INFERNAL_CAPE_FEATURES = [
  {
    icon: <Crown className="size-5 text-[#f5ba42] drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]" />,
    title: "Inferno Specialists",
    description:
      "Your Infernal Cape is handled by players experienced with high-level PvM.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f5ba42"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]"
      >
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
    title: "100% Manual Completion",
    description:
      "Every wave and encounter is completed manually. No bots, macros, or automated scripts.",
  },
  {
    icon: <Lock className="size-5 text-[#f5ba42] drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]" />,
    title: "Controlled Account Access",
    description:
      "Access is limited to what is required for your order. Temporary password recommended.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f5ba42"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]"
      >
        <line x1="6" y1="19" x2="6" y2="14" />
        <line x1="12" y1="19" x2="12" y2="9" />
        <line x1="18" y1="19" x2="18" y2="4" />
      </svg>
    ),
    title: "Progress Updates",
    description:
      "Receive updates throughout your order and confirmation once your cape is complete.",
  },
];

export default function InfernalCapesBanner() {
  const [selectedBuild, setSelectedBuild] = useState<"main" | "zerker" | "pure">("main");
  const [selectedWeapon, setSelectedWeapon] = useState<
    "twisted_bow" | "bow_of_faerdhinen" | "armadyl_crossbow"
  >("twisted_bow");
  const [noRigour, setNoRigour] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = calculateInfernalPrice(selectedBuild, selectedWeapon, noRigour);

  const currentBuildObj =
    BUILD_OPTIONS.find((b) => b.id === selectedBuild) || BUILD_OPTIONS[0];
  const currentWeaponObj =
    WEAPON_OPTIONS.find((w) => w.id === selectedWeapon) || WEAPON_OPTIONS[0];

  const handleAddToCart = () => {
    const limitationsLabel = noRigour ? " (No Rigour)" : "";
    const itemName = `Infernal Cape - ${currentBuildObj.name} • ${currentWeaponObj.name}${limitationsLabel}`;

    addItem({
      id: `infernal-${selectedBuild}-${selectedWeapon}-${noRigour ? "no-rigour" : "standard"}`,
      name: itemName,
      price: currentPrice,
      image: currentWeaponObj.image,
      inStock: true,
      category: "OSRS Infernal Cape Service",
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-32">
      {/* 1. Theme Background Artwork (infernal-capes.jpg) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] sm:h-[720px] md:h-[820px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/assets/infernal-capes.jpg')" }}
        />
        {/* Very light darkening to keep contrast without obscuring the art */}
        <div className="absolute inset-0 bg-[#03060a]/15" />
        {/* Soft Navbar blend */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#03060a]/80 to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_50%_30%,transparent_55%,rgba(3,6,10,0.4)_100%)]" />
        {/* Smooth bottom fade into infernal cape services */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03060a] via-[#03060a]/60 to-transparent" />
      </div>

      {/* Decorative Fiery Golden Light Beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,87,34,0.18),transparent_70%)] blur-3xl" />

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

        {/* Trust & Guarantee Cards matching Screenshot */}
        <div className="mb-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:mb-12">
          {INFERNAL_CAPE_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-3.5 rounded-xl border border-[#f5ba42]/50 bg-[#090f17]/90 p-4 sm:p-4.5 shadow-[0_8px_24px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:border-[#f5ba42] hover:bg-[#0e1624] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(245,186,66,0.2)]"
            >
              {/* Circular Gold Outline Icon Badge */}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#f5ba42]/40 bg-[#141d2b]/60 shadow-[0_0_12px_rgba(245,186,66,0.12)]">
                {feature.icon}
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-[14px] sm:text-[15px] font-bold leading-snug text-[#f5ba42]">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#94a3b8]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3-COLUMN CONFIGURATION SECTION (Matching Screenshot) */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Column 1: Select your Account Build */}
          <div>
            <div className="mb-3.5 flex items-center gap-2">
              <span className="flex size-5.5 items-center justify-center rounded-full bg-white text-[12px] font-black text-[#03060a]">
                1
              </span>
              <h2 className="text-sm font-bold tracking-wide text-white">
                Select your Account Build
              </h2>
            </div>

            <div className="space-y-3">
              {BUILD_OPTIONS.map((build) => {
                const isSelected = selectedBuild === build.id;
                return (
                  <button
                    key={build.id}
                    type="button"
                    onClick={() => setSelectedBuild(build.id)}
                    className={`group relative flex w-full items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-[#d6a43a] bg-[#161309]/95 shadow-[0_0_20px_rgba(214,164,58,0.25)] ring-1 ring-[#d6a43a]"
                        : "border-[#1e2633] bg-[#0c121c]/90 hover:border-[#d6a43a]/50 hover:bg-[#121a28]"
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

                    {/* Build Helm Icon */}
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

                    {/* Build Info */}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white">
                        {build.name}
                      </div>
                      <div className="text-[11px] text-[#8e9ca7]">
                        {build.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Weapon to Use */}
          <div>
            <div className="mb-3.5 flex items-center gap-2">
              <span className="flex size-5.5 items-center justify-center rounded-full bg-white text-[12px] font-black text-[#03060a]">
                2
              </span>
              <h2 className="text-sm font-bold tracking-wide text-white">
                Weapon to Use
              </h2>
            </div>

            <div className="space-y-3">
              {WEAPON_OPTIONS.map((weapon) => {
                const isSelected = selectedWeapon === weapon.id;
                return (
                  <button
                    key={weapon.id}
                    type="button"
                    onClick={() => setSelectedWeapon(weapon.id)}
                    className={`group relative flex w-full items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-[#d6a43a] bg-[#161309]/95 shadow-[0_0_20px_rgba(214,164,58,0.25)] ring-1 ring-[#d6a43a]"
                        : "border-[#1e2633] bg-[#0c121c]/90 hover:border-[#d6a43a]/50 hover:bg-[#121a28]"
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
                      <div className="text-sm font-bold text-white">
                        {weapon.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 3: Account Limitations */}
          <div>
            <div className="mb-3.5 flex items-center gap-2">
              <span className="flex size-5.5 items-center justify-center rounded-full bg-white text-[12px] font-black text-[#03060a]">
                3
              </span>
              <h2 className="text-sm font-bold tracking-wide text-white">
                Account Limitations
              </h2>
            </div>

            <div className="space-y-3">
              {LIMITATION_OPTIONS.map((lim) => {
                return (
                  <button
                    key={lim.id}
                    type="button"
                    onClick={() => setNoRigour(!noRigour)}
                    className={`group relative flex w-full items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                      noRigour
                        ? "border-[#d6a43a] bg-[#161309]/95 shadow-[0_0_20px_rgba(214,164,58,0.25)] ring-1 ring-[#d6a43a]"
                        : "border-[#1e2633] bg-[#0c121c]/90 hover:border-[#d6a43a]/50 hover:bg-[#121a28]"
                    }`}
                  >
                    {/* Checkbox Square */}
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
                      <div className="text-sm font-bold text-white">
                        {lim.name}
                      </div>
                      <div className="text-[11px] text-[#8e9ca7]">+$10.00 extra fee</div>
                    </div>
                  </button>
                );
              })}
            </div>
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
