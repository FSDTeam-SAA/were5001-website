import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import SellOsrsBanner from "@/features/SellOsrs/components/SellOsrsBanner";

export const metadata: Metadata = {
  title: "Sell OSRS Gold | Fast Payouts & Best Rates - SECNX",
  description:
    "Sell your OSRS gold with instant 2-20 minute payouts, best market rates, no ID required, multiple payout methods, and 24/7 live support.",
};

export default function SellOsrsPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <SellOsrsBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
