"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Check, X, Shield, Sparkles, ArrowRight } from "lucide-react";
import questsData from "../data.json";
import { QuestItem } from "../types";
import { useCartStore } from "@/store/cart.store";

const CATEGORIES = ["All", "Free to Play", "Members", "Miniquests"] as const;

const QUESTING_FEATURES = [
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
    title: "Experienced Questers",
    description:
      "Your quests are completed by players familiar with OSRS quest requirements, puzzles, bosses & routes.",
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
        <path d="M12 2.5v19.5" />
      </svg>
    ),
    title: "100% Manual Questing",
    description:
      "Every quest is completed manually. No bots, macros, or automated scripts.",
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="8" y1="9" x2="10" y2="9" />
      </svg>
    ),
    title: "Requirements Checked",
    description:
      "We check the selected quest requirements before starting and confirm if anything is needed.",
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
      "Track the progress of your quest order and receive confirmation when all quests are done.",
  },
];

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
        {/* Smooth bottom fade into questing content */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03060a] via-[#03060a]/60 to-transparent" />
      </div>

      {/* Decorative Golden Light Beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.2),transparent_70%)] blur-3xl" />

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

        {/* Trust & Guarantee Cards matching Screenshot */}
        <div className="mb-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:mb-12">
          {QUESTING_FEATURES.map((feature) => (
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
