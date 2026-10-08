import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import BuyRs3Banner from "@/features/BuyRs3/components/BuyRs3Banner";

export const metadata: Metadata = {
  title: "Buy RS3 Gold | Fast & Safe RuneScape 3 Gold - SECNX",
  description:
    "Buy RS3 gold with instant 2-20 minute in-game delivery, no ID required, competitive market rate, and 24/7 live support.",
};

export default function BuyRs3Page() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <BuyRs3Banner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
