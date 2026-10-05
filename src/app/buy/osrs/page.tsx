import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import BuyOsrsBanner from "@/features/BuyOsrs/components/BuyOsrsBanner";

export const metadata: Metadata = {
  title: "Buy OSRS Gold | Fast & Safe RuneScape Gold - SECNX",
  description:
    "Buy OSRS gold with instant 2-20 minute in-game delivery, no ID required, competitive $0.22/M rate, and 24/7 live support.",
};

export default function BuyOsrsPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <BuyOsrsBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
