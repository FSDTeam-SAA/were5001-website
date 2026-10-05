"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I collect my order?",
    answer:
      "Place your order on our site through any payment method, then join the livechat and let us know your RSN that you provided in the order. If you forget your RSN, you may provide your first name. We'll give you a location in game to pick up your order, usually within minutes.",
  },
  {
    question: "How safe is our gold?",
    answer:
      "Every order is carefully sourced and delivered by experienced traders, so you can trade with confidence.",
  },
  {
    question: "Do you collect ID verification?",
    answer:
      "No. We do not ask for identity documents or require an account to place an order.",
  },
  {
    question: "How can I contact you?",
    answer:
      "Join our live chat at any time. Our English-speaking team is available 24/7.",
  },
  {
    question: "What if I'm not online to collect the order?",
    answer:
      "Contact us through live chat when you are ready, and we will arrange a convenient in-game collection time.",
  },
];

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 max-[640px]:size-8 ${isOpen
        ? "border-[#d6a43a] bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-yellow-950 shadow-[0_0_15px_rgba(214,164,58,0.45)]"
        : "border-[#2c3d4a] bg-[#121f29] text-[#9eb0bc] group-hover:border-[#d6a43a]/50 group-hover:text-white"
        }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
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
            id="faq-heading"
            className="mt-4 font-[family-name:var(--font-eb-garamond)] text-5xl font-semibold leading-tight text-[#eef0ef] max-[640px]:text-3xl"
          >
            Frequently Asked{" "}
            <span className="bg-[linear-gradient(180deg,#ffdf70,#d4931a)] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-base text-[#8d9aa3] max-[640px]:text-sm">
            Everything you need to know about buying, selling, and receiving your RuneScape gold.
          </p>
        </header>

        {/* Accordion List */}
        <div className="reveal-init space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className={`group overflow-hidden rounded-xl border transition-all duration-300 ${isOpen
                  ? "border-[#d6a43a]/60 bg-[linear-gradient(160deg,rgba(20,32,42,0.92),rgba(8,16,22,0.98))] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.8),0_0_24px_-8px_rgba(214,164,58,0.22)]"
                  : "border-[#202e3a] bg-[linear-gradient(160deg,rgba(16,25,33,0.7),rgba(8,14,20,0.85))] hover:border-[#d6a43a]/30 hover:bg-[linear-gradient(160deg,rgba(20,30,40,0.8),rgba(10,18,24,0.9))]"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors max-[640px]:px-5 max-[640px]:py-4"
                >
                  <span
                    className={`text-lg font-semibold transition-colors duration-200 max-[640px]:text-base ${isOpen
                      ? "text-[#f3ead0]"
                      : "text-[#dbe3e8] group-hover:text-white"
                      }`}
                  >
                    {faq.question}
                  </span>
                  <ToggleIcon isOpen={isOpen} />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen
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
