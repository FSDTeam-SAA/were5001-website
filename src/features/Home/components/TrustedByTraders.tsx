import Image from "next/image";

type Review = {
  name: string;
  avatar: string;
  review: string;
};

const reviews: Review[] = [
  {
    name: "Astral Pernix",
    avatar: "/assets/review-astral-pernix.png",
    review:
      "Sold 2B OSRS 07 in about 15 minutes total. Fast and doesn't waste time. Many payments available.",
  },
  {
    name: "Jun Iron",
    avatar: "/assets/review-jun-iron.png",
    review:
      "I think this is the 3rd or 4th time that I buy gold from them, and they are by far the cheapest on the market and the fastest. Replies are almost instant. Some trades can take a couple minutes, but thats normal. With their prices, I'm not surprised its a long time to get the gold xd",
  },
  {
    name: "Ville Häkkilä",
    avatar: "/assets/review-ville-hakkila.png",
    review:
      "Another good trade. I sold 30b RS3 gp to Secnx. I've sold RS3 gp to Secnx several times in the past three years and all the trades have gone well.",
  },
];

const TRUSTPILOT_URL = "https://www.trustpilot.com/review/secnx.com";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.5l2.94 6.1 6.56.9-4.78 4.6 1.17 6.6L12 17.6l-5.89 3.1 1.17-6.6L2.5 9.5l6.56-.9z" />
    </svg>
  );
}

/** Trustpilot-style rating boxes. `rating` supports halves (e.g. 4.5). */
function TrustpilotStars({ rating = 5, size = "md" }: { rating?: number; size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-[18px] rounded-[3px]" : "size-9 rounded-md max-[640px]:size-7";
  const icon = size === "sm" ? "size-3" : "size-6 max-[640px]:size-5";
  return (
    <div className="flex gap-[3px]" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span
            key={i}
            className={`grid place-items-center ${box}`}
            style={{ background: `linear-gradient(90deg,#00b67a ${fill}%,#3a4650 ${fill}%)` }}
          >
            <StarIcon className={`${icon} text-white`} />
          </span>
        );
      })}
    </div>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="h-14 w-px bg-[linear-gradient(180deg,transparent,rgba(214,164,58,.45),transparent)] max-[900px]:hidden"
    />
  );
}

export default function TrustedByTraders() {
  return (
    <section
      aria-labelledby="trusted-heading"
      className="relative overflow-hidden bg-[#020f14] px-6 py-20 font-[family-name:var(--font-inter)] text-white max-[640px]:px-4 max-[640px]:py-14"
    >
      {/* Ambient glows + hairline separator */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(214,164,58,.10),transparent_70%),radial-gradient(ellipse_35%_45%_at_0%_70%,rgba(14,70,77,.30),transparent_70%),radial-gradient(ellipse_35%_45%_at_100%_80%,rgba(16,60,70,.22),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#3a3220,transparent)]" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* Heading */}
        <header className="reveal-init text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,#b88a26)]" />
            <span className="text-xs font-semibold tracking-[.32em] text-[#d6a43a]">TESTIMONIALS</span>
            <span className="h-px w-10 bg-[linear-gradient(270deg,transparent,#b88a26)]" />
          </div>
          <h2
            id="trusted-heading"
            className="mt-4 font-[family-name:var(--font-eb-garamond)] text-[52px] font-semibold leading-[1.1] text-[#eef0ef] max-[640px]:text-[34px]"
          >
            Trusted by{" "}
            <span className="bg-[linear-gradient(180deg,#f6dc8a,#d6a43a)] bg-clip-text text-transparent">
              150+ Happy Players
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed text-[#8d9aa3] max-[640px]:text-sm">
            Real trades from real players. See why the RuneScape community keeps coming back to SECNX for gold.
          </p>
        </header>

        {/* Stats bar */}
        <div className="reveal-init mx-auto mt-10 flex max-w-[980px] items-center justify-around gap-6 rounded-2xl border border-[#d6a43a]/20 bg-[linear-gradient(145deg,rgba(20,31,40,.75),rgba(8,16,22,.85))] px-8 py-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8),inset_0_1px_0_rgba(255,255,255,.04)] backdrop-blur-sm max-[900px]:flex-col max-[900px]:gap-7 max-[640px]:px-5">
          {/* Trustpilot score */}
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="trustpilot-rating-link"
            className="group flex items-center gap-4 max-[640px]:flex-col max-[640px]:gap-2"
          >
            <div className="flex items-center gap-1.5">
              <StarIcon className="size-7 text-[#00b67a]" />
              <span className="text-2xl font-bold tracking-tight">Trustpilot</span>
            </div>
            <TrustpilotStars rating={4.5} />
            <div className="leading-tight max-[640px]:text-center">
              <div className="text-2xl font-extrabold text-white">
                4.5<span className="text-base font-semibold text-[#8d9aa3]">/5</span>
              </div>
              <div className="text-xs font-medium text-[#00b67a] group-hover:underline">Excellent</div>
            </div>
          </a>

          <Divider />

          <div className="text-center">
            <div className="bg-[linear-gradient(180deg,#f6dc8a,#d6a43a)] bg-clip-text text-4xl font-extrabold leading-none text-transparent">
              150+
            </div>
            <div className="mt-1.5 text-xs font-semibold tracking-[.2em] text-[#aeb5b9]">VERIFIED REVIEWS</div>
          </div>

          <Divider />

          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-[#d6a43a]/40 bg-[#d6a43a]/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e2c66a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Real Players</div>
              <div className="text-sm font-semibold text-[#d6a43a]">Real Results</div>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="reveal-init mt-10 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#22303a] bg-[linear-gradient(160deg,rgba(22,34,44,.95),rgba(8,16,22,.98))] p-7 shadow-[0_18px_40px_-18px_rgba(0,0,0,.9)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#d6a43a]/45 hover:shadow-[0_26px_50px_-18px_rgba(0,0,0,.95),0_0_30px_-10px_rgba(214,164,58,.35)] max-[640px]:p-5"
            >
              {/* Gold top accent */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,#d6a43a,transparent)] opacity-40 transition-opacity group-hover:opacity-100" />
              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-2 font-[family-name:var(--font-eb-garamond)] text-[96px] leading-none text-[#d6a43a]/15 transition-colors group-hover:text-[#d6a43a]/30"
              >
                &rdquo;
              </span>

              <TrustpilotStars rating={5} size="sm" />

              <blockquote className="mt-5 flex-1 text-[15px] leading-[1.7] text-[#b7c2ca]">
                &ldquo;{review.review}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[.06] pt-5">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#d6a43a]/70 ring-offset-2 ring-offset-[#0c161d]">
                  <Image src={review.avatar} alt={review.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-semibold text-[#eef0ef]">{review.name}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-[#00b67a]">
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-3.5">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.7 6.2-4.3 4.3a.75.75 0 0 1-1.06 0L4.3 8.47a.75.75 0 1 1 1.06-1.06l1.5 1.5 3.78-3.77a.75.75 0 1 1 1.06 1.06" />
                    </svg>
                    Verified Buyer
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#00b67a]/30 bg-[#00b67a]/10 px-2.5 py-1 text-[11px] font-semibold text-[#00b67a]">
                  <StarIcon className="size-3" />
                  Trustpilot
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="trustpilot-all-reviews-link"
            className="group inline-flex items-center gap-2 rounded-full border border-[#d6a43a]/50 px-6 py-3 text-sm font-semibold text-[#e2c66a] transition-colors hover:bg-[#d6a43a] hover:text-[#1a1406]"
          >
            Read all reviews on Trustpilot
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.79l-3.15-3.15a.5.5 0 1 1 .71-.7l4 4a.5.5 0 0 1 0 .7l-4 4a.5.5 0 0 1-.71-.7L13.29 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
