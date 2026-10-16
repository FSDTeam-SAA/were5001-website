import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const linkGroups = [
  {
    title: "OSRS Gold",
    links: [
      { name: "Buy OSRS Gold", href: "/buy/osrs" },
      { name: "Sell OSRS Gold", href: "/sell/osrs" },
      { name: "OSRS Items", href: "/items" },
      { name: "OSRS Services", href: "/services" },
    ],
  },
  {
    title: "RS3 Gold",
    links: [
      { name: "Buy RS3 Gold", href: "/buy/rs3" },
      { name: "Sell RS3 Gold", href: "/sell/rs3" },
      { name: "RS3 Items", href: "/items" },
      { name: "RS3 Services", href: "/services" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "#faq-heading" },
      { name: "Trading Guide", href: "/guide" },
      { name: "Order Status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Reviews", href: "https://www.trustpilot.com/review/secnx.com" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms and Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refund" },
      { name: "AML Policy", href: "/aml" },
    ],
  },
];

// All payment methods matching the buy pages
const payments = [
  {
    src: "/assets/footer/card-pay-combined.svg",
    alt: "Card Pay (PayPal, Credit Card, Debit Card, Apple Pay, Google Pay)",
    isCardPay: true,
  },
  { src: "/assets/footer/payment-07.png", alt: "Crypto" },
  { src: "/assets/footer/payment-03.png", alt: "Interac e-Transfer" },
  { src: "/assets/footer/payment-01.png", alt: "Skrill" },
  { src: "/assets/footer/payment-02.png", alt: "Neteller" },
  { src: "/assets/footer/payment-09.png", alt: "paysafecard" },
  { src: "/assets/footer/payment-08.png", alt: "Przelewy24" },
  { src: "/assets/footer/payment-10.png", alt: "Paysafe:cash" },
  { src: "/assets/footer/payment-15.png", alt: "BLIK" },
  { src: "/assets/footer/payment-05.png", alt: "Alipay" },
  { src: "/assets/footer/payment-13.png", alt: "UK Bank Transfer" },
  { src: "/assets/footer/payment-12.png", alt: "EU Bank Transfer" },
  { src: "/assets/footer/payment-16.png", alt: "Bancontact" },
  { src: "/assets/footer/payment-11.png", alt: "iDeal" },
];

function SocialButton({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-xl border border-[#223340] bg-[linear-gradient(160deg,rgba(18,29,38,0.8),rgba(8,16,22,0.9))] text-[#9eb0bc] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d6a43a]/70 hover:bg-[#15232d] hover:text-[#ffd75a] hover:shadow-[0_0_15px_rgba(214,164,58,0.3)]"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#020609] pt-16 pb-10 font-[family-name:var(--font-inter)] text-[#c7c8cb]">
      {/* Background Artwork from public/assets/footer-image.png - Clearly visible and vivid */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65"
        style={{ backgroundImage: "url('/assets/footer-image.png')" }}
      />
      {/* Smooth top fade and light ambient vignette for maximum clarity and text readability */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(2,6,9,0.30)_12%,rgba(2,6,9,0.45)_55%,rgba(1,4,7,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#b88a26,transparent)] opacity-60" />

      <div className="relative mx-auto max-w-[1320px] px-6 max-[640px]:px-4">
        {/* Main Grid: Left branding, Right link columns */}
        <div className="grid grid-cols-[300px_minmax(0,1fr)] gap-14 max-[1150px]:grid-cols-1 max-[1150px]:gap-10">
          {/* Brand Info */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image src="/assets/logo-nav.svg" alt="SECNX Logo" width={110} height={48} className="h-auto w-[110px]" />
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-[#c6d1da] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Your trusted partner for RS3 &amp; OSRS gold trading. Fast automated delivery, 100% safe transactions, and 24/7 dedicated support you can count on.
            </p>

            {/* Live Support Indicator */}
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-[#00b67a]/40 bg-[#00b67a]/15 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-[#00e89c] shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b67a] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#00e89c]" />
              </span>
              24/7 Live Chat &amp; Instant Trade Online
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {/* Discord */}
              <SocialButton label="Discord" href="https://discord.com">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </SocialButton>

              {/* Twitter / X */}
              <SocialButton label="X / Twitter" href="https://twitter.com">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialButton>

              {/* Trustpilot */}
              <SocialButton label="Trustpilot" href="https://www.trustpilot.com/review/secnx.com">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#00b67a]">
                  <path d="M12 2.5l2.94 6.1 6.56.9-4.78 4.6 1.17 6.6L12 17.6l-5.89 3.1 1.17-6.6L2.5 9.5l6.56-.9z" />
                </svg>
              </SocialButton>

              {/* Facebook */}
              <SocialButton label="Facebook" href="https://facebook.com">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialButton>

              {/* YouTube */}
              <SocialButton label="YouTube" href="https://youtube.com">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialButton>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-5 gap-8 max-[1000px]:grid-cols-3 max-[640px]:grid-cols-2 max-[480px]:gap-6">
            {linkGroups.map((group) => (
              <nav key={group.title} className="flex flex-col">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffda5d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-1.5 text-[14px] font-medium text-[#dce4ec] transition-all duration-200 hover:text-[#ffda5d] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                      >
                        <span className="text-xs text-[#d6a43a] opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                          ›
                        </span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Accepted Payment Methods Bar */}
        <div className="mt-14 border-t border-[#182631]/80 pt-8">
          <div className="mb-4 flex items-center justify-between gap-4 max-[640px]:flex-col max-[640px]:items-start">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffda5d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Accepted Payment Methods
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#00e89c] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-[#00e89c]">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              256-Bit SSL Encrypted &amp; Fully Verified
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {payments.map((payment) => (
              <div
                key={payment.src}
                className={`flex h-11 items-center justify-center rounded-lg bg-white px-3 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_14px_rgba(214,164,58,0.4)] ${
                  payment.isCardPay ? "min-w-[190px] flex-[1.4]" : "min-w-[68px] flex-1"
                }`}
              >
                <Image
                  src={payment.src}
                  alt={payment.alt}
                  width={payment.isCardPay ? 240 : 100}
                  height={32}
                  className={`w-auto max-w-full object-contain ${
                    payment.isCardPay ? "max-h-8" : "max-h-7"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#182631]/80 pt-6 text-xs max-[700px]:flex-col max-[700px]:text-center">
          <p className="font-semibold text-[#c0ccd6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
            © {new Date().getFullYear()} SECNX. All rights reserved.
          </p>
          <p className="max-w-[700px] text-[11.5px] leading-relaxed text-[#94a3b8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
            RuneScape is a registered trademark of Jagex Limited. SECNX is a player-to-player community service and is not affiliated with or endorsed by Jagex Limited.
          </p>
        </div>
      </div>
    </footer>
  );
}
