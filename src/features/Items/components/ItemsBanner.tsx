"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Swords,
  Sparkles,
  Search,
  ChevronDown,
  Crown,
  Minus,
  Plus,
  ArrowRight,
  ArrowUpDown,
  Check,
  ShoppingCart,
} from "lucide-react";
import { GameCategory, GameItem } from "../types";
import { OSRS_ITEMS, RS3_ITEMS } from "../data/itemsData";
import { useCartStore } from "@/store/cart.store";

function IconContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid size-12 sm:size-14 place-items-center rounded-2xl border border-[#d6a43a]/70 bg-[linear-gradient(180deg,rgba(214,164,58,0.18),rgba(214,164,58,0.03))] text-[#ffd75a] shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_20px_rgba(214,164,58,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300">
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="size-7 sm:size-8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      >
        {children}
      </svg>
    </div>
  );
}

const ADVANTAGE_CARDS = [
  {
    icon: (
      <IconContainer>
        <circle cx="32" cy="33" r="21" />
        <path d="M32 18v3m0 24v3M17 33h3m24 0h3M32 33l8 5m-8-5V24" />
        <path d="M26 9h12" />
      </IconContainer>
    ),
    title: "Fast Delivery",
    description: "Delivery in 2-20 minutes so you can get back to the game immediately.",
  },
  {
    icon: (
      <IconContainer>
        <path d="M11 31a21 21 0 0 1 42 0" />
        <path d="M14 32v10a4 4 0 0 0 8 0V32a4 4 0 0 0-8 0Zm28 0v10a4 4 0 0 0 8 0V32a4 4 0 0 0-8 0Z" />
        <path d="M50 42c0 7-5 10-10 10" />
      </IconContainer>
    ),
    title: "Instant Replies 24/7",
    description: "Replies in under 1 minute whenever you need us, staffed by experienced English speakers.",
  },
  {
    icon: (
      <IconContainer>
        <path d="M32 9c7 5 13 6 19 6v14c0 12-8 21-19 26-11-5-19-14-19-26V15c6 0 12-1 19-6Z" />
        <path d="m24 31 5 5 11-12" />
      </IconContainer>
    ),
    title: "Buy Items Instantly – No ID. No Sign-Up.",
    description: "Skip the registration forms and verification process. With SECNX, you can place your order in minutes without creating an account or submitting ID, then collect your item as soon as your order is ready.",
  },
  {
    icon: (
      <IconContainer>
        <rect x="7" y="14" width="50" height="36" rx="5" />
        <path d="M7 25h50M18 39h4m7 0h4m7 0h4" />
      </IconContainer>
    ),
    title: "Many Payment Methods",
    description: "Choose from a wide variety of secure global and local payment methods that work for you.",
  },
  {
    icon: (
      <IconContainer>
        <path d="M32 9 11 18v14c0 12 9 18 21 22 12-4 21-10 21-22V18L32 9Z" />
        <rect x="24" y="31" width="16" height="14" rx="2" />
        <path d="M28 31v-4a4 4 0 0 1 8 0v4m-4 5v3" />
      </IconContainer>
    ),
    title: "Safe & Secure",
    description: "Carefully sourced items for safer trades, zero hassle, and complete peace of mind.",
  },
  {
    icon: (
      <IconContainer>
        <circle cx="21" cy="23" r="5" fill="currentColor" stroke="none" />
        <circle cx="32" cy="18" r="6" fill="currentColor" stroke="none" />
        <circle cx="43" cy="23" r="5" fill="currentColor" stroke="none" />
        <path
          d="M12 43c0-7 5-11 11-11 4 0 6 2 9 4 3-2 5-4 9-4 6 0 11 4 11 11"
          fill="currentColor"
          stroke="none"
        />
        <path d="M11 44h42v7H11z" />
        <path d="M20 44v7m24-7v7" />
      </IconContainer>
    ),
    title: "Large Stock Available",
    description: "Extensive reserves ready around the clock for instant fulfillment on any size order.",
  },
];

export default function ItemsBanner() {
  const [activeTab, setActiveTab] = useState<GameCategory>("OSRS");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "name">("popular");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const rawItems = activeTab === "OSRS" ? OSRS_ITEMS : RS3_ITEMS;

  // Filter & Sort
  const filteredItems = useMemo(() => {
    let items = [...rawItems];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((item) => item.name.toLowerCase().includes(q));
    }

    if (sortBy === "popular") {
      items.sort((a, b) => a.popularRank - b.popularRank);
    } else if (sortBy === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [rawItems, searchQuery, sortBy]);

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] ?? 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const handleAddToCart = (item: GameItem) => {
    const qty = quantities[item.id] ?? 1;
    useCartStore.getState().addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        inStock: item.inStock,
        category: item.game,
      },
      qty
    );
    setToastMessage(`Added ${qty}x ${item.name} to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const sortLabels = {
    popular: "Sort: Popular",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    name: "Name: A to Z",
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-8 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-12 sm:pb-28">
      {/* 1. Hero Banner Castle Artwork (item-image-4.png) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] sm:h-[600px] md:h-[680px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/assets/item-image-4.png')" }}
        />
        {/* Subtle Darkening Layer for text readability */}
        <div className="absolute inset-0 bg-[#03060a]/35" />
        {/* Top Fade from Navbar */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#03060a] to-transparent opacity-85" />
        {/* Left & Right Atmospheric Torch Glows matching the torches in item-image-4.png */}
        <div className="absolute top-1/4 -left-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,186,66,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/4 -right-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,186,66,0.18)_0%,transparent_70%)] blur-3xl" />
        {/* Center Vignette focusing the title */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_35%,transparent_25%,rgba(3,6,10,0.85)_100%)]" />
        {/* Seamless Bottom Fade into Items Table */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#03060a] via-[#03060a]/80 to-transparent" />
      </div>

      {/* Subtle top golden light beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.22),transparent_70%)] blur-3xl" />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed top-24 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#d6a43a]/70 bg-[#0d1017]/95 px-5 py-3 text-sm font-bold text-[#ffda5d] shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(214,164,58,0.4)] backdrop-blur-xl animate-in fade-in slide-in-from-top-4"
        >
          <ShoppingCart className="size-4 text-[#ffda5d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. Top Section Header (Crown, SECNX, Title, Subtitle)      */}
        {/* ========================================================= */}
        <header className="mb-10 pt-2 text-center sm:mb-12 sm:pt-3">
          {/* Top Emblem: Golden Crown + SECNX with flanking horizontal gold lines */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/assets/crown-icon.png"
              alt="Crown"
              width={36}
              height={22}
              className="h-5 w-auto object-contain drop-shadow-[0_2px_8px_rgba(245,186,66,0.6)] mb-1 sm:h-6"
            />
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#d6a43a]/70 to-[#d6a43a] sm:w-24" />
              <Image
                src="/assets/site-logo.svg"
                alt="SECNX"
                width={86}
                height={32}
                priority
                className="h-6 w-auto object-contain drop-shadow-[0_2px_10px_rgba(214,164,58,0.6)] sm:h-7"
              />
              <span className="h-px w-14 bg-gradient-to-l from-transparent via-[#d6a43a]/70 to-[#d6a43a] sm:w-24" />
            </div>
          </div>

          {/* Main Title: Orbitron bold chamfered font with golden gradient fill */}
          <h1 className="mt-4 font-[family-name:var(--font-orbitron),sans-serif] text-2xl font-black uppercase tracking-wider bg-gradient-to-b from-[#ffea9f] via-[#f5ba42] to-[#b87814] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] sm:text-4xl md:text-5xl lg:text-[50px] leading-tight">
            OSRS &amp; RS3 ITEMS MARKETPLACE
          </h1>

          {/* Subtitle with gold bullet dots */}
          <p className="mt-3 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-[#f1f5f9] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-base">
            <span>Fast delivery</span>
            <span className="text-[#f5ba42]">•</span>
            <span>Competitive prices</span>
            <span className="text-[#f5ba42]">•</span>
            <span>24/7 support</span>
          </p>

          {/* Divider: TRUSTED BY THOUSANDS OF PLAYERS flanked by lines */}
          <div className="my-7 flex items-center justify-center gap-3 sm:my-8 sm:gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#d6a43a]/60 to-[#d6a43a] sm:w-28" />
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#d6a43a] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] sm:text-xs">
              TRUSTED BY THOUSANDS OF PLAYERS
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-[#d6a43a]/60 to-[#d6a43a] sm:w-28" />
          </div>

          {/* 6 Advantage Cards Grid matching homepage design */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
            {ADVANTAGE_CARDS.map((card) => (
              <div
                key={card.title}
                className="group relative flex flex-col items-center rounded-2xl border border-[#d6a43a]/55 bg-[linear-gradient(160deg,rgba(18,29,38,0.85),rgba(7,15,21,0.95))] p-4 text-center shadow-[0_16px_36px_-12px_rgba(0,0,0,0.9),0_0_24px_-6px_rgba(214,164,58,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a43a]/80 hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.95),0_0_32px_-6px_rgba(214,164,58,0.38)]"
              >
                {/* Subtle gold top line accent */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d6a43a]/70 to-transparent opacity-100" />

                <div className="mb-4 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-[13px] font-bold leading-snug text-[#ffdf70] sm:text-[14px]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[#b5c4ce] sm:text-xs">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* ========================================================= */}
        {/* Top Control Bar: Tabs (Left), Search (Mid), Sort (Right)   */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: OSRS / RS3 Toggle Tabs */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#2a2216]/80 bg-[#070b0f]/90 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md">
            {/* OSRS ITEMS Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("OSRS");
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer ${activeTab === "OSRS"
                ? "border border-[#d6a43a] bg-[linear-gradient(180deg,#2b200e_0%,#161208_100%)] text-[#ffda5d] shadow-[0_0_16px_rgba(214,164,58,0.35)]"
                : "border border-transparent text-[#8e9ca7] hover:bg-[#141822]/60 hover:text-white"
                }`}
            >
              <Swords className="size-4 shrink-0 text-[#ffda5d]" />
              <span>OSRS ITEMS</span>
            </button>

            {/* RS3 ITEMS Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("RS3");
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer ${activeTab === "RS3"
                ? "border border-[#d6a43a] bg-[linear-gradient(180deg,#2b200e_0%,#161208_100%)] text-[#ffda5d] shadow-[0_0_16px_rgba(214,164,58,0.35)]"
                : "border border-transparent text-[#8e9ca7] hover:bg-[#141822]/60 hover:text-white"
                }`}
            >
              <Sparkles className="size-4 shrink-0 text-[#ffda5d]" />
              <span>RS3 ITEMS</span>
            </button>
          </div>

          {/* Middle & Right: Search Input + Sort Dropdown */}
          <div className="flex flex-1 items-center gap-3 lg:max-w-[620px] lg:justify-end">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="flex h-11 items-center rounded-xl border border-[#282116] bg-[#070b0f]/90 px-3.5 shadow-inner transition-colors focus-within:border-[#d6a43a] focus-within:ring-2 focus-within:ring-[#d6a43a]/20">
                <Search className="size-4 shrink-0 text-[#72808e]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search Items..."
                  className="w-full min-w-0 bg-transparent pl-2.5 text-sm font-medium text-white placeholder-[#5d6b79] outline-none"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSortDropdownOpen((prev) => !prev)}
                className="flex h-11 items-center gap-2 rounded-xl border border-[#282116] bg-[#070b0f]/90 px-3.5 text-xs sm:text-sm font-semibold text-[#8e9ca7] shadow-inner transition-colors hover:border-[#d6a43a]/60 hover:text-white cursor-pointer"
                aria-expanded={sortDropdownOpen}
              >
                <ArrowUpDown className="size-3.5 text-[#ffda5d]" />
                <span>{sortLabels[sortBy]}</span>
                <ChevronDown
                  className={`size-3.5 text-[#8e9ca7] transition-transform duration-200 ${sortDropdownOpen ? "rotate-180 text-[#ffda5d]" : ""
                    }`}
                />
              </button>

              {sortDropdownOpen && (
                <div className="absolute top-full right-0 z-30 mt-1.5 w-48 overflow-hidden rounded-xl border border-[#3d2c16] bg-[#0d1017] p-1.5 shadow-2xl backdrop-blur-xl">
                  {(
                    Object.keys(sortLabels) as Array<
                      "popular" | "price-asc" | "price-desc" | "name"
                    >
                  ).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSortBy(key);
                        setSortDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${sortBy === key
                        ? "bg-[#d6a43a]/20 text-[#ffda5d]"
                        : "text-[#8e9ca7] hover:bg-[#141822] hover:text-white"
                        }`}
                    >
                      <span>{sortLabels[key]}</span>
                      {sortBy === key && <Check className="size-3.5 text-[#ffda5d]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Main Grid: 4 Columns x 3 Rows = 12 Cards                   */}
        {/* ========================================================= */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
          {filteredItems.map((item) => {
            const currentQty = quantities[item.id] ?? 1;
            const sellHref = activeTab === "OSRS" ? "/sell/osrs" : "/sell/rs3";

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d6a43a]/40 bg-[linear-gradient(180deg,rgba(16,15,13,0.95),rgba(8,9,11,0.98))] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-all duration-300 hover:border-[#d6a43a] hover:shadow-[0_16px_40px_rgba(214,164,58,0.25)] hover:scale-[1.015]"
              >
                {/* Top-Left In Stock Badge */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-950/75 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-400 backdrop-blur-md">
                  <span className="text-[10px] text-emerald-400">★</span>
                  <span>In Stock</span>
                </div>

                {/* Item Image Art with Dark Vignette Atmosphere */}
                <div className="relative mx-auto mt-5 mb-2 flex h-32 w-full items-center justify-center overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={220}
                    height={120}
                    className="max-h-28 w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-108"
                  />
                </div>

                {/* Item Title & Price */}
                <div className="text-center">
                  <h3 className="font-[family-name:var(--font-eb-garamond)] text-lg font-bold tracking-wide text-[#e8eff4] transition-colors group-hover:text-white">
                    {item.name}
                  </h3>
                  <div className="font-[family-name:var(--font-eb-garamond)] mt-1 text-2xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_1px_6px_rgba(214,164,58,0.45)]">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Actions: Quantity Controller + ADD TO CART Button */}
                <div className="mt-4 flex items-center gap-2">
                  {/* Quantity Controller */}
                  <div className="flex h-10 items-center rounded-xl border border-[#312517] bg-[#070a0e] px-1.5 shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="grid size-7 place-items-center rounded-lg text-[#8e9ca7] transition-colors hover:bg-[#d6a43a]/15 hover:text-white cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-xs font-bold text-white sm:text-sm">
                      {currentQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="grid size-7 place-items-center rounded-lg text-[#8e9ca7] transition-colors hover:bg-[#d6a43a]/15 hover:text-white cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  {/* Golden ADD TO CART Button */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    aria-label={`Add ${item.name} to cart`}
                    className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(180deg,#f3b23e_0%,#e09520_50%,#c77a10_100%)] px-3 text-xs sm:text-[13px] font-black tracking-wider text-[#2a1705] shadow-[0_4px_14px_rgba(214,164,58,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-[0.98] hover:bg-[linear-gradient(180deg,#ffd46e_0%,#f0a72c_50%,#d88b18_100%)] hover:shadow-[0_6px_20px_rgba(214,164,58,0.6)] cursor-pointer"
                  >
                    <Crown className="size-3.5 fill-[#2a1705] text-[#2a1705]" strokeWidth={2.4} />
                    <span>ADD TO CART</span>
                  </button>
                </div>

                {/* Card Footer: Sell to us link */}
                <div className="mt-3.5 border-t border-[#221b13]/80 pt-2.5 text-center">
                  <Link
                    href={sellHref}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8b97a2] transition-colors hover:text-[#ffda5d]"
                  >
                    <span>Sell to us</span>
                    <ArrowRight className="size-3 text-[#ffda5d]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* Bottom Pagination: < 1 2 3 4 5 >                          */}
        {/* ========================================================= */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="grid size-9 place-items-center rounded-lg border border-[#271f14] bg-[#0c1015] text-xs font-bold text-[#8e9ca7] transition-all hover:border-[#d6a43a]/60 hover:text-white cursor-pointer"
            aria-label="Previous page"
          >
            &lt;
          </button>

          {/* Page numbers: 1 2 3 4 5 */}
          {[1, 2, 3, 4, 5].map((pageNum) => {
            const isActive = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`grid size-9 place-items-center rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive
                  ? "border border-[#d6a43a] bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-yellow-950 shadow-[0_0_12px_rgba(214,164,58,0.6)]"
                  : "border border-[#271f14] bg-[#0c1015] text-[#8e9ca7] hover:border-[#d6a43a]/50 hover:text-white"
                  }`}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            className="grid size-9 place-items-center rounded-lg border border-[#271f14] bg-[#0c1015] text-xs font-bold text-[#8e9ca7] transition-all hover:border-[#d6a43a]/60 hover:text-white cursor-pointer"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
