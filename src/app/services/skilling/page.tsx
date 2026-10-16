import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import ServiceFAQ from "@/components/shared/ServiceFAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import SkillingBanner from "@/features/Skilling/components/SkillingBanner";

export const metadata: Metadata = {
  title: "OSRS Power Leveling Services | 1-99 Skills Boosting - SECNX",
  description:
    "Fast, hand-trained OSRS powerleveling and skilling services. Choose your skills, select desired levels, and get your character leveled up by verified gamers.",
};

export default function SkillingPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <SkillingBanner />
      <TrustedByTraders />
      <ServiceFAQ service="skilling" />
      <Footer />
    </main>
  );
}
