"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  X,
  TrendingUp,
  Check,
} from "lucide-react";
import { BlogCategory } from "../types";
import { BLOG_POSTS } from "../data/blogData";
import { CornerOrnament } from "./CornerOrnament";

const CATEGORIES: BlogCategory[] = [
  "All",
  "Guides",
  "Economy",
  "Safety",
  "PvM & Bossing",
];

export default function BlogBanner() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /^\S+@\S+\.\S+$/.test(newsletterEmail.trim())) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 3500);
      setNewsletterEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-14 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-16 sm:pb-32">
      {/* 1. Background Artwork */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/assets/footer-image.png')" }}
      />

      {/* 2. Ambient lighting & gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(2,6,9,0.30)_15%,rgba(2,6,9,0.50)_60%,rgba(1,4,7,0.92)_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[680px] rounded-full bg-[#d6a43a]/12 blur-[130px]" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Top Diamond Ornament */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,transparent,#d6a43a)] opacity-70" />
            <span className="text-[#d6a43a] text-lg font-serif">◇</span>
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,#d6a43a,transparent)] opacity-70" />
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-eb-garamond)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.14em] uppercase">
            <span className="text-[#e5a93c] drop-shadow-[0_2px_14px_rgba(214,164,58,0.55)]">
              BLOG
            </span>{" "}
            <span className="text-[#f1f5f9] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
              &amp; GUIDES
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-sm sm:text-base font-medium text-[#8e9ca7] max-w-xl">
            RuneScape market analysis, gold trading safety protocols, and expert gameplay strategies.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 md:flex-row md:items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[#223340] bg-[#070d14]/80 p-1.5 backdrop-blur-md">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleCount(9);
                  }}
                  className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] text-white shadow-[0_2px_12px_rgba(214,147,32,0.45)]"
                      : "text-[#8e9ca7] hover:bg-[#121c27] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8e9ca7]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(9);
              }}
              placeholder="Search guides, strategies..."
              className="h-10.5 w-full rounded-xl border border-[#223340] bg-[#070d14]/90 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-[#5c6c7b] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setVisibleCount(9);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e9ca7] hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Post Card (Only shown if on "All" or matches category and no search) */}
        {!searchQuery && (selectedCategory === "All" || selectedCategory === featuredPost.category) && (
          <div className="mt-10 group relative overflow-hidden rounded-2xl border border-[#d6a43a]/50 bg-[#090e17]/95 p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(214,164,58,0.25)] backdrop-blur-md transition-all duration-300 hover:border-[#d6a43a]/80">
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image side */}
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="lg:col-span-5 relative block aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[320px] overflow-hidden rounded-xl border border-[#203240] group/img"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-[#d6a43a]/60 bg-[#070d14]/90 px-3 py-1 text-xs font-bold text-[#ffd95b] shadow-md backdrop-blur-md">
                  <Sparkles className="size-3 text-[#ffd95b]" />
                  <span>LATEST PUBLICATION</span>
                </div>
              </Link>

              {/* Text side */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#8e9ca7]">
                  <span className="rounded-md border border-[#304354] bg-[#111c27] px-2.5 py-0.5 text-[#ffda5d]">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5 text-[#d6a43a]" />
                    {featuredPost.readTime}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="mt-3.5 font-[family-name:var(--font-eb-garamond)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#ffda5d] group-hover:text-white transition-colors duration-200">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#9fb0be]">
                  {featuredPost.excerpt}
                </p>

                {/* Author Info & Read CTA */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#1b2a37] pt-5">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 overflow-hidden rounded-full border border-[#d6a43a]/50">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-xs text-[#7d8e9c]">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="flex items-center gap-2 rounded-lg bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_4px_18px_rgba(214,147,32,0.4)] transition-all duration-200 hover:shadow-[0_6px_24px_rgba(214,147,32,0.6)] hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] active:scale-95 cursor-pointer"
                  >
                    <span>READ FULL ARTICLE</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-[family-name:var(--font-eb-garamond)] text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#ffda5d]">
              {selectedCategory === "All" ? "Latest Publications" : `${selectedCategory} Guides`}
              <span className="ml-2 text-xs sm:text-sm font-sans font-medium text-[#7d8e9c]">
                ({filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"})
              </span>
            </h3>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-[#223340] bg-[#070d14]/70 p-12 text-center backdrop-blur-md">
              <Search className="mx-auto size-10 text-[#5c6c7b]" />
              <p className="mt-3 text-base font-semibold text-white">No articles found</p>
              <p className="mt-1 text-sm text-[#7d8e9c]">
                Try adjusting your search query or switching category filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setVisibleCount(9);
                }}
                className="mt-4 rounded-lg bg-[#182633] px-4 py-2 text-xs font-semibold text-[#ffd95b] hover:bg-[#203244] cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {visiblePosts.map((post) => (
                  <article
                    key={post.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d6a43a]/30 bg-[#090e17]/90 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-[#d6a43a]/70 hover:shadow-[0_16px_40px_rgba(214,147,32,0.18)] hover:-translate-y-1"
                  >
                    <CornerOrnament position="tl" />
                    <CornerOrnament position="tr" />
                    <CornerOrnament position="bl" />
                    <CornerOrnament position="br" />

                    {/* Thumbnail Image */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#1b2a37] block"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.8)_100%)]" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 rounded-md border border-[#d6a43a]/50 bg-[#070d14]/85 px-2.5 py-1 text-[11px] font-bold text-[#ffd95b] backdrop-blur-sm">
                        {post.category}
                      </div>

                      {/* Reading time */}
                      <div className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[11px] text-[#cbd6dc] backdrop-blur-sm">
                        <Clock className="size-3 text-[#d6a43a]" />
                        <span>{post.readTime}</span>
                      </div>
                    </Link>

                    {/* Body Content */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-[#121c27] px-2 py-0.5 text-[10px] font-medium text-[#7d8e9c]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h4 className="font-[family-name:var(--font-eb-garamond)] text-xl font-bold leading-snug tracking-tight text-[#ffda5d] group-hover:text-white transition-colors duration-200">
                          {post.title}
                        </h4>
                      </Link>

                      <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#8e9ca7] line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Bottom Metadata & CTA */}
                      <div className="mt-auto pt-5 border-t border-[#1b2a37] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative size-7 overflow-hidden rounded-full border border-[#d6a43a]/40">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium text-[#cbd6dc]">
                            {post.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-xs font-bold text-[#ffd95b] hover:text-white transition-colors cursor-pointer"
                        >
                          <span>READ</span>
                          <ChevronRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {visibleCount < filteredPosts.length && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 9)}
                    className="group relative flex items-center gap-3 rounded-xl border border-[#d6a43a]/60 bg-[#090f18]/90 px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-[#ffd95b] shadow-[0_4px_24px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-200 hover:border-[#ffd95b] hover:bg-[#d6a43a]/15 hover:text-white hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <span>LOAD MORE GUIDES</span>
                    <span className="rounded-full bg-[#162432] px-2.5 py-0.5 text-xs text-[#cbd6dc] group-hover:text-white">
                      {filteredPosts.length - visibleCount} more
                    </span>
                    <ChevronRight className="size-4 text-[#d6a43a] transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Newsletter Subscription Card */}
        <div className="mt-16 sm:mt-20 relative overflow-hidden rounded-2xl border border-[#d6a43a]/45 bg-[#090d16]/95 p-8 sm:p-10 shadow-[0_16px_45px_rgba(0,0,0,0.85)] backdrop-blur-md">
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/10 px-3 py-1 text-xs font-bold text-[#00e676] mb-3">
                <TrendingUp className="size-3.5" />
                <span>RuneScape Market Wire</span>
              </div>
              <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Stay Ahead of Gold Price Shifts &amp; Game Updates
              </h3>
              <p className="mt-2 text-sm text-[#8e9ca7]">
                Get weekly OSRS &amp; RS3 trade market updates, exclusive flash promotions, and end-game bossing guides sent straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="h-11 flex-1 rounded-lg border border-[#263747] bg-[#050a10] px-4 text-xs sm:text-sm text-white placeholder-[#5c6c7b] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]"
                />
                <button
                  type="submit"
                  className="h-11 rounded-lg bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] px-5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_4px_16px_rgba(214,147,32,0.4)] transition-all hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </form>
              {newsletterSubscribed && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#00e676]">
                  <Check className="size-3.5" />
                  <span>Subscribed successfully! Thank you.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
