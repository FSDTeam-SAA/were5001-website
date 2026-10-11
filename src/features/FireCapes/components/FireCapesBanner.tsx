"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Swords,
  Crown,
  Lock,
  ChevronDown,
  ShoppingCart,
  Check,
  Search,
  X,
  Flame,
  MessageSquare,
  Shield,
} from "lucide-react";
import { FIRE_CAPE_SERVICES } from "../constants";
import { CapeServiceItem } from "../types";
import { useCartStore } from "@/store/cart.store";

const FIRE_CAPE_FEATURES = [
  {
    icon: <Swords className="size-5 text-[#f5ba42] drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]" />,
    title: "Fire Cape Specialists",
    description:
      "Our expert OsRS runners, developed by experienced PvP players, complete 100% of Fire Caves for you. Jad and all account builds are supported",
  },
  {
    icon: <Crown className="size-5 text-[#f5ba42] drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]" />,
    title: "Completed Manually",
    description:
      "The entire Fight Caves run is played manually by highly trained experienced software.",
  },
  {
    icon: <Lock className="size-5 text-[#f5ba42] drop-shadow-[0_0_6px_rgba(245,186,66,0.35)]" />,
    title: "Limited Account Access",
    description:
      "We only need your login details when required to complete your order. Temporary password recommended.",
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
        <circle cx="9" cy="11" r="1" fill="#f5ba42" />
        <circle cx="12" cy="11" r="1" fill="#f5ba42" />
        <circle cx="15" cy="11" r="1" fill="#f5ba42" />
      </svg>
    ),
    title: "Order Updates",
    description:
      "Our team keeps you informed from the start of your service until your Fire Cape is complete",
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ironman", label: "Ironman" },
  { id: "no_prayer", label: "No Prayer" },
];

export default function FireCapesBanner() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Selected tier for each service card
  const [selectedTiers, setSelectedTiers] = useState<Record<string, string>>({
    pures: "40-46",
    zerks: "40-46",
    mains: "40-46",
    ironman: "90-99",
    "no-prayer": "90-99",
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const addItem = useCartStore((state) => state.addItem);

  const handleTierChange = (serviceId: string, tierValue: string) => {
    setSelectedTiers((prev) => ({ ...prev, [serviceId]: tierValue }));
  };

  const filteredServices = useMemo(() => {
    return FIRE_CAPE_SERVICES.filter((service) => {
      const matchesCat =
        selectedCategory === "all" ||
        (selectedCategory === "ironman" && service.category === "ironman") ||
        (selectedCategory === "no_prayer" && service.category === "no_prayer");

      const matchesSearch =
        !searchQuery.trim() ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (service: CapeServiceItem) => {
    const tierVal = selectedTiers[service.id] || service.tiers[0].value;
    const tierObj = service.tiers.find((t) => t.value === tierVal) || service.tiers[0];
    const price = tierObj.price ?? 50.0; // fallback if custom quote

    addItem({
      id: `firecape-${service.id}-${tierObj.value}`,
      name: `${service.name} (${tierObj.label})`,
      price: price,
      image: service.image,
      inStock: true,
      category: "OSRS Fire Cape Service",
    });

    setAddedIds((prev) => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [service.id]: false }));
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-32">
      {/* 1. Theme Background Artwork (fire-caps-image.png) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] sm:h-[720px] md:h-[820px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/assets/fire-caps-image.png')" }}
        />
        {/* Very light darkening to keep contrast without obscuring the TzTok-Jad art */}
        <div className="absolute inset-0 bg-[#03060a]/15" />
        {/* Soft Navbar blend */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#03060a]/80 to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_50%_30%,transparent_55%,rgba(3,6,10,0.4)_100%)]" />
        {/* Smooth bottom fade into fire cape services */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03060a] via-[#03060a]/60 to-transparent" />
      </div>

      {/* Decorative Fiery Golden Light Beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,87,34,0.18),transparent_70%)] blur-3xl" />

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
              BUY OSRS FIRE CAPE
            </span>{" "}
            <span className="text-[#f1f5f9] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
              SERVICE
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base font-medium text-[#8e9ca7]">
            Guaranteed Jad defeat • Hand-done by veteran capers • Fastest delivery times.
          </p>
        </div>

        {/* Trust & Guarantee Cards matching Screenshot */}
        <div className="mb-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:mb-12">
          {FIRE_CAPE_FEATURES.map((feature) => (
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
          {/* Filter Tabs: All, Ironman, No Prayer */}
          <div className="inline-flex rounded-xl border border-[#23201d] bg-[#090d14]/90 p-1 backdrop-blur-md">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-lg px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "border border-[#d6a43a] bg-[#1a140a] text-[#ffda5d] shadow-[0_0_12px_rgba(214,164,58,0.25)]"
                      : "text-[#8e9ca7] hover:bg-[#141822] hover:text-white"
                  }`}
                >
                  {cat.label}
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
              placeholder="Skill / Build name..."
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

        {/* Fire Cape Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredServices.map((service) => {
            const currentTierVal = selectedTiers[service.id] || service.tiers[0].value;
            const currentTier = service.tiers.find((t) => t.value === currentTierVal) || service.tiers[0];
            const isAdded = !!addedIds[service.id];

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-xl border border-[#23201d]/90 bg-[#0c0e14]/95 p-4.5 shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-200 hover:border-[#d6a43a]/60 hover:shadow-[0_12px_32px_rgba(255,87,34,0.15)] overflow-hidden"
              >
                {/* Molten Lava / Flame Ambient Glow Behind Cape */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(255,87,34,0.35)_0%,rgba(214,164,58,0.12)_45%,transparent_75%)] opacity-85 group-hover:opacity-100 transition-opacity" />

                {/* Cape Visual Area */}
                <div className="relative flex h-40 w-full items-center justify-center">
                  <div className="relative flex size-32 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={90}
                      height={120}
                      className="h-28 w-auto object-contain drop-shadow-[0_4px_16px_rgba(255,100,0,0.7)]"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Title & Price Header */}
                <div className="relative mt-2 flex items-baseline justify-between gap-2 border-t border-[#1e1914] pt-3">
                  <h3 className="font-[family-name:var(--font-eb-garamond)] text-base sm:text-[17px] font-bold tracking-wide text-[#e6edf2] transition-colors group-hover:text-[#ffda5d] truncate">
                    {service.name}
                  </h3>

                  <div className="font-[family-name:var(--font-eb-garamond)] text-base sm:text-lg font-bold text-[#ffda5d] drop-shadow-[0_1px_6px_rgba(214,164,58,0.4)] shrink-0">
                    {currentTier.price !== null ? (
                      `$${currentTier.price.toFixed(2)}`
                    ) : (
                      <span className="text-xs uppercase text-[#ffd700]">CUSTOM</span>
                    )}
                  </div>
                </div>

                {/* Tier Selector & ADD TO CART Button Row (Matching Screenshot) */}
                <div className="relative mt-3.5 flex items-center gap-2">
                  {/* Select Dropdown */}
                  <div className="relative flex-1">
                    <select
                      value={currentTierVal}
                      onChange={(e) => handleTierChange(service.id, e.target.value)}
                      className="w-full appearance-none rounded-lg border border-[#2b241d] bg-[#14120e] px-3 py-2 pr-7 text-xs font-semibold text-[#cbd6dc] transition-colors focus:border-[#d6a43a] focus:outline-none cursor-pointer"
                    >
                      {service.tiers.map((tier) => (
                        <option key={tier.value} value={tier.value} className="bg-[#14120e] text-white">
                          {tier.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-[#8e9ca7]" />
                  </div>

                  {/* Add to Cart or Livechat CTA Button */}
                  {service.isCustomQuote ? (
                    <Link
                      href="/contact"
                      className="flex h-8.5 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] px-3 text-xs font-bold tracking-wider text-white shadow-md transition-all active:scale-95 hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)]"
                    >
                      ADD TO CART
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddToCart(service)}
                      aria-label={`Add ${service.name} to cart`}
                      className={`flex h-8.5 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-bold tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-md ${
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
