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

const ADVANTAGE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f5ba42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-8 drop-shadow-[0_0_8px_rgba(245,186,66,0.6)]">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
    title: "Fast Delivery",
    description: "Delivery in 2-20 minutes so you can get back to the game.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f5ba42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-8 drop-shadow-[0_0_8px_rgba(245,186,66,0.6)]">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        <path d="M19 16c0 2-1 4-4 4" />
      </svg>
    ),
    title: "Instant Replies 24/7",
    description: "Get instant replies in under 1 minute whenever you need us by experienced English speakers.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f5ba42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-8 drop-shadow-[0_0_8px_rgba(245,186,66,0.6)]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Buy Gold Instantly – No ID. No Sign-Up.",
    description: "Skip the registration forms and verification process. With SECNX, you can place your order in minutes without creating an account or submitting ID, then collect your gold as soon as your order is ready.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f5ba42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-8 drop-shadow-[0_0_8px_rgba(245,186,66,0.6)]">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
        <line x1="6" x2="10" y1="14" y2="14" />
        <line x1="12" x2="14" y1="14" y2="14" />
      </svg>
    ),
    title: "Many Payment Methods",
    description: "Choose from many payment methods that suit you.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f5ba42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-8 drop-shadow-[0_0_8px_rgba(245,186,66,0.6)]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <rect x="9.5" y="11" width="5" height="4" rx="0.8" />
        <path d="M10.5 11V9.5a1.5 1.5 0 0 1 3 0V11" />
      </svg>
    ),
    title: "Safe & Secure",
    description: "Every delivery is handled with account safety in mind, using careful and established in-game trading methods.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f5ba42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-8 drop-shadow-[0_0_8px_rgba(245,186,66,0.6)]">
        {/* Top group: 3 people avatars */}
        <circle cx="12" cy="5.5" r="2" />
        <path d="M8.5 11c0-1.8 1.5-2.8 3.5-2.8s3.5 1 3.5 2.8" />
        <circle cx="6.5" cy="7" r="1.5" />
        <path d="M4 11.5c0-1.2 1-2 2.5-2 .5 0 .9.1 1.3.4" />
        <circle cx="17.5" cy="7" r="1.5" />
        <path d="M20 11.5c0-1.2-1-2-2.5-2-.5 0-.9.1-1.3.4" />
        {/* Bottom chest/stock */}
        <rect x="5" y="13.5" width="14" height="7.5" rx="1.5" />
        <line x1="5" x2="19" y1="17" y2="17" />
        <circle cx="12" cy="17" r="1" fill="#f5ba42" />
      </svg>
    ),
    title: "Large Stock Available",
    description: "Extensive stock ready for fast delivery.",
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

          {/* 6 Advantage Cards Grid matching screenshot */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-3.5">
            {ADVANTAGE_CARDS.map((card) => (
              <div
                key={card.title}
                className="group flex flex-col items-center rounded-2xl border border-[#f5ba42]/50 bg-[#070e16]/92 p-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-[#f5ba42] hover:shadow-[0_0_20px_rgba(245,186,66,0.3)] hover:-translate-y-0.5"
              >
                <div className="mb-3 grid size-12 place-items-center">
                  {card.icon}
                </div>
                <h3 className="text-[13px] font-bold leading-snug text-[#ffda5d] sm:text-[14px]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[#94a3b8] sm:text-xs">
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
