import type { ReactNode } from "react";

type Benefit = {
  title: string;
  description: string;
  icon: ReactNode;
};

function IconContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid size-14 place-items-center rounded-2xl border border-[#d6a43a]/35 bg-[linear-gradient(180deg,rgba(214,164,58,0.14),rgba(214,164,58,0.02))] text-[#ffd75a] shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-[#d6a43a]/70 group-hover:shadow-[0_0_20px_rgba(214,164,58,0.35)] group-hover:scale-105">
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="size-8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      >
        {children}
      </svg>
    </div>
  );
}

const benefits: Benefit[] = [
  {
    title: "Fast Delivery",
    description: "Delivery in 2-20 minutes so you can get back to the game immediately.",
    icon: (
      <IconContainer>
        <circle cx="32" cy="33" r="21" />
        <path d="M32 18v3m0 24v3M17 33h3m24 0h3M32 33l8 5m-8-5V24" />
        <path d="M26 9h12" />
      </IconContainer>
    ),
  },
  {
    title: "Instant Replies 24/7",
    description: "Replies in under 1 minute whenever you need us, staffed by experienced English speakers.",
    icon: (
      <IconContainer>
        <path d="M11 31a21 21 0 0 1 42 0" />
        <path d="M14 32v10a4 4 0 0 0 8 0V32a4 4 0 0 0-8 0Zm28 0v10a4 4 0 0 0 8 0V32a4 4 0 0 0-8 0Z" />
        <path d="M50 42c0 7-5 10-10 10" />
      </IconContainer>
    ),
  },
  {
    title: "No ID / Account Required",
    description: "We don't collect identity documents or require personal registrations to trade.",
    icon: (
      <IconContainer>
        <path d="M32 9c7 5 13 6 19 6v14c0 12-8 21-19 26-11-5-19-14-19-26V15c6 0 12-1 19-6Z" />
        <path d="m24 31 5 5 11-12" />
      </IconContainer>
    ),
  },
  {
    title: "Many Payment Methods",
    description: "Choose from a wide variety of secure global and local payment methods that work for you.",
    icon: (
      <IconContainer>
        <rect x="7" y="14" width="50" height="36" rx="5" />
        <path d="M7 25h50M18 39h4m7 0h4m7 0h4" />
      </IconContainer>
    ),
  },
  {
    title: "Safe & Secure",
    description: "Carefully sourced gold for safer trades, zero hassle, and complete peace of mind.",
    icon: (
      <IconContainer>
        <path d="M32 9 11 18v14c0 12 9 18 21 22 12-4 21-10 21-22V18L32 9Z" />
        <rect x="24" y="31" width="16" height="14" rx="2" />
        <path d="M28 31v-4a4 4 0 0 1 8 0v4m-4 5v3" />
      </IconContainer>
    ),
  },
  {
    title: "Large Stock Available",
    description: "Extensive reserves ready around the clock for instant fulfillment on any size order.",
    icon: (
      <IconContainer>
        <circle cx="21" cy="23" r="5" fill="currentColor" stroke="none" />
        <circle cx="32" cy="18" r="6" fill="currentColor" stroke="none" />
        <circle cx="43" cy="23" r="5" fill="currentColor" stroke="none" />
        <path
          d="M12 43c0-7 5-11 11-11 4 0 6 2 9 4 3-2 5-4 9-4 6 0 11 4 11 11"
          fill="currentColor"
          stroke="none"
        />
        <path d="M11 44h42v7H11z" />
        <path d="M20 44v7m24-7v7" />
      </IconContainer>
    ),
  },
];

export default function WhyPlayersBuy() {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="relative overflow-hidden bg-[#020f14] px-6 py-20 font-[family-name:var(--font-inter)] text-white max-[640px]:px-4 max-[640px]:py-14"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(214,164,58,0.09),transparent_70%),radial-gradient(ellipse_40%_50%_at_10%_80%,rgba(14,70,77,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#182b31,transparent)]" />

      <div className="relative mx-auto max-w-[1320px]">
        {/* Section Header */}
        <header className="reveal-init mb-14 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,#b88a26)]" />
            <span className="text-xs font-semibold tracking-[0.32em] text-[#d6a43a]">
              THE SECNX ADVANTAGE
            </span>
            <span className="h-px w-10 bg-[linear-gradient(270deg,transparent,#b88a26)]" />
          </div>
          <h2
            id="why-choose-heading"
            className="mt-4 font-[family-name:var(--font-eb-garamond)] text-5xl font-semibold leading-tight text-[#eef0ef] max-[640px]:text-3xl"
          >
            Why Players Choose{" "}
            <span className="bg-[linear-gradient(180deg,#ffdf70,#d4931a)] bg-clip-text text-transparent">
              SECNX
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-base text-[#8d9aa3] max-[640px]:text-sm">
            Fast trades, zero verification hassle, and competitive rates trusted by thousands of RuneScape players.
          </p>
        </header>

        {/* Benefits Grid */}
        <div className="reveal-init grid grid-cols-6 gap-5 max-[1240px]:grid-cols-3 max-[680px]:grid-cols-1">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="group relative flex min-h-[290px] flex-col items-center rounded-2xl border border-[#21313e] bg-[linear-gradient(160deg,rgba(18,29,38,0.8),rgba(7,15,21,0.95))] p-6 text-center shadow-[0_12px_28px_-12px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d6a43a]/55 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9),0_0_24px_-6px_rgba(214,164,58,0.25)]"
            >
              {/* Subtle gold top line accent */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d6a43a]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon Container */}
              <div className="mb-5 flex items-center justify-center">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold leading-snug text-[#f0f4f7] transition-colors duration-200 group-hover:text-[#ffdf70]">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-[13px] leading-relaxed text-[#8c9ba5] transition-colors duration-200 group-hover:text-[#a5b4be]">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
