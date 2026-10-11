"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Zap,
  Swords,
  ChevronDown,
  ShoppingCart,
  Check,
  Search,
  Sparkles,
} from "lucide-react";
import {
  OSRS_SKILLS,
  TRAINING_METHODS,
  getXpForLevel,
} from "../constants";
import { useCartStore } from "@/store/cart.store";

const SKILLING_FEATURES = [
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
        <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v4" />
        <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
    title: "100% Manual Training",
    description:
      "Every skill is trained manually by experienced players. No bots, macros, or automated scripts.",
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="10" r="2.5" />
        <path d="M8.5 16.5a3.5 3.5 0 0 1 7 0" />
      </svg>
    ),
    title: "Experienced Skillers",
    description:
      "Your account is assigned to a player experienced with the training method selected for your order.",
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
        <rect width="14" height="10" x="5" y="11" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <circle cx="12" cy="15.5" r="1" fill="#f5ba42" />
        <line x1="12" y1="16.5" x2="12" y2="18" />
      </svg>
    ),
    title: "Account Access Protection",
    description:
      "Access is limited to what is required for your service. We recommend changing your password after.",
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="13" y2="13" />
      </svg>
    ),
    title: "Progress Updates",
    description:
      "Receive regular updates throughout your order so you can track your account's progress.",
  },
];

export default function SkillingBanner() {
  const [selectedSkillId, setSelectedSkillId] = useState("strength");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [desiredLevel, setDesiredLevel] = useState(10);
  const [selectedMethodId, setSelectedMethodId] = useState("standard");
  const [addedToast, setAddedToast] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const selectedSkill =
    OSRS_SKILLS.find((s) => s.id === selectedSkillId) || OSRS_SKILLS[1];
  const selectedMethod =
    TRAINING_METHODS.find((m) => m.id === selectedMethodId) ||
    TRAINING_METHODS[1];

  // Calculate XP required
  const startXp = getXpForLevel(currentLevel);
  const endXp = getXpForLevel(desiredLevel);
  const xpDifference = Math.max(0, endXp - startXp);

  // Dynamic pricing based on XP needed and skill rate
  const rawPrice =
    (xpDifference / 1_000_000) *
    selectedSkill.ratePerM *
    selectedMethod.priceMultiplier;
  // Floor to minimum order price of $0.50
  const totalPrice = Math.max(0.5, Number(rawPrice.toFixed(2)));

  const handleCurrentLevelChange = (val: number) => {
    const clamped = Math.max(1, Math.min(val, 98));
    setCurrentLevel(clamped);
    if (desiredLevel <= clamped) {
      setDesiredLevel(Math.min(99, clamped + 1));
    }
  };

  const handleDesiredLevelChange = (val: number) => {
    const clamped = Math.max(currentLevel + 1, Math.min(val, 99));
    setDesiredLevel(clamped);
  };

  const handleAddToCart = () => {
    const itemName = `${selectedSkill.name} (${currentLevel}-${desiredLevel})`;
    addItem({
      id: `skilling-${selectedSkill.id}-${currentLevel}-${desiredLevel}`,
      name: itemName,
      price: totalPrice,
      image: selectedSkill.icon,
      inStock: true,
      category: "OSRS Power Leveling",
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-32">
      {/* 1. Theme Background Artwork (skilling-1.jpg) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] sm:h-[720px] md:h-[820px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/assets/skilling-1.jpg')" }}
        />
        {/* Very light darkening to keep contrast without obscuring the village art */}
        <div className="absolute inset-0 bg-[#03060a]/15" />
        {/* Soft Navbar blend */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#03060a]/80 to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_50%_30%,transparent_55%,rgba(3,6,10,0.4)_100%)]" />
        {/* Smooth bottom fade into skilling controls */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03060a] via-[#03060a]/60 to-transparent" />
      </div>

      {/* Decorative Golden Light Beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.2),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Page Main Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12">
          {/* Diamond Ornament */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,transparent,#d6a43a)] opacity-70" />
            <span className="text-[#d6a43a] text-lg font-serif">◇</span>
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,#d6a43a,transparent)] opacity-70" />
          </div>

          <h1 className="font-[family-name:var(--font-eb-garamond)] text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.12em] uppercase">
            <span className="text-[#e5a93c] drop-shadow-[0_2px_14px_rgba(214,164,58,0.55)]">
              OSRS POWER LEVELING
            </span>{" "}
            <span className="text-[#f1f5f9] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
              SERVICES
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base font-medium text-[#8e9ca7]">
            Fast, 100% hand-trained RuneScape skill leveling by verified top-tier gamers.
          </p>
        </div>

        {/* Trust & Guarantee Cards matching Screenshot */}
        <div className="mb-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:mb-12">
          {SKILLING_FEATURES.map((feature) => (
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

        {/* STEP 1: SELECT DESIRED SKILL TO BOOST */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#d6a43a]">1.</span> SELECT DESIRED SKILL TO BOOST
          </h2>

          {/* Grid matching screenshot: 8 on top, 8 on middle, 6 on bottom row */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3.5">
            {OSRS_SKILLS.map((skill) => {
              const isSelected = selectedSkillId === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`group relative flex flex-col items-center justify-center rounded-xl border p-3 sm:p-4 transition-all duration-200 cursor-pointer min-h-[96px] ${
                    isSelected
                      ? "border-[#d6a43a] bg-[#1a150b]/95 shadow-[0_0_22px_rgba(214,164,58,0.35),inset_0_1px_1px_rgba(255,225,120,0.3)] ring-1 ring-[#d6a43a]"
                      : "border-[#1a2332] bg-[#090d14]/85 hover:border-[#d6a43a]/60 hover:bg-[#111724] hover:shadow-[0_0_16px_rgba(214,164,58,0.2)]"
                  }`}
                >
                  {/* Skill Icon */}
                  <div className="relative mb-2 flex size-9 items-center justify-center">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={36}
                      height={36}
                      className="size-8 object-contain transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                      unoptimized
                    />
                  </div>

                  {/* Skill Label */}
                  <span
                    className={`text-[10px] sm:text-[11px] font-black tracking-wider uppercase transition-colors text-center ${
                      isSelected
                        ? "text-[#ffda5d] drop-shadow-[0_1px_4px_rgba(214,164,58,0.4)]"
                        : "text-[#8e9ca7] group-hover:text-white"
                    }`}
                  >
                    {skill.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: ENTER YOUR DESIRED LEVELS */}
        <div>
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#d6a43a]">2.</span> ENTER YOUR DESIRED LEVELS
          </h2>

          {/* Configuration Bottom Card matching screenshot */}
          <div className="rounded-2xl border border-[#d6a43a]/35 bg-[#090d14]/92 p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(214,164,58,0.15)] backdrop-blur-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Selected Skill Visual Preview */}
              <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 pr-4 border-b lg:border-b-0 lg:border-r border-[#1e2633] pb-4 lg:pb-0">
                <div className="relative flex size-14 items-center justify-center rounded-xl border border-[#d6a43a]/50 bg-[#161208] shadow-[0_0_16px_rgba(214,164,58,0.25)]">
                  <Image
                    src={selectedSkill.icon}
                    alt={selectedSkill.name}
                    width={40}
                    height={40}
                    className="size-9 object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="font-[family-name:var(--font-eb-garamond)] text-xl sm:text-2xl font-bold tracking-wide text-[#ffda5d]">
                    {selectedSkill.name}
                  </div>
                  <div className="text-xs text-[#8e9ca7]">
                    XP Needed: <span className="font-semibold text-white">{xpDifference.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Form Controls Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                {/* Current Level */}
                <div>
                  <label className="block text-xs font-bold text-[#8e9ca7] mb-1.5 uppercase tracking-wider">
                    Current Level
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={98}
                      value={currentLevel}
                      onChange={(e) => handleCurrentLevelChange(Number(e.target.value))}
                      className="w-full rounded-xl border border-[#1e2633] bg-[#0d121c] px-4 py-2.5 text-base font-bold text-white transition-colors focus:border-[#d6a43a] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Desired Level */}
                <div>
                  <label className="block text-xs font-bold text-[#8e9ca7] mb-1.5 uppercase tracking-wider">
                    Desired Level
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={currentLevel + 1}
                      max={99}
                      value={desiredLevel}
                      onChange={(e) => handleDesiredLevelChange(Number(e.target.value))}
                      className="w-full rounded-xl border border-[#1e2633] bg-[#0d121c] px-4 py-2.5 text-base font-bold text-white transition-colors focus:border-[#d6a43a] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Training Method */}
                <div>
                  <label className="block text-xs font-bold text-[#8e9ca7] mb-1.5 uppercase tracking-wider">
                    Training Method
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMethodId}
                      onChange={(e) => setSelectedMethodId(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#1e2633] bg-[#0d121c] px-4 py-2.5 pr-10 text-xs sm:text-sm font-semibold text-white transition-colors focus:border-[#d6a43a] focus:outline-none cursor-pointer"
                    >
                      {TRAINING_METHODS.map((m) => (
                        <option key={m.id} value={m.id} className="bg-[#0d121c] text-white">
                          {m.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8e9ca7]" />
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart Button */}
              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#1e2633]">
                {/* Total Price Display */}
                <div className="text-left sm:text-right">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8e9ca7]">
                    Total Price
                  </div>
                  <div className="font-[family-name:var(--font-eb-garamond)] text-3xl sm:text-4xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_2px_12px_rgba(214,164,58,0.5)]">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>

                {/* Golden ADD TO CART Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  id="skilling-add-to-cart-btn"
                  aria-label="Add Skilling Service to Cart"
                  className="group relative flex h-12 min-w-[170px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] px-6 font-bold tracking-wider text-white shadow-[0_6px_22px_rgba(214,147,32,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-200 active:scale-[0.98] hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] hover:shadow-[0_8px_28px_rgba(214,147,32,0.6)]"
                >
                  {addedToast ? (
                    <>
                      <Check className="size-5 text-white" />
                      <span>ADDED!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="size-5 text-white" />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
