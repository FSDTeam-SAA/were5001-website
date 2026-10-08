import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import InfernalCapesBanner from "@/features/InfernalCapes/components/InfernalCapesBanner";

export const metadata: Metadata = {
  title: "OSRS Infernal Cape Service - SECNX",
  description:
    "Buy OSRS Infernal Cape Services at SECNX. Guaranteed TzKal-Zuk completion for Mains, Zerkers, and Pures using Twisted Bow, BowFa, or Armadyl Crossbow with 100% hand-done safety.",
};

export default function InfernalCapesPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <InfernalCapesBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
