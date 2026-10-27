"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart.store";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "BUY OSRS GOLD", href: "/buy/osrs" },
  { name: "SELL OSRS GOLD", href: "/sell/osrs" },
  { name: "BUY RS3 GOLD", href: "/buy/rs3" },
  { name: "SELL RS3 GOLD", href: "/sell/rs3" },
  { name: "ITEMS", href: "/items" },
  { name: "ACCOUNTS", href: "/accounts/osrs" },
];

const osrsServices = [
  { name: "Skilling", href: "/services/skilling" },
  { name: "Questing", href: "/services/questing" },
  { name: "Fire Capes", href: "/services/fire-capes" },
  { name: "Achievement Diaries", href: "/services/achievement-diaries" },
  { name: "Infernal Capes", href: "/services/infernal-capes" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 font-[family-name:var(--font-inter)] ${isScrolled
          ? "h-[68px] bg-[#030910]/95 border-b border-[#d6a43a]/35 shadow-[0_12px_32px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          : "h-20 bg-[#050d14]/85 border-b border-[#203140]/60 backdrop-blur-md"
        }`}
    >
      {/* Subtle bottom hairline highlight */}
      <span
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 ${isScrolled
            ? "bg-[linear-gradient(90deg,transparent,#d6a43a,transparent)] opacity-80"
            : "bg-[linear-gradient(90deg,transparent,#d6a43a/35,transparent)] opacity-50"
          }`}
      />

      <div className="mx-auto flex h-full max-w-[1560px] items-center justify-between px-6 max-[640px]:px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-90" aria-label="Secnx Home">
          <Image
            src="/assets/site-logo.svg"
            alt="Secnx"
            width={105}
            height={44}
            priority
            className="h-auto w-[100px] max-[640px]:w-[86px]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="flex h-full items-center gap-7 text-[13.5px] font-semibold tracking-wide text-[#cbd6dc] max-[1400px]:gap-5 max-[1120px]:hidden"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/accounts/osrs" && pathname.startsWith("/accounts"));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex h-full items-center transition-colors duration-200 hover:text-white ${isActive
                    ? "font-bold text-[#ffdf70] after:absolute after:bottom-0 after:inset-x-0 after:h-[2.5px] after:rounded-t-full after:bg-[linear-gradient(90deg,#ffda5d,#d78b14)] after:shadow-[0_0_10px_rgba(214,164,58,0.5)]"
                    : "hover:text-[#ffdf70]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* OSRS Services Dropdown Button */}
          <div
            className="relative flex h-full items-center"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 transition-colors duration-200 hover:text-[#ffdf70]"
              aria-expanded={servicesDropdown}
            >
              <span>OSRS SERVICES</span>
              <Image
                src="/assets/nav-chevron.svg"
                alt=""
                width={14}
                height={14}
                className={`transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdown && (
              <div className="absolute top-[calc(100%-8px)] left-0 min-w-[210px] rounded-xl border border-[#233544] bg-[linear-gradient(160deg,rgba(18,28,36,0.96),rgba(8,15,21,0.98))] p-2 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(214,164,58,0.15)] backdrop-blur-md animate-fade-in-up">
                {osrsServices.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#cbd6dc] transition-all duration-150 hover:bg-[#d6a43a]/15 hover:text-[#ffdf70] hover:translate-x-1"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Blog, Contact, Cart, Log in, Mobile Hamburger */}
        <div className="flex items-center gap-6 max-[1400px]:gap-4">
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#cbd6dc] transition-colors hover:text-white max-[640px]:hidden"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-[#cbd6dc] transition-colors hover:text-white max-[640px]:hidden"
          >
            Contact
          </Link>

          {/* Cart Icon with Live Badge */}
          <Link
            href="/cart"
            className="group relative grid size-11 place-items-center rounded-xl border border-[#213340] bg-[linear-gradient(160deg,rgba(18,29,38,0.7),rgba(8,16,22,0.85))] shadow-sm transition-all duration-200 hover:border-[#d6a43a]/60 hover:shadow-[0_0_15px_rgba(214,164,58,0.25)] max-[640px]:hidden"
            aria-label={`Shopping cart with ${totalCartItems} items`}
          >
            <Image
              src="/assets/nav-cart.svg"
              alt=""
              width={20}
              height={20}
              className="transition-transform group-hover:scale-105"
            />
            <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-[10px] font-black text-yellow-950 shadow-[0_0_8px_rgba(214,164,58,0.5)]">
              {totalCartItems}
            </span>
          </Link>

          {/* Log In CTA Button */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(180deg,#ffda5d,#d78b14)] px-5 py-2.5 text-sm font-bold text-yellow-950 shadow-[0_2px_10px_rgba(214,164,58,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(214,164,58,0.45)] active:scale-[0.98] max-[640px]:px-4 max-[640px]:py-2 max-[640px]:text-xs"
          >
            Log in
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="grid size-10 place-items-center rounded-xl border border-[#223340] bg-[#0d1822] text-[#cbd6dc] transition-colors hover:text-white min-[1121px]:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#213240] bg-[#050d14]/98 px-6 py-5 shadow-2xl backdrop-blur-xl min-[1121px]:hidden animate-fade-in-up">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/accounts/osrs" && pathname.startsWith("/accounts"));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive
                      ? "bg-[#d6a43a]/15 text-[#ffdf70] font-bold"
                      : "text-[#cbd6dc] hover:bg-[#d6a43a]/10 hover:text-[#ffdf70]"
                    }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-[#d6a43a]">›</span>
                </Link>
              );
            })}

            {/* OSRS Services Collapsible in Mobile Menu */}
            <div>
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-[#cbd6dc] transition-colors hover:bg-[#d6a43a]/10 hover:text-[#ffdf70]"
              >
                <span>OSRS SERVICES</span>
                <span
                  className={`text-xs text-[#d6a43a] transition-transform duration-200 ${mobileServicesOpen ? "rotate-90" : ""
                    }`}
                >
                  ›
                </span>
              </button>
              {mobileServicesOpen && (
                <div className="ml-3 mt-1 space-y-1 border-l border-[#d6a43a]/25 pl-3">
                  {osrsServices.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-md px-2.5 py-1.5 text-xs font-medium text-[#8e9ca7] transition-colors hover:text-[#ffdf70]"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="my-2 h-px bg-[#182631]" />

            <div className="flex items-center justify-around pt-2">
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-[#94a3af] hover:text-white"
              >
                Blog
              </Link>
              <span className="text-[#324555]">•</span>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-[#94a3af] hover:text-white"
              >
                Contact
              </Link>
              <span className="text-[#324555]">•</span>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#ffdf70]"
              >
                <span>Cart ({totalCartItems})</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
