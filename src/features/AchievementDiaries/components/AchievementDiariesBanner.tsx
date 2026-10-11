"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Crown,
  ChevronDown,
  ShoppingCart,
  Check,
  Search,
  X,
  Shield,
  Sparkles,
} from "lucide-react";
import { DIARY_ITEMS } from "../constants";
import { DiaryItem, DiaryTier } from "../types";
import { useCartStore } from "@/store/cart.store";

const TIERS: DiaryTier[] = ["Easy", "Medium", "Hard", "Elite"];

const DIARY_FEATURES = [
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Experienced Players",
    description:
      "Our skilled and trusted players complete your diaries safely and efficiently.",
  },
  {
    icon: <Crown className="size-5 text-[#f5ba42] drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]" />,
    title: "100% Manual",
    description:
      "All diaries are completed manually by real players. No bots, no scripts, no risk.",
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
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 8h.01" strokeWidth="2.5" />
        <path d="M7 12h.01" strokeWidth="2.5" />
        <path d="M7 16h.01" strokeWidth="2.5" />
        <path d="M11 8h6" />
        <path d="M11 12h6" />
        <path d="M11 16h6" />
      </svg>
    ),
    title: "Requirements Checked",
    description:
      "We verify all requirements before starting to ensure a smooth completion",
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
      "Receive regular progress updates so you always know the status of your order.",
  },
];

export default function AchievementDiariesBanner() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  // Selected tier per card
  const [cardTiers, setCardTiers] = useState<Record<string, DiaryTier>>({
    ardougne: "Easy",
    desert: "Medium",
    falador: "Easy",
    fremennik: "Medium",
    kandarin: "Easy",
    karamja: "Medium",
    "lumbridge-draynor": "Easy",
    morytania: "Hard",
    varrock: "Medium",
    "western-provinces": "Hard",
    wilderness: "Hard",
    "custom-diaries": "Easy",
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const addItem = useCartStore((state) => state.addItem);

  const handleTierChange = (diaryId: string, tier: DiaryTier) => {
    setCardTiers((prev) => ({ ...prev, [diaryId]: tier }));
  };

  const filteredDiaries = useMemo(() => {
    return DIARY_ITEMS.filter((diary) => {
      const currentTier = cardTiers[diary.id] || diary.defaultTier;
      const matchesFilter =
        selectedFilter === "All" || currentTier === selectedFilter;

      const matchesSearch =
        !searchQuery.trim() ||
        diary.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery, cardTiers]);

  const handleAddToCart = (diary: DiaryItem) => {
    const currentTier = cardTiers[diary.id] || diary.defaultTier;
    const price = diary.prices[currentTier] ?? 12.99;

    addItem({
      id: `diary-${diary.id}-${currentTier.toLowerCase()}`,
      name: `${diary.name} (${currentTier})`,
      price: price,
      image: diary.image,
      inStock: true,
      category: "OSRS Achievement Diary",
    });

    setAddedIds((prev) => ({ ...prev, [diary.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [diary.id]: false }));
    }, 2000);
  };

  const getTierBadgeStyle = (tier: DiaryTier) => {
    switch (tier) {
      case "Easy":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
      case "Medium":
        return "border-amber-500/40 bg-amber-500/10 text-amber-400";
      case "Hard":
        return "border-rose-500/40 bg-rose-500/10 text-rose-400";
      case "Elite":
        return "border-purple-500/40 bg-purple-500/10 text-purple-400";
      default:
        return "border-[#d6a43a]/40 bg-[#d6a43a]/10 text-[#ffda5d]";
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-32">
      {/* 1. Theme Background Artwork (achievement-diary.png) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] sm:h-[720px] md:h-[820px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/assets/ashevement-diary-1.png')" }}
        />
        {/* Very light darkening to keep contrast without obscuring the fantasy kingdom art */}
        <div className="absolute inset-0 bg-[#03060a]/15" />
        {/* Soft Navbar blend */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#03060a]/80 to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_50%_30%,transparent_55%,rgba(3,6,10,0.4)_100%)]" />
        {/* Smooth bottom fade into achievement diary services */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03060a] via-[#03060a]/60 to-transparent" />
      </div>

      {/* Decorative Golden Light Beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.2),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
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
              OSRS ACHIEVEMENT
            </span>{" "}
            <span className="text-[#f1f5f9] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
              DIARY SERVICE
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base font-medium text-[#8e9ca7]">
            Complete all tasks from Easy to Elite • 100% hand-completed by verified pros.
          </p>
        </div>

        {/* Trust & Guarantee Cards matching Screenshot */}
        <div className="mb-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:mb-12">
          {DIARY_FEATURES.map((feature) => (
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

        {/* Top Control Bar: Tier Tabs & Search Box (Matching Screenshot) */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Filter Tabs: All, Easy, Medium, Hard, Elite */}
          <div className="inline-flex rounded-xl border border-[#23201d] bg-[#090d14]/90 p-1 backdrop-blur-md overflow-x-auto">
            {["All", ...TIERS].map((tab) => {
              const isSelected = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedFilter(tab)}
                  className={`rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${isSelected
                      ? "border border-[#d6a43a] bg-[#1a140a] text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.25)]"
                      : "text-[#8e9ca7] hover:bg-[#141822] hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search Box with 'Skill' placeholder (matching screenshot) */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Skill / Diary name..."
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

        {/* 12 Achievement Diary Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredDiaries.map((diary) => {
            const currentTier = cardTiers[diary.id] || diary.defaultTier;
            const price = diary.prices[currentTier] ?? 12.99;
            const isAdded = !!addedIds[diary.id];

            return (
              <div
                key={diary.id}
                className="group relative flex flex-col justify-between rounded-xl border border-[#23201d]/90 bg-[#0c0e14]/95 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-200 hover:border-[#d6a43a]/60 hover:shadow-[0_12px_32px_rgba(214,164,58,0.18)] overflow-hidden"
              >
                {/* Background Fantasy Artwork from downloaded webp */}
                <div
                  className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-300 group-hover:opacity-55"
                  style={{ backgroundImage: `url('${diary.image}')` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,20,0.75)_0%,rgba(12,14,20,0.55)_40%,rgba(12,14,20,0.92)_85%,#0c0e14_100%)]" />

                {/* Top Row: Heraldic Shield Crest */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg border border-[#d6a43a]/40 bg-[#14120c]/85 shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    <Shield className="size-5 text-[#ffda5d]" />
                  </div>

                  {/* Tier Selector Dropdown */}
                  <div className="relative">
                    <select
                      value={currentTier}
                      onChange={(e) =>
                        handleTierChange(diary.id, e.target.value as DiaryTier)
                      }
                      className="appearance-none rounded-lg border border-[#2b241d] bg-[#14120e]/90 px-2.5 py-1 pr-6 text-[11px] font-bold text-white transition-colors focus:border-[#d6a43a] focus:outline-none cursor-pointer"
                    >
                      {TIERS.map((t) => (
                        <option key={t} value={t} className="bg-[#14120e] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 size-3 text-[#8e9ca7]" />
                  </div>
                </div>

                {/* Center Content: Diary Name & Tier Pill */}
                <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center">
                  <h3 className="font-[family-name:var(--font-eb-garamond)] text-base sm:text-lg font-bold tracking-wide text-[#e6edf2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-colors group-hover:text-[#ffda5d]">
                    {diary.name}
                  </h3>

                  {/* Tier Badge Pill matching screenshot */}
                  <div
                    className={`mt-2 rounded-full border px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm ${getTierBadgeStyle(
                      currentTier
                    )}`}
                  >
                    {currentTier}
                  </div>

                  {/* Price Display */}
                  <div className="mt-2 text-xs font-semibold text-[#8e9ca7]">
                    from{" "}
                    <span className="font-[family-name:var(--font-eb-garamond)] text-base font-bold text-[#ffda5d] drop-shadow-[0_1px_6px_rgba(214,164,58,0.4)]">
                      ${price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Golden ADD TO CART Button */}
                <div className="relative z-10 mt-auto pt-1">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(diary)}
                    aria-label={`Add ${diary.name} to cart`}
                    className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg font-bold tracking-wider text-xs sm:text-[13px] transition-all duration-200 active:scale-95 cursor-pointer shadow-md ${isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] text-white hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] hover:shadow-[0_4px_16px_rgba(214,147,32,0.5)]"
                      }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="size-4 text-white" />
                        <span>ADDED TO CART</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="size-4 text-white" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
