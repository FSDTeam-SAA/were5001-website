"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Check, X, Shield, Sparkles, Gem, ArrowRight } from "lucide-react";
import questsData from "../data.json";
import { QuestItem } from "../types";
import { QUEST_STEPS } from "../constants";
import { useCartStore } from "@/store/cart.store";

const CATEGORIES = ["All", "Free to Play", "Members", "Miniquests"] as const;

export default function QuestingBanner() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const addItem = useCartStore((state) => state.addItem);

  // Filter quests based on category and search query
  const filteredQuests = useMemo(() => {
    return (questsData as QuestItem[]).filter((quest) => {
      const matchesCategory =
        selectedCategory === "All" || quest.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        quest.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        quest.qp.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (quest: QuestItem) => {
    addItem({
      id: `quest-${quest.id}`,
      name: `${quest.name} | ${quest.qp}`,
      price: quest.price,
      image: "/assets/quests/quest-icon.png",
      inStock: true,
      category: `OSRS ${quest.category}`,
    });

    setAddedIds((prev) => ({ ...prev, [quest.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [quest.id]: false }));
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-32">
      {/* 1. Theme Background Artwork */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/assets/SELL-OSRS-GOLD.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(3,6,10,0.5)_20%,rgba(3,6,10,0.85)_70%,#03060a_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#d6a43a]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
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
              BUY OSRS QUESTING
            </span>{" "}
            <span className="text-[#f1f5f9] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
              SERVICES
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base font-medium text-[#8e9ca7]">
            Fast, 100% hand-completed OSRS quests &amp; miniquests by verified top-tier gamers.
          </p>
        </div>

        {/* 4-Step Process Tutorial Section (From User Request & Client Reference) */}
        <div className="mb-10 rounded-2xl border border-[#261f18] bg-[#0a0d14]/90 p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {QUEST_STEPS.map((step, idx) => (
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

        {/* Top Control Bar: Category Tabs & Search Box (Matching Screenshot) */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="inline-flex rounded-xl border border-[#23201d] bg-[#090d14]/90 p-1 backdrop-blur-md overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "border border-[#d6a43a] bg-[#1a140a] text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.25)]"
                      : "text-[#8e9ca7] hover:bg-[#141822] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box with 'Skill / Quest' placeholder */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Skill / Quest name..."
              className="w-full rounded-xl border border-[#2b241d] bg-[#161310]/90 px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-[#78828c] backdrop-blur-md transition-colors focus:border-[#d6a43a] focus:outline-none"
            />
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8e9ca7]" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e9ca7] hover:text-white cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-5 flex items-center justify-between text-xs font-semibold text-[#8e9ca7]">
          <span>
            Showing <span className="text-[#ffda5d]">{filteredQuests.length}</span> quests
          </span>
          {selectedCategory !== "All" && (
            <span className="text-[#d6a43a]">Category: {selectedCategory}</span>
          )}
        </div>

        {/* 4-Columns Quest Cards Grid matching screenshot */}
        {filteredQuests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredQuests.map((quest) => {
              const isAdded = !!addedIds[quest.id];
              return (
                <div
                  key={quest.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-[#23201d]/90 bg-[#0c0e14]/92 p-4 shadow-[0_6px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-200 hover:border-[#d6a43a]/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.8),0_0_16px_rgba(214,164,58,0.15)]"
                >
                  {/* Subtle Background Vignette / Texture */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,164,58,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Row: Quest Icon & Title */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex size-6 shrink-0 items-center justify-center">
                        <Image
                          src="/assets/quests/quest-icon.png"
                          alt=""
                          width={20}
                          height={20}
                          className="size-5 object-contain drop-shadow-[0_0_6px_rgba(0,180,255,0.4)]"
                          unoptimized
                        />
                      </div>
                      <h3 className="font-[family-name:var(--font-eb-garamond)] text-base font-bold tracking-wide text-[#e6edf2] transition-colors group-hover:text-[#ffda5d] truncate">
                        {quest.name}
                      </h3>
                    </div>

                    {/* Requirements Note (if applicable) */}
                    {quest.requirement && (
                      <p className="mt-1.5 text-[11px] font-medium text-[#7e8b95] line-clamp-1 italic">
                        {quest.requirement}
                      </p>
                    )}
                  </div>

                  {/* Bottom Row: QP, Price & ADD TO CART Button */}
                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#1a1714]">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8e9ca7]">
                        {quest.qp}
                      </div>
                      <div className="font-[family-name:var(--font-eb-garamond)] text-lg font-bold text-[#ffda5d] drop-shadow-[0_1px_6px_rgba(214,164,58,0.4)]">
                        ${quest.price.toFixed(2)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(quest)}
                      aria-label={`Add ${quest.name} to cart`}
                      className={`group/btn relative flex h-9 items-center justify-center gap-1.5 rounded-lg px-3.5 text-xs font-bold tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-md ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] text-white hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] hover:shadow-[0_4px_16px_rgba(214,147,32,0.5)]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="size-3.5 text-white" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <span>ADD TO CART</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#23201d] bg-[#0c0e14]/80 p-12 text-center">
            <Search className="mx-auto size-10 text-[#8e9ca7] opacity-50 mb-3" />
            <h4 className="text-base font-bold text-white">No quests found</h4>
            <p className="text-xs text-[#8e9ca7] mt-1">
              Try adjusting your search query or switching categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-lg border border-[#d6a43a]/50 px-4 py-2 text-xs font-bold text-[#ffda5d] hover:bg-[#d6a43a]/10"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
