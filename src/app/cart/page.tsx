import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollObserver from "@/components/shared/ScrollObserver";
import FAQ from "@/features/Home/components/FAQ";
import TrustedByTraders from "@/features/Home/components/TrustedByTraders";
import WhyPlayersBuy from "@/features/Home/components/WhyPlayersBuy";
import CartBanner from "@/features/Cart/components/CartBanner";

export const metadata: Metadata = {
  title: "Your Cart | Fast & Secure Checkout - SECNX",
  description:
    "Review your cart items, select your preferred payment method, and complete your secure RuneScape order with instant 2-20 minute delivery.",
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#020609]">
      <ScrollObserver />
      <Navbar />
      <CartBanner />
      <WhyPlayersBuy />
      <TrustedByTraders />
      <FAQ />
      <Footer />
    </main>
  );
}
