import type { ReactNode } from "react";

type Benefit = { title: ReactNode; description: ReactNode; icon: ReactNode };

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-14 w-14 text-[#ffdc5a]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.7"
    >
      {children}
    </svg>
  );
}

const benefits: Benefit[] = [
  {
    title: "Fast Delivery",
    description: (
      <>
        Delivery in 2-20 minutes
        <br />
        so you can get back to
        <br />
        the game.
      </>
    ),
    icon: (
      <IconFrame>
        <circle cx="32" cy="33" r="22" />
        <path d="M32 17v3m0 26v3M16 33h3m26 0h3M32 33l9 6m-9-6V23" />
        <path d="M25 8h14" />
      </IconFrame>
    ),
  },
  {
    title: "Instant Replies 24/7",
    description: (
      <>
        Get instant replies in under
        <br />1 minute whenever you need us
        <br />
        by experienced English
        <br />
        speakers.
      </>
    ),
    icon: (
      <IconFrame>
        <path d="M10 31a22 22 0 0 1 44 0" />
        <path d="M13 32v10a5 5 0 0 0 10 0V32a5 5 0 0 0-10 0Zm28 0v10a5 5 0 0 0 10 0V32a5 5 0 0 0-10 0Z" />
        <path d="M51 43c0 7-5 10-10 10" />
      </IconFrame>
    ),
  },
  {
    title: (
      <>
        No Id. No SECNX
        <br />
        Account Required.
      </>
    ),
    description: (
      <>
        We don’t collect identity
        <br />
        document or personal
        <br />
        registration
      </>
    ),
    icon: (
      <IconFrame>
        <path d="M32 8c7 5 14 6 20 6v15c0 13-8 22-20 27-12-5-20-14-20-27V14c6 0 13-1 20-6Z" />
        <path d="m23 31 6 6 12-13" />
      </IconFrame>
    ),
  },
  {
    title: (
      <>
        Many Payment
        <br />
        Methods
      </>
    ),
    description: (
      <>
        Choose from many
        <br />
        payment methods that
        <br />
        work for you
      </>
    ),
    icon: (
      <IconFrame>
        <rect x="6" y="13" width="52" height="36" rx="4" />
        <path d="M7 24h50M18 38h4m7 0h4m7 0h4" />
      </IconFrame>
    ),
  },
  {
    title: "Safe & Secure",
    description: (
      <>
        Carefully sourced gold for
        <br />
        safer trades and peace of mind.
      </>
    ),
    icon: (
      <IconFrame>
        <path d="M32 8 10 18v15c0 12 9 19 22 23 13-4 22-11 22-23V18L32 8Z" />
        <rect x="23" y="31" width="18" height="15" rx="2" />
        <path d="M27 31v-5a5 5 0 0 1 10 0v5m-5 6v4" />
      </IconFrame>
    ),
  },
  {
    title: "Large Stock Available",
    description: (
      <>
        Extensive stock ready for
        <br />
        fast delivery.
      </>
    ),
    icon: (
      <IconFrame>
        <circle cx="20" cy="22" r="6" fill="currentColor" stroke="none" />
        <circle cx="32" cy="17" r="7" fill="currentColor" stroke="none" />
        <circle cx="44" cy="22" r="6" fill="currentColor" stroke="none" />
        <path
          d="M11 44c0-8 5-13 12-13 4 0 7 2 9 5 2-3 5-5 9-5 7 0 12 5 12 13"
          fill="currentColor"
          stroke="none"
        />
        <path d="M10 45h44v8H10z" />
        <path d="M20 45v8m24-8v8" />
      </IconFrame>
    ),
  },
];

export default function WhyPlayersBuy() {
  return (
    <section className="relative overflow-hidden bg-[#020f14] px-6 py-14 font-[family-name:var(--font-inter)] max-[640px]:px-4 max-[640px]:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#182b31]" />
      <div className="relative mx-auto max-w-[1320px]">
        <div className="mb-8 flex items-center justify-center gap-6 max-[640px]:gap-3">
          <span className="h-px w-[31px] bg-[#b88a26]" />
          <h2 className="font-[family-name:var(--font-eb-garamond)] text-[27px] leading-none text-[#aeb5b9] max-[640px]:text-2xl">
            Why Players Choose SECNX
          </h2>
          <span className="h-px w-[31px] bg-[#b88a26]" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 max-[640px]:grid-cols-1">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="flex min-h-[276px] flex-col items-center rounded-lg border-[2.67px] border-amber-500 px-3 py-8 text-center"
            >
              <div className="mb-2 flex h-14 items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="flex min-h-6 items-center justify-center text-base font-light leading-5 text-amber-500">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm font-light leading-5 text-white">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
