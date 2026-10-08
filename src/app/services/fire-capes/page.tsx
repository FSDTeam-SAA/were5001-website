import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import FireCapesBanner from "@/features/FireCapes/components/FireCapesBanner";

export const metadata: Metadata = {
  title: "Buy OSRS Fire Cape Service - SECNX",
  description:
    "Buy OSRS Fire Cape Services at SECNX. Fast completion, guaranteed Jad defeat for Pures, Zerks, Mains, Ironman, and No-Prayer accounts with 100% hand-trained security.",
};

export default function FireCapesPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <FireCapesBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
