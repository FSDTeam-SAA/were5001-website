"use client";

import { useState } from "react";

const accountsFaqs = [
  {
    question: "How do I receive my OSRS or RS3 account after payment?",
    answer:
      "Upon payment confirmation, your account login credentials (login username/email, password, and registered email access) are delivered directly to you via 24/7 Live Chat and order confirmation email. Our delivery agent will assist you step-by-step through logging in and changing the credentials to your own personal email.",
  },
  {
    question: "Can I change the registered email, password, and authentication to my own?",
    answer:
      "Yes, absolutely. All accounts sold on SECNX are 100% email-changeable. You receive full ownership and can immediately set your own email, change passwords, and configure your own two-factor authentication (Jagex Authenticator).",
  },
  {
    question: "Are these accounts hand-trained and safe from bans?",
    answer:
      "Yes. Every account listed on SECNX is manually hand-trained by verified and experienced RuneScape players without the use of macros, bots, or prohibited third-party software. All accounts maintain a clean record with zero bans or black marks.",
  },
  {
    question: "What warranty and recovery protection does SECNX provide?",
    answer:
      "We provide a comprehensive SECNX Lifetime Anti-Recovery Warranty on our accounts. In the improbable event of an account lock or issue resulting from prior history, our dedicated support will replace the account with an equivalent build or provide a full store refund according to our policy.",
  },
  {
    question: "How long does account delivery take?",
    answer:
      "Most account orders are delivered within 2 to 20 minutes after payment verification. Our live chat operators are available 24 hours a day, 7 days a week to ensure instant handover.",
  },
  {
    question: "Do I need to submit ID verification to buy an account?",
    answer:
      "No. SECNX does not require account sign-up or personal ID submission to place an order. You can purchase quickly and privately using any of our accepted checkout options.",
  },
  {
    question: "What payment methods are accepted for account purchases?",
    answer:
      "We support Card Pay (Credit/Debit Card, Apple Pay, Google Pay), Crypto (Bitcoin, USDT, Ethereum, Litecoin), Skrill, Neteller, Interac e-Transfer, iDeal, Bancontact, BLIK, and bank transfers.",
  },
  {
    question: "Can I sell or trade in my current OSRS or RS3 account?",
    answer:
      "Yes! If you have an account you would like to sell or trade in toward a new build, please contact our 24/7 Live Chat. Provide your account stats, notable untradeables, and quests, and our agents will provide you with an instant valuation quote.",
  },
  {
    question: "What should I do immediately after receiving my new account?",
    answer:
      "We recommend immediately: 1) Updating the registered email address to your own private email; 2) Changing the account password; 3) Enabling two-factor authentication (2FA); 4) Setting a new Bank PIN in-game.",
  },
  {
    question: "Can I request a custom build or specific account order?",
    answer:
      "Yes. If you are looking for a specific combat build, ironman tier, or quest setup that is not currently listed in stock, contact our Live Chat team. We can source or commission specialized hand-trained accounts to your exact specifications.",
  },
];

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 max-[640px]:size-8 ${
        isOpen
          ? "border-[#d6a43a] bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-yellow-950 shadow-[0_0_15px_rgba(214,164,58,0.45)]"
          : "border-[#2c3d4a] bg-[#121f29] text-[#9eb0bc] group-hover:border-[#d6a43a]/50 group-hover:text-white"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-4 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

export default function AccountsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="accounts-faq-heading"
      className="relative overflow-hidden bg-[#020f14] px-6 py-20 font-[family-name:var(--font-inter)] text-white max-[640px]:px-4 max-[640px]:py-14"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(214,164,58,0.08),transparent_70%),radial-gradient(ellipse_at_0%_60%,rgba(0,135,150,0.12),transparent_40%),radial-gradient(ellipse_at_100%_90%,rgba(30,55,160,0.10),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#182b31,transparent)]" />

      <div className="relative mx-auto max-w-[980px]">
        {/* Section Header */}
        <header className="reveal-init mb-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,#b88a26)]" />
            <span className="text-xs font-semibold tracking-[0.32em] text-[#d6a43a]">
              ACCOUNTS SUPPORT &amp; SECURITY
            </span>
            <span className="h-px w-10 bg-[linear-gradient(270deg,transparent,#b88a26)]" />
          </div>
          <h2
            id="accounts-faq-heading"
            className="mt-4 font-[family-name:var(--font-eb-garamond)] text-5xl font-semibold leading-tight text-[#eef0ef] max-[640px]:text-3xl"
          >
            Frequently Asked{" "}
            <span className="bg-[linear-gradient(180deg,#ffdf70,#d4931a)] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-base text-[#8d9aa3] max-[640px]:text-sm">
            Everything you need to know about purchasing, ownership transfer, warranties, and security for RuneScape accounts.
          </p>
        </header>

        {/* Accordion List */}
        <div className="reveal-init space-y-3.5">
          {accountsFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className={`group overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#d6a43a]/60 bg-[linear-gradient(160deg,rgba(20,32,42,0.92),rgba(8,16,22,0.98))] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.8),0_0_24px_-8px_rgba(214,164,58,0.22)]"
                    : "border-[#202e3a] bg-[linear-gradient(160deg,rgba(16,25,33,0.7),rgba(8,14,20,0.85))] hover:border-[#d6a43a]/30 hover:bg-[linear-gradient(160deg,rgba(20,30,40,0.8),rgba(10,18,24,0.9))]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors max-[640px]:px-5 max-[640px]:py-4 cursor-pointer"
                >
                  <span
                    className={`text-lg font-semibold transition-colors duration-200 max-[640px]:text-base ${
                      isOpen
                        ? "text-[#f3ead0]"
                        : "text-[#dbe3e8] group-hover:text-white"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ToggleIcon isOpen={isOpen} />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[#1d2c38] px-6 pb-6 pt-4 text-[15px] leading-relaxed text-[#9eb0bc] max-[640px]:px-5 max-[640px]:pb-5 max-[640px]:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
