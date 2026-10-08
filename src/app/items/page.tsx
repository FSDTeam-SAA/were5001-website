import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import ItemsBanner from "@/features/Items/components/ItemsBanner";

export const metadata: Metadata = {
  title: "Buy OSRS & RS3 Items | Fast Payouts & Best Prices - SECNX",
  description:
    "Buy high-tier OSRS and RS3 items, weapons, armor, and rares with instant in-game delivery, verified authentic stock, and 24/7 customer support.",
};

export default function ItemsPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <ItemsBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
