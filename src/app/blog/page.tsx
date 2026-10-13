import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import BlogBanner from "@/features/Blog/components/BlogBanner";

export const metadata: Metadata = {
  title: "RuneScape Blog & Guides | OSRS & RS3 Gold Strategies - SECNX",
  description:
    "Explore comprehensive RuneScape guides, gold money-making methods, PvM bossing tactics, and safe account trading tips by verified SECNX experts.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <BlogBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
