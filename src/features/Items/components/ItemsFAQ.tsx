"use client";

import { useState } from "react";

const itemsFaqs = [
  {
    question: "How do I buy RuneScape items from SECNX?",
    answer:
      "Choose OSRS or RS3, find the item you want, select the quantity, and complete checkout using your preferred payment method. Once your payment is confirmed, contact our 24/7 Live Chat. Our team will confirm your order and guide you through delivery.",
  },
  {
    question: "How will I receive my items?",
    answer:
      "Your items are delivered directly to your RuneScape character through an in-game trade. Our team will provide the world and meeting location in Live Chat. Simply meet our trader, confirm the correct items and quantities, and complete the trade.",
  },
  {
    question: "How long does item delivery take?",
    answer:
      "We aim to complete most orders within 2-20 minutes after payment confirmation. Delivery can take longer for rare items, large quantities, or periods of high demand. Our support team can check availability and provide an estimated delivery time before you order.",
  },
  {
    question:
      "Do I need to create a SECNX account, verify my ID, or share my RuneScape password?",
    answer:
      "No. SECNX does not require account registration, ID verification, or your RuneScape password for any item purchase. You only need access to your own character to meet our trader in game. Please note that third-party payment processors may independently require identity verification under their own policies.",
  },
  {
    question: "Can I buy both OSRS and RS3 items?",
    answer:
      "Yes. Select the correct game before adding an item to your cart. OSRS and RS3 have separate inventories, so check the game, item name, variant and quantity before completing your purchase.",
  },
  {
    question: "What if I can't find the item or quantity I need?",
    answer:
      "Contact our 24/7 Live Chat. Tell us the item, game and quantity you're looking for, and we'll check availability and provide a quote where possible. This is especially useful for rare items, full equipment sets and larger orders.",
  },
  {
    question: "What if I'm not online when my order is ready?",
    answer:
      "Contact Live Chat when you're available to arrange collection. Our team will help coordinate a suitable delivery time. Please keep your order details so we can identify your purchase quickly.",
  },
  {
    question: "What if my item is unavailable after I pay?",
    answer:
      "Our team will contact you to explain the situation and discuss the available options. We won't substitute a different item without your agreement. If we cannot fulfil the order, we'll handle the outcome in accordance with our refund policy.",
  },
  {
    question: "Is buying RuneScape items safe?",
    answer:
      "We coordinate deliveries through Live Chat and provide clear in-game trading instructions. However, purchasing in-game items for real-world money is against Jagex's rules and carries a risk of account penalties. No third-party seller can guarantee zero risk.",
  },
  {
    question: "Can I get help before placing an order?",
    answer:
      "Absolutely. Our support team is available 24/7 to answer questions about item availability, pricing, quantities, payment options and delivery. Contact Live Chat before checkout if you'd like us to confirm anything.",
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

export default function ItemsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="items-faq-heading"
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
              HELP &amp; SUPPORT
            </span>
            <span className="h-px w-10 bg-[linear-gradient(270deg,transparent,#b88a26)]" />
          </div>
          <h2
            id="items-faq-heading"
            className="mt-4 font-[family-name:var(--font-eb-garamond)] text-5xl font-semibold leading-tight text-[#eef0ef] max-[640px]:text-3xl"
          >
            Frequently Asked{" "}
            <span className="bg-[linear-gradient(180deg,#ffdf70,#d4931a)] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-base text-[#8d9aa3] max-[640px]:text-sm">
            Everything you need to know about purchasing, collecting, and trading RuneScape items.
          </p>
        </header>

        {/* Accordion List */}
        <div className="reveal-init space-y-3.5">
          {itemsFaqs.map((faq, index) => {
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
