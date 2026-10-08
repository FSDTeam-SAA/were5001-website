import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import AchievementDiariesBanner from "@/features/AchievementDiaries/components/AchievementDiariesBanner";

export const metadata: Metadata = {
  title: "OSRS Achievement Diary Service - SECNX",
  description:
    "Buy OSRS Achievement Diary Boost Services at SECNX. Fast completion from Easy to Elite tiers for all Old School RuneScape regions with 100% hand-done safety.",
};

export default function AchievementDiariesPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <AchievementDiariesBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
