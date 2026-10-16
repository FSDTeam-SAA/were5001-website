import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import { Suspense } from "react";
import ContactBanner from "@/features/Contact/components/ContactBanner";

export const metadata: Metadata = {
  title: "Contact SECNX | 24/7 Live Support & Discord",
  description:
    "Connect with SECNX real 24/7 support. Instant English-speaking live chat replies under 1 minute or join our official Discord server.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <ContactBanner />
      </Suspense>
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
