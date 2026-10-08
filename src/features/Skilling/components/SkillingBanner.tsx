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
  ArrowRight,
  Gem,
} from "lucide-react";
import {
  SKILLING_STEPS,
  ACCOUNT_PRESETS,
  OSRS_SKILLS,
  TRAINING_METHODS,
  getXpForLevel,
} from "../constants";
import { useCartStore } from "@/store/cart.store";

export default function SkillingBanner() {
  const [selectedPreset, setSelectedPreset] = useState("main");
  const [osrsName, setOsrsName] = useState("");
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
      {/* 1. Theme Background Artwork */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: "url('/assets/SELL-OSRS-GOLD.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(3,6,10,0.5)_20%,rgba(3,6,10,0.85)_70%,#03060a_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#d6a43a]/10 blur-[130px]" />

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

        {/* 4-Step Process Tutorial Section (From User Request & Client Reference) */}
        <div className="mb-10 rounded-2xl border border-[#261f18] bg-[#0a0d14]/90 p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {SKILLING_STEPS.map((step, idx) => (
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

        {/* STEP 1: ACCOUNT PRESET & OSRS NAME */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#d6a43a]">1.</span> ENTER YOUR OSRS NAME TO OBTAIN YOUR SKILLS FROM THE HISCORES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {ACCOUNT_PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`group relative flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#d6a43a] bg-[#161309]/90 shadow-[0_0_20px_rgba(214,164,58,0.25)] ring-1 ring-[#d6a43a]"
                      : "border-[#1e2633] bg-[#090d14]/85 hover:border-[#d6a43a]/50 hover:bg-[#0f1420]"
                  }`}
                >
                  {/* Custom Radio Circle */}
                  <div
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-[#d6a43a] bg-[#d6a43a]"
                        : "border-[#4a5568] bg-[#090d14] group-hover:border-[#d6a43a]/60"
                    }`}
                  >
                    {isSelected && <div className="size-2 rounded-full bg-[#03060a]" />}
                  </div>

                  {/* Preset Badge Icon */}
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#1a2333]/70 text-[#ffda5d]">
                    {preset.id === "main" && <Shield className="size-4 text-[#ffd700]" />}
                    {preset.id === "zerker" && <Swords className="size-4 text-[#e5a93c]" />}
                    {preset.id === "pure" && <Zap className="size-4 text-[#00e676]" />}
                  </div>

                  {/* Preset Text */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold tracking-wide text-white">
                      {preset.name}
                    </div>
                    <div className="text-xs text-[#8e9ca7] font-medium truncate">
                      {preset.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: SELECT DESIRED SKILL TO BOOST */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#d6a43a]">2.</span> SELECT DESIRED SKILL TO BOOST
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

        {/* STEP 3: ENTER YOUR DESIRED LEVELS */}
        <div>
          <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#cbd6dc] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#d6a43a]">3.</span> ENTER YOUR DESIRED LEVELS
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
