"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Coins,
  Flame,
} from "lucide-react";
import { BlogPost } from "../types";
import { CornerOrnament } from "./CornerOrnament";

interface BlogDetailsViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailsView({
  post,
  relatedPosts,
}: BlogDetailsViewProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Read "${post.title}" on SECNX:`);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleShareReddit = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(post.title);
      window.open(
        `https://reddit.com/submit?url=${url}&title=${title}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <article className="relative overflow-hidden bg-[#03060a] pt-10 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-14 sm:pb-32">
      {/* Background artwork & lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
        style={{ backgroundImage: "url('/assets/footer-image.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(2,6,9,0.55)_25%,rgba(2,6,9,0.75)_65%,rgba(1,4,7,0.98)_100%)]" />
      <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#d6a43a]/15 blur-[140px]" />

      <div className="relative mx-auto max-w-[1040px] px-4 sm:px-6">
        {/* Breadcrumb & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1b2a37] pb-5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-[#8e9ca7]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#ffd95b]"
            >
              Home
            </Link>
            <ChevronRight className="size-3.5 text-[#425567]" />
            <Link
              href="/blog"
              className="transition-colors hover:text-[#ffd95b]"
            >
              Blog
            </Link>
            <ChevronRight className="size-3.5 text-[#425567]" />
            <span className="text-[#ffd95b] font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.category}
            </span>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#223340] bg-[#070d14]/80 px-3.5 py-1.5 text-xs font-semibold text-[#8e9ca7] backdrop-blur-sm transition-all hover:border-[#d6a43a] hover:text-[#ffd95b] cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to All Guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mt-8 text-center sm:text-left">
          {/* Category & Read Time Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="rounded-md border border-[#d6a43a]/60 bg-[#121c27] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ffd95b] shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#8e9ca7]">
              <Clock className="size-3.5 text-[#d6a43a]" />
              {post.readTime}
            </span>
            <span className="text-[#425567]">•</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#8e9ca7]">
              <Calendar className="size-3.5 text-[#d6a43a]" />
              {post.date}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-5 font-[family-name:var(--font-eb-garamond)] text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.18] tracking-tight text-[#ffda5d] drop-shadow-[0_2px_18px_rgba(214,164,58,0.35)]">
            {post.title}
          </h1>

          {/* Author Details & Share Toolbar */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#1e2f3d] bg-[#090f18]/85 p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="relative size-12 overflow-hidden rounded-full border-2 border-[#d6a43a]/60 shadow-md">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-white">
                  <span>{post.author.name}</span>
                  <ShieldCheck className="size-4 text-[#00e676]" />
                </div>
                <div className="text-xs text-[#8e9ca7] font-medium">
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-lg border border-[#233342] bg-[#0c141d] px-3.5 py-2 text-xs font-semibold text-[#cbd6dc] transition-all hover:border-[#d6a43a] hover:text-[#ffd95b] cursor-pointer"
                title="Copy Article Link"
              >
                {copiedLink ? (
                  <Check className="size-3.5 text-[#00e676]" />
                ) : (
                  <Share2 className="size-3.5" />
                )}
                <span>{copiedLink ? "Link Copied!" : "Share"}</span>
              </button>

              <button
                type="button"
                onClick={handleShareTwitter}
                className="rounded-lg border border-[#233342] bg-[#0c141d] px-3 py-2 text-xs font-semibold text-[#8e9ca7] transition-all hover:border-[#d6a43a] hover:text-white cursor-pointer"
                title="Share on X / Twitter"
              >
                𝕏
              </button>

              <button
                type="button"
                onClick={handleShareReddit}
                className="rounded-lg border border-[#233342] bg-[#0c141d] px-3 py-2 text-xs font-semibold text-[#8e9ca7] transition-all hover:border-[#d6a43a] hover:text-white cursor-pointer"
                title="Share on Reddit"
              >
                Reddit
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="group relative mt-8 overflow-hidden rounded-2xl border border-[#d6a43a]/50 bg-[#070d14] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.85)_100%)]" />
          </div>
        </div>

        {/* Excerpt Lead Card */}
        <div className="mt-8 rounded-xl border-l-4 border-l-[#d6a43a] border-y border-r border-[#1f303e] bg-[linear-gradient(135deg,#0c141e_0%,#070d14_100%)] p-5 sm:p-6 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffd95b]">
            <Sparkles className="size-4 text-[#ffd95b]" />
            <span>Executive Summary</span>
          </div>
          <p className="mt-2 text-base sm:text-lg italic leading-relaxed text-[#d7e2e8]">
            &ldquo;{post.excerpt}&rdquo;
          </p>
        </div>

        {/* Article Body Content */}
        <div className="mt-10 space-y-6">
          {Array.isArray(post.content) ? (
            post.content.map((paragraph, index) => {
              const isNumbered = /^[0-9]+\.\s/.test(paragraph);

              if (isNumbered) {
                const colonIndex = paragraph.indexOf(":");
                let stepTitle = "";
                let stepBody = paragraph;

                if (colonIndex !== -1) {
                  stepTitle = paragraph.slice(0, colonIndex + 1);
                  stepBody = paragraph.slice(colonIndex + 1).trim();
                }

                return (
                  <div
                    key={index}
                    className="rounded-xl border border-[#1b2b3a] bg-[#090f18]/70 p-5 sm:p-6 shadow-md transition-all hover:border-[#d6a43a]/50"
                  >
                    {stepTitle ? (
                      <>
                        <h3 className="font-[family-name:var(--font-eb-garamond)] text-xl sm:text-2xl font-bold text-[#ffda5d]">
                          {stepTitle}
                        </h3>
                        <p className="mt-2.5 text-base sm:text-[17px] leading-relaxed text-[#cbd6dc]">
                          {stepBody}
                        </p>
                      </>
                    ) : (
                      <p className="text-base sm:text-[17px] leading-relaxed text-[#cbd6dc]">
                        {paragraph}
                      </p>
                    )}
                  </div>
                );
              }

              return (
                <p
                  key={index}
                  className="text-base sm:text-[17px] leading-relaxed text-[#cbd6dc]"
                >
                  {paragraph}
                </p>
              );
            })
          ) : (
            <div
              className="blog-prose space-y-5 text-base sm:text-[17px] leading-relaxed text-[#cbd6dc] [&_h2]:font-[family-name:var(--font-eb-garamond)] [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-[#ffda5d] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-[family-name:var(--font-eb-garamond)] [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-[#ffd95b] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:leading-relaxed [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-[#ffd95b] [&_a]:underline [&_a]:hover:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </div>

        {/* Tags Section */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[#1b2a37] pt-6">
          <span className="text-xs font-semibold text-[#7d8e9c] mr-2">
            Related Topics:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-[#233544] bg-[#0b131c] px-3 py-1 text-xs font-medium text-[#ffd95b]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Conversion Action Box */}
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-[#d6a43a]/60 bg-[linear-gradient(145deg,#121c27_0%,#080e15_100%)] p-6 sm:p-8 text-center shadow-[0_16px_45px_rgba(0,0,0,0.85)]">
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-[#d6a43a]/60 bg-[#d6a43a]/15 text-[#ffd95b]">
            <Coins className="size-6" />
          </div>

          <h3 className="mt-4 font-[family-name:var(--font-eb-garamond)] text-2xl sm:text-3xl font-bold tracking-tight text-[#ffda5d]">
            Ready to Skip the Grind &amp; Dominate RuneScape?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-[#8e9ca7]">
            SECNX delivers 100% verified authentic OSRS &amp; RS3 Gold, combat item sets, and caping services within 2-20 minutes. Protected by 24/7 fraud prevention and instant live support.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/buy/osrs"
              className="rounded-lg bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_4px_18px_rgba(214,147,32,0.4)] transition-all hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] active:scale-95"
            >
              BUY OSRS GOLD
            </Link>
            <Link
              href="/buy/rs3"
              className="rounded-lg border border-[#314658] bg-[#111c27] px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-[#ffd95b] hover:bg-[#192837] active:scale-95"
            >
              BUY RS3 GOLD
            </Link>
            <Link
              href="/items"
              className="rounded-lg border border-[#233342] bg-[#070d14] px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-[#cbd6dc] hover:text-white"
            >
              VIEW RARE ITEMS
            </Link>
          </div>
        </div>

        {/* Author Spotlight Bio */}
        <div className="mt-12 rounded-2xl border border-[#1b2b3a] bg-[#070d14]/80 p-6 sm:p-7 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[#d6a43a]/60">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-lg font-bold text-white">
                  {post.author.name}
                </span>
                <span className="rounded bg-[#172533] px-2 py-0.5 text-xs font-semibold text-[#ffd95b]">
                  {post.author.role}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#8e9ca7]">
                Official guide published by Secnx. Dedicated RuneScape market analysis, safe trading protocols, and expert progression resources.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between border-b border-[#1b2a37] pb-4 mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-[#d6a43a]" />
                <h2 className="font-[family-name:var(--font-eb-garamond)] text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#ffda5d]">
                  Related Guides &amp; Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="flex items-center gap-1 text-xs font-bold text-[#ffd95b] hover:text-white transition-colors"
              >
                <span>VIEW ALL</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d6a43a]/30 bg-[#090e17]/90 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-[#d6a43a]/70 hover:shadow-[0_16px_40px_rgba(214,164,58,0.18)] hover:-translate-y-1"
                >
                  <CornerOrnament position="tl" />
                  <CornerOrnament position="tr" />
                  <CornerOrnament position="bl" />
                  <CornerOrnament position="br" />

                  {/* Thumbnail */}
                  <Link
                    href={`/blog/${related.slug}`}
                    className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#1b2a37] block"
                  >
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.8)_100%)]" />

                    <div className="absolute top-3 left-3 rounded-md border border-[#d6a43a]/50 bg-[#070d14]/85 px-2.5 py-1 text-[11px] font-bold text-[#ffd95b]">
                      {related.category}
                    </div>

                    <div className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[11px] text-[#cbd6dc]">
                      <Clock className="size-3 text-[#d6a43a]" />
                      <span>{related.readTime}</span>
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <Link href={`/blog/${related.slug}`}>
                      <h3 className="font-[family-name:var(--font-eb-garamond)] text-lg font-bold leading-snug tracking-tight text-[#ffda5d] group-hover:text-white transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs leading-relaxed text-[#8e9ca7] line-clamp-2">
                      {related.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-[#1b2a37] flex items-center justify-between">
                      <span className="text-[11px] text-[#7d8e9c]">
                        {related.date}
                      </span>

                      <Link
                        href={`/blog/${related.slug}`}
                        className="flex items-center gap-1 text-xs font-bold text-[#ffd95b] hover:text-white transition-colors"
                      >
                        <span>READ</span>
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
