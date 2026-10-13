import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import LoginView from "@/features/Auth/components/LoginView";

export const metadata: Metadata = {
  title: "Login & Register | SECNX - RuneScape Gold & Trade Services",
  description:
    "Sign in to SECNX to track orders, manage live delivery, and access exclusive member discounts on OSRS and RS3 gold.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <LoginView />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
