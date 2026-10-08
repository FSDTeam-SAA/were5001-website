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
    <section className="relative overflow-hidden bg-[#03060a] pt-10 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-28">
      {/* 1. Background image matching theme */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/assets/SELL-OSRS-GOLD.png')" }}
      />

      {/* Atmospheric dark gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_20%,rgba(18,14,10,0.55),rgba(3,6,10,0.92)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,10,0.72)_0%,rgba(3,6,10,0.85)_50%,#020609_100%)]" />

      {/* Subtle top golden light beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[880px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.22),transparent_70%)] blur-3xl" />

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
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "OSRS"
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
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "RS3"
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
                  className={`size-3.5 text-[#8e9ca7] transition-transform duration-200 ${
                    sortDropdownOpen ? "rotate-180 text-[#ffda5d]" : ""
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
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                        sortBy === key
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
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#271f14] bg-[linear-gradient(180deg,rgba(16,15,13,0.95),rgba(8,9,11,0.98))] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-all duration-300 hover:border-[#d6a43a]/60 hover:shadow-[0_16px_40px_rgba(214,164,58,0.22)] hover:scale-[1.015]"
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
                className={`grid size-9 place-items-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
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
