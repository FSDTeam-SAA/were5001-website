"use client";

import { useState } from "react";

const faqs = [
  { question: "How do I collect my order?", answer: "Place your order on our site through any payment method, then join the livechat and let us know your RSN that you provided in the order. If you forget your RSN, you may provide your first name. We'll give you a location in game to pick up your order, usually within minutes." },
  { question: "How safe is our gold?", answer: "Every order is carefully sourced and delivered by experienced traders, so you can trade with confidence." },
  { question: "Do you collect ID verification?", answer: "No. We do not ask for identity documents or require an account to place an order." },
  { question: "How can I contact you?", answer: "Join our live chat at any time. Our English-speaking team is available 24/7." },
  { question: "What if I'm not online to collect the order?", answer: "Contact us through live chat when you are ready, and we will arrange a convenient in-game collection time." },
];

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return <span className={`grid size-11 shrink-0 place-items-center rounded-full ${isOpen ? "bg-[#5d4800] text-[#f7c73f]" : "bg-[#29333e] text-[#d4d8dc]"}`}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 12h12" />{!isOpen && <path d="M12 6v12" />}</svg></span>;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#020f14] px-6 py-16 font-[family-name:var(--font-inter)] max-[640px]:px-4 max-[640px]:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_60%,rgba(0,135,150,.14),transparent_27%),radial-gradient(ellipse_at_100%_100%,rgba(30,55,160,.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1672px]">
        <div className="mb-9 flex items-center justify-center gap-6 max-[640px]:gap-3">
          <span className="h-1.5 w-60 bg-[linear-gradient(90deg,transparent,#b7800d)] max-[640px]:w-16" />
          <h2 className="whitespace-nowrap text-center text-5xl font-medium leading-tight text-stone-500 max-[640px]:text-2xl">Frequently Asked Questions</h2>
          <span className="h-1.5 w-36 bg-[linear-gradient(90deg,#b7800d,transparent)] max-[640px]:w-16" />
        </div>
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return <article key={faq.question} className={`overflow-hidden border-[2.67px] ${isOpen ? "rounded-tl-lg rounded-tr-2xl rounded-br-lg border-zinc-900 bg-neutral-900" : "rounded-tl-[40px] rounded-tr-2xl rounded-bl-2xl rounded-br-lg border-gray-900 bg-slate-950"}`}>
              <button type="button" className={`flex w-full items-center justify-between gap-6 px-12 text-left text-2xl font-light text-stone-500 transition-colors hover:text-stone-300 max-[640px]:px-5 max-[640px]:text-base ${isOpen ? "pt-5" : "min-h-16"}`} onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen}>
                <span>{faq.question}</span><ToggleIcon isOpen={isOpen} />
              </button>
              {isOpen && <p className="max-w-[1523px] px-12 pb-6 pt-3 text-2xl font-light leading-8 text-gray-600 max-[640px]:px-5 max-[640px]:pb-5 max-[640px]:text-sm max-[640px]:leading-6">{faq.answer}</p>}
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
