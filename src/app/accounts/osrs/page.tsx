import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import AccountsFAQ from "@/features/Accounts/components/AccountsFAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import AccountsBanner from "@/features/Accounts/components/AccountsBanner";

export const metadata: Metadata = {
  title: "Buy OSRS Accounts | Hand-Trained Maxed Mains, Pures & Ironmen - SECNX",
  description:
    "Buy verified OSRS accounts with instant 2-20 minute delivery, 100% hand-trained security, changeable email ownership, and lifetime warranty. Maxed mains, pures, and ironmen ready to play.",
};

export default function OsrsAccountsPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <AccountsBanner initialGame="OSRS" />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <AccountsFAQ />
      <Footer />
    </main>
  );
}
