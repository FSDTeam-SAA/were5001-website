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
  title: "Were5001",
  description: "A scalable Next.js starter application.",
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
