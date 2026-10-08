import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import SellRs3Banner from "@/features/SellRs3/components/SellRs3Banner";

export const metadata: Metadata = {
  title: "Sell RS3 Gold | Fast Payouts & Best Rates - SECNX",
  description:
    "Sell your RS3 gold with instant 2-20 minute payouts, best market rates, no ID required, multiple payout methods, and 24/7 live support.",
};

export default function SellRs3Page() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <SellRs3Banner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
