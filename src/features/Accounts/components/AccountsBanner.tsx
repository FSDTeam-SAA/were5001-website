"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  Crown,
  ArrowRight,
  ArrowUpDown,
  Check,
  ShoppingCart,
  Swords,
  Sparkles,
  Eye,
  X,
} from "lucide-react";
import { GameAccount, GameCategory, AccountBuildCategory } from "../types";
import { accountsService } from "@/services/accounts.service";
import { useCartStore } from "@/store/cart.store";
import AccountDetailModal from "./AccountDetailModal";

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
    title: "Instant Transfer",
    description: "Account login details and full email access transferred in 2-20 minutes via Live Chat.",
  },
  {
    icon: (
      <IconContainer>
        <path d="M32 9 11 18v14c0 12 9 18 21 22 12-4 21-10 21-22V18L32 9Z" />
        <rect x="24" y="31" width="16" height="14" rx="2" />
        <path d="M28 31v-4a4 4 0 0 1 8 0v4m-4 5v3" />
      </IconContainer>
    ),
    title: "100% Hand-Trained",
    description: "Trained exclusively by vetted human players. Zero bots, zero macros, pristine history.",
  },
  {
    icon: (
      <IconContainer>
        <rect x="7" y="14" width="50" height="36" rx="5" />
        <path d="m10 18 22 18 22-18" />
      </IconContainer>
    ),
    title: "Email Changeable",
    description: "Every account is registered with changeable email so you gain complete permanent ownership.",
  },
  {
    icon: (
      <IconContainer>
        <rect x="7" y="14" width="50" height="36" rx="5" />
        <path d="M7 25h50M18 39h4m7 0h4m7 0h4" />
      </IconContainer>
    ),
    title: "Many Payment Methods",
    description: "Card Pay, PayPal, Crypto, Skrill, Neteller, Interac, and European local bank methods.",
  },
  {
    icon: (
      <IconContainer>
        <path d="M32 9c7 5 13 6 19 6v14c0 12-8 21-19 26-11-5-19-14-19-26V15c6 0 12-1 19-6Z" />
        <path d="m24 31 5 5 11-12" />
      </IconContainer>
    ),
    title: "Lifetime Warranty",
    description: "Backed by SECNX anti-recovery protection with replacement or refund guarantee.",
  },
  {
    icon: (
      <IconContainer>
        <path d="M11 31a21 21 0 0 1 42 0" />
        <path d="M14 32v10a4 4 0 0 0 8 0V32a4 4 0 0 0-8 0Zm28 0v10a4 4 0 0 0 8 0V32a4 4 0 0 0-8 0Z" />
        <path d="M50 42c0 7-5 10-10 10" />
      </IconContainer>
    ),
    title: "24/7 Live Support",
    description: "Real-time assistance via English-speaking live agents for smooth handover anytime.",
  },
];

const CATEGORIES: AccountBuildCategory[] = [
  "All",
  "Maxed Mains",
  "Pures (1 Def)",
  "Zerker / Med",
  "Ironman",
  "Skillers",
  "Starters / Quested",
];

interface AccountsBannerProps {
  initialGame?: GameCategory;
}

export default function AccountsBanner({ initialGame = "OSRS" }: AccountsBannerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<GameCategory>(initialGame);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AccountBuildCategory>("All");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "combat" | "name">("popular");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [accounts, setAccounts] = useState<GameAccount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedModalAccount, setSelectedModalAccount] = useState<GameAccount | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync tab with initialGame prop
  useEffect(() => {
    setActiveTab(initialGame);
  }, [initialGame]);

  // Fetch accounts from service / backend API
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    accountsService
      .getAccounts(activeTab)
      .then((data) => {
        if (isMounted) {
          setAccounts(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const handleTabChange = (game: GameCategory) => {
    setActiveTab(game);
    setCurrentPage(1);
    setSelectedCategory("All");
    if (game === "OSRS") {
      router.push("/accounts/osrs");
    } else {
      router.push("/accounts/rs3");
    }
  };

  // Filter & Sort
  const filteredAccounts = useMemo(() => {
    let list = [...accounts];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (acc) =>
          acc.name.toLowerCase().includes(q) ||
          acc.acc_id.toLowerCase().includes(q) ||
          acc.description.toLowerCase().includes(q) ||
          acc.highlights?.some((h) => h.toLowerCase().includes(q))
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
      list = list.filter((acc) => acc.category === selectedCategory);
    }

    // Min Price Filter
    if (minPrice && !isNaN(Number(minPrice))) {
      list = list.filter((acc) => acc.price >= Number(minPrice));
    }

    // Max Price Filter
    if (maxPrice && !isNaN(Number(maxPrice))) {
      list = list.filter((acc) => acc.price <= Number(maxPrice));
    }

    // Sorting
    if (sortBy === "popular") {
      list.sort((a, b) => a.popularRank - b.popularRank);
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "combat") {
      list.sort((a, b) => (b.combatLevel ?? 0) - (a.combatLevel ?? 0));
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [accounts, searchQuery, selectedCategory, minPrice, maxPrice, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage) || 1;
  const paginatedAccounts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAccounts.slice(start, start + itemsPerPage);
  }, [filteredAccounts, currentPage, itemsPerPage]);

  const handleAddToCart = (account: GameAccount) => {
    useCartStore.getState().addItem(
      {
        id: account.id,
        name: account.name,
        price: account.price,
        image: account.image,
        inStock: account.stock > 0,
        category: `${account.game} Account`,
      },
      1
    );
    setToastMessage(`Added "${account.name}" to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleBuyNow = (account: GameAccount) => {
    handleAddToCart(account);
    router.push("/cart");
  };

  const sortLabels = {
    popular: "Sort: Popular",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    combat: "Combat: High to Low",
    name: "Name: A to Z",
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-8 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-12 sm:pb-28">
      {/* 1. Hero Banner Castle Artwork (item-image-4.png) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] sm:h-[600px] md:h-[680px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/assets/item-image-4.png')" }}
        />
        <div className="absolute inset-0 bg-[#03060a]/40" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#03060a] to-transparent opacity-85" />
        <div className="absolute top-1/4 -left-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,186,66,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/4 -right-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,186,66,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_35%,transparent_25%,rgba(3,6,10,0.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#03060a] via-[#03060a]/80 to-transparent" />
      </div>

      {/* Subtle top golden light beam */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,164,58,0.22),transparent_70%)] blur-3xl" />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed top-24 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#d6a43a]/80 bg-[#0d1017]/95 px-5 py-3 text-sm font-bold text-[#ffda5d] shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(214,164,58,0.4)] backdrop-blur-xl animate-in fade-in slide-in-from-top-4"
        >
          <ShoppingCart className="size-4 text-[#ffda5d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Account Detail Modal */}
      <AccountDetailModal
        account={selectedModalAccount}
        onClose={() => setSelectedModalAccount(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* Top Header: Crown + SECNX Title                           */}
        {/* ========================================================= */}
        <header className="mb-10 pt-2 text-center sm:mb-12 sm:pt-3">
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

          <h1 className="mt-4 font-[family-name:var(--font-orbitron),sans-serif] text-2xl font-black uppercase tracking-wider bg-gradient-to-b from-[#ffea9f] via-[#f5ba42] to-[#b87814] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] sm:text-4xl md:text-5xl lg:text-[50px] leading-tight">
            BUY {activeTab} ACCOUNTS MARKETPLACE
          </h1>

          <p className="mt-3 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-[#f1f5f9] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-base">
            <span>100% Hand-Trained</span>
            <span className="text-[#f5ba42]">•</span>
            <span>Instant Email Ownership Transfer</span>
            <span className="text-[#f5ba42]">•</span>
            <span>Lifetime Warranty</span>
          </p>

          {/* Divider */}
          <div className="my-7 flex items-center justify-center gap-3 sm:my-8 sm:gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#d6a43a]/60 to-[#d6a43a] sm:w-28" />
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#d6a43a] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] sm:text-xs">
              VERIFIED R振りNESCAPE ACCOUNTS FOR SALE
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-[#d6a43a]/60 to-[#d6a43a] sm:w-28" />
          </div>

          {/* 6 Advantage Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
            {ADVANTAGE_CARDS.map((card) => (
              <div
                key={card.title}
                className="group relative flex flex-col items-center rounded-2xl border border-[#d6a43a]/55 bg-[linear-gradient(160deg,rgba(18,29,38,0.85),rgba(7,15,21,0.95))] p-4 text-center shadow-[0_16px_36px_-12px_rgba(0,0,0,0.9),0_0_24px_-6px_rgba(214,164,58,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a43a]/80 hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.95),0_0_32px_-6px_rgba(214,164,58,0.38)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d6a43a]/70 to-transparent opacity-100" />
                <div className="mb-3 flex items-center justify-center">{card.icon}</div>
                <h3 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-[#ffd46e] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-[#94a3af]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* ========================================================= */}
        {/* Game Tab Switcher: OSRS ACCOUNTS vs RS3 ACCOUNTS          */}
        {/* ========================================================= */}
        <div className="mb-8 flex items-center justify-center">
          <div className="inline-flex rounded-2xl border border-[#302417] bg-[#070b0f]/90 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.7)] backdrop-blur-md">
            <button
              type="button"
              onClick={() => handleTabChange("OSRS")}
              className={`flex items-center gap-2.5 rounded-xl px-6 py-2.5 text-xs sm:text-sm font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "OSRS"
                  ? "bg-[linear-gradient(180deg,#f3b23e_0%,#d98e1e_100%)] text-[#231405] shadow-[0_4px_16px_rgba(214,164,58,0.45)]"
                  : "text-[#8e9ca7] hover:text-white"
              }`}
            >
              <Crown className="size-4" />
              <span>OSRS ACCOUNTS</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("RS3")}
              className={`flex items-center gap-2.5 rounded-xl px-6 py-2.5 text-xs sm:text-sm font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "RS3"
                  ? "bg-[linear-gradient(180deg,#f3b23e_0%,#d98e1e_100%)] text-[#231405] shadow-[0_4px_16px_rgba(214,164,58,0.45)]"
                  : "text-[#8e9ca7] hover:text-white"
              }`}
            >
              <Crown className="size-4" />
              <span>RS3 ACCOUNTS</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Category / Build Filter Pills                             */}
        {/* ========================================================= */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#d6a43a] bg-[#d6a43a]/25 text-[#ffd46e] shadow-[0_0_12px_rgba(214,164,58,0.35)]"
                    : "border-[#202e3b] bg-[#091219]/80 text-[#8e9ca7] hover:border-[#d6a43a]/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* Search & Price Filter Controls Bar                        */}
        {/* ========================================================= */}
        <div className="mb-8 rounded-2xl border border-[#2b2217] bg-[#090e14]/95 p-3 sm:p-4 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8e9ca7]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={`Search ${activeTab} accounts by build, stats, cape, or ID...`}
                className="w-full rounded-xl border border-[#23313d] bg-[#05090e] pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder:text-[#6a7a88] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e9ca7] hover:text-white"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Price Range Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center rounded-xl border border-[#23313d] bg-[#05090e] px-3 py-1.5 text-xs">
                <span className="text-[#8e9ca7] mr-1.5">$</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Min"
                  className="w-14 sm:w-16 bg-transparent text-white focus:outline-none"
                />
              </div>
              <span className="text-[#566572]">-</span>
              <div className="flex items-center rounded-xl border border-[#23313d] bg-[#05090e] px-3 py-1.5 text-xs">
                <span className="text-[#8e9ca7] mr-1.5">$</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Max"
                  className="w-14 sm:w-16 bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="relative shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setSortDropdownOpen((prev) => !prev)}
                className="flex w-full md:w-auto h-10 items-center justify-between md:justify-start gap-2 rounded-xl border border-[#23313d] bg-[#05090e] px-3.5 text-xs sm:text-sm font-semibold text-[#8e9ca7] hover:border-[#d6a43a]/60 hover:text-white cursor-pointer"
                aria-expanded={sortDropdownOpen}
              >
                <ArrowUpDown className="size-3.5 text-[#ffda5d]" />
                <span>{sortLabels[sortBy]}</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    sortDropdownOpen ? "rotate-180 text-[#ffda5d]" : ""
                  }`}
                />
              </button>

              {sortDropdownOpen && (
                <div className="absolute top-full right-0 z-30 mt-1.5 w-52 overflow-hidden rounded-xl border border-[#3d2c16] bg-[#0d1017] p-1.5 shadow-2xl backdrop-blur-xl">
                  {(
                    Object.keys(sortLabels) as Array<
                      "popular" | "price-asc" | "price-desc" | "combat" | "name"
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
        {/* Main Grid: Accounts Cards                                 */}
        {/* ========================================================= */}
        {filteredAccounts.length === 0 ? (
          <div className="rounded-2xl border border-[#233340] bg-[#060c12]/80 p-12 text-center my-10">
            <Crown className="mx-auto size-12 text-[#d6a43a]/50 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No Accounts Found</h3>
            <p className="text-sm text-[#8e9ca7] max-w-md mx-auto">
              No {activeTab} accounts matched your current filter criteria. Try resetting your search query or price limits.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setMinPrice("");
                setMaxPrice("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(180deg,#f3b23e_0%,#d98e1e_100%)] px-5 py-2.5 text-xs font-black text-[#231405]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
            {paginatedAccounts.map((account) => {
              return (
                <div
                  key={account.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d6a43a]/40 bg-[linear-gradient(180deg,rgba(16,15,13,0.95),rgba(8,9,11,0.98))] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-all duration-300 hover:border-[#d6a43a] hover:shadow-[0_16px_40px_rgba(214,164,58,0.25)] hover:scale-[1.015]"
                >
                  {/* Top-Left In Stock Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-950/75 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-400 backdrop-blur-md">
                    <span className="text-[10px] text-emerald-400">★</span>
                    <span>In Stock</span>
                  </div>

                  {/* Top-Right Account ID */}
                  <div className="absolute top-3.5 right-3.5 z-10 text-[10px] font-mono font-bold text-[#d6a43a] bg-[#080e14]/80 border border-[#2b3a47] rounded-md px-2 py-0.5">
                    #{account.acc_id}
                  </div>

                  {/* Account Image Art with Dark Vignette Atmosphere */}
                  <div className="relative mx-auto mt-6 mb-2 flex h-32 w-full items-center justify-center overflow-hidden">
                    <Image
                      src={account.image}
                      alt={account.name}
                      width={220}
                      height={120}
                      className="max-h-28 w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-108"
                    />
                  </div>

                  {/* Combat & Total Pills */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {account.combatLevel && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-[#283844] bg-[#070e14] px-2 py-0.5 text-[11px] font-semibold text-[#ffd46e]">
                        <Swords className="size-3 text-[#d6a43a]" />
                        <span>Cmb {account.combatLevel}</span>
                      </span>
                    )}
                    {account.totalLevel && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-[#283844] bg-[#070e14] px-2 py-0.5 text-[11px] font-semibold text-[#cbd6dc]">
                        <Sparkles className="size-3 text-[#d6a43a]" />
                        <span>Total {account.totalLevel}</span>
                      </span>
                    )}
                  </div>

                  {/* Account Title */}
                  <div className="text-center">
                    <h3 className="font-[family-name:var(--font-eb-garamond)] text-base sm:text-lg font-bold tracking-wide text-[#e8eff4] transition-colors group-hover:text-white line-clamp-2 min-h-[48px]">
                      {account.name}
                    </h3>
                    <div className="font-[family-name:var(--font-eb-garamond)] mt-1 text-2xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_1px_6px_rgba(214,164,58,0.45)]">
                      ${account.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Highlights bullet previews */}
                  {account.highlights && account.highlights.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap justify-center gap-1 min-h-[36px]">
                      {account.highlights.slice(0, 3).map((hl) => (
                        <span
                          key={hl}
                          className="rounded bg-[#121c25] border border-[#202e3a] px-2 py-0.5 text-[10px] font-medium text-[#9eb0bc]"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions: View Details + ADD TO CART */}
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {/* View Details Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedModalAccount(account)}
                        className="flex h-10 w-11 items-center justify-center rounded-xl border border-[#2b3a47] bg-[#080e14] text-[#8e9ca7] transition-colors hover:border-[#d6a43a] hover:text-[#ffd46e] cursor-pointer"
                        aria-label={`View details for ${account.name}`}
                        title="View Full Specs & Badges"
                      >
                        <Eye className="size-4" />
                      </button>

                      {/* Golden ADD TO CART Button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(account)}
                        aria-label={`Add ${account.name} to cart`}
                        className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(180deg,#f3b23e_0%,#e09520_50%,#c77a10_100%)] px-3 text-xs sm:text-[13px] font-black tracking-wider text-[#2a1705] shadow-[0_4px_14px_rgba(214,164,58,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-[0.98] hover:bg-[linear-gradient(180deg,#ffd46e_0%,#f0a72c_50%,#d88b18_100%)] hover:shadow-[0_6px_20px_rgba(214,164,58,0.6)] cursor-pointer"
                      >
                        <Crown className="size-3.5 fill-[#2a1705] text-[#2a1705]" strokeWidth={2.4} />
                        <span>ADD TO CART</span>
                      </button>
                    </div>

                    {/* Direct Buy Now CTA */}
                    <button
                      type="button"
                      onClick={() => handleBuyNow(account)}
                      className="flex h-8 items-center justify-center gap-1 rounded-lg border border-[#283846] bg-[#0c1620] text-[11px] font-bold text-[#cbd6dc] hover:border-[#d6a43a]/70 hover:text-[#ffd46e] transition-colors cursor-pointer"
                    >
                      <span>Buy Now</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>

                  {/* Card Footer: Sell to us link */}
                  <div className="mt-3.5 border-t border-[#221b13]/80 pt-2 text-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8b97a2] transition-colors hover:text-[#ffda5d]"
                    >
                      <span>Sell an account to us</span>
                      <ArrowRight className="size-3 text-[#ffda5d]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* Pagination: < 1 2 3 >                                     */}
        {/* ========================================================= */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="grid size-9 place-items-center rounded-lg border border-[#271f14] bg-[#0c1015] text-xs font-bold text-[#8e9ca7] transition-all hover:border-[#d6a43a]/60 hover:text-white disabled:opacity-40 cursor-pointer"
              aria-label="Previous page"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`grid size-9 place-items-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "border-[#d6a43a] bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-yellow-950 shadow-[0_0_12px_rgba(214,164,58,0.45)]"
                    : "border-[#271f14] bg-[#0c1015] text-[#8e9ca7] hover:border-[#d6a43a]/60 hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="grid size-9 place-items-center rounded-lg border border-[#271f14] bg-[#0c1015] text-xs font-bold text-[#8e9ca7] transition-all hover:border-[#d6a43a]/60 hover:text-white disabled:opacity-40 cursor-pointer"
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
