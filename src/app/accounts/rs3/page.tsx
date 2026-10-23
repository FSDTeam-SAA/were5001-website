import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import AccountsFAQ from "@/features/Accounts/components/AccountsFAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import AccountsBanner from "@/features/Accounts/components/AccountsBanner";

export const metadata: Metadata = {
  title: "Buy RS3 Accounts | Maxed Mains, Comp Capes & High Combat - SECNX",
  description:
    "Buy verified RuneScape 3 accounts with instant delivery, 100% hand-trained guarantee, full email ownership, and 24/7 support. Maxed 2898 totals, trim comp, and PvM accounts in stock.",
};

export default function Rs3AccountsPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <AccountsBanner initialGame="RS3" />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <AccountsFAQ />
      <Footer />
    </main>
  );
}
