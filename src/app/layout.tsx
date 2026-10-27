import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono, Inter, Open_Sans, Orbitron } from "next/font/google";
import { MainProviders } from "@/Providers/MainProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const ebGaramond = EB_Garamond({ variable: "--font-eb-garamond", subsets: ["latin"] });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"] });
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SECNX | Buy & Sell OSRS & RS3 Gold, Items & Accounts",
  description: "Instant OSRS & RS3 gold, items, and accounts with fast 2-20 minute delivery and 24/7 live support.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${ebGaramond.variable} ${openSans.variable} ${orbitron.variable} antialiased`}
    >
      <body><MainProviders>{children}</MainProviders></body>
    </html>
  );
}
