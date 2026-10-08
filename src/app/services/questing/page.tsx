import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import QuestingBanner from "@/features/Questing/components/QuestingBanner";

export const metadata: Metadata = {
  title: "Buy OSRS Questing Service - SECNX",
  description:
    "Buy OSRS Questing Services at SECNX. Fast, 100% hand-completed OSRS quests for Free to Play, Members, and Miniquests with 24/7 dedicated support.",
};

export default function QuestingPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <QuestingBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
