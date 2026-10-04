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
    review: "Sold 2B OSRS 07 in about 15 minutes total. Fast and doesn't waste time. Many payments available.",
  },
  {
    name: "Jun Iron",
    avatar: "/assets/review-jun-iron.png",
    review: "I think this is the 3rd or 4th time that I buy gold from them, and they are by far the cheapest on the market and the fastest. Replies are almost instant. Some trades can take a couple minutes, but thats normal. With their prices, I'm not surprised its a long time to get the gold xd",
  },
  {
    name: "Ville Häkkilä",
    avatar: "/assets/review-ville-hakkila.png",
    review: "Another good trade. I sold 30b RS3 gp to Secnx. I've sold RS3 gp to Secnx several times in the past three years and all the trades have gone well.",
  },
];

function RatingStars() {
  return <span aria-label="5 out of 5 stars" className="text-[14px] leading-none tracking-[1px] text-[#f5b72b]">★★★★★</span>;
}

function TrustpilotStar({ inverse = false }: { inverse?: boolean }) {
  return <span aria-hidden="true" className={inverse ? "text-[29px] leading-none text-white" : "text-[31px] leading-none text-[#00b67a]"}>★</span>;
}

function VerifiedReviewBadge() {
  return (
    <div className="flex items-center justify-center max-[640px]:scale-90">
      <svg aria-hidden="true" viewBox="0 0 64 96" className="h-24 w-16 text-[#ca951a]" fill="none">
        <path d="M52 10C34 24 34 71 52 86" stroke="currentColor" strokeWidth="1.6" opacity=".45" />
        {[14, 27, 40, 53, 66, 79].map((y, index) => <path key={y} d={`M${50 - index * 2.2} ${y}l9 4`} stroke="currentColor" strokeWidth="2" opacity={.75 - index * .09} />)}
        <rect x="51" y="10" width="5" height="76" stroke="currentColor" strokeWidth="1.5" opacity=".4" />
      </svg>
      <div className="flex min-w-[218px] flex-col items-center rounded-3xl border-2 border-[#c88e14] px-5 py-[18px] text-center">
        <strong className="font-[family-name:var(--font-orbitron)] text-5xl font-black leading-[48px] text-amber-500">150+</strong>
        <span className="mt-1 text-lg font-black leading-7 tracking-[.16em] text-[#c88e14]">VERIFIED REVIEWS</span>
        <span className="my-2.5 h-[1.6px] w-16 bg-[#c88e14]/30" />
        <span className="text-base font-semibold leading-6 tracking-[.12em] text-stone-500">REAL PLAYERS</span>
        <span className="text-base font-semibold leading-6 tracking-[.12em] text-stone-500">REAL RESULTS</span>
      </div>
      <svg aria-hidden="true" viewBox="0 0 64 96" className="h-24 w-16 -scale-x-100 text-[#ca951a]" fill="none">
        <path d="M52 10C34 24 34 71 52 86" stroke="currentColor" strokeWidth="1.6" opacity=".45" />
        {[14, 27, 40, 53, 66, 79].map((y, index) => <path key={y} d={`M${50 - index * 2.2} ${y}l9 4`} stroke="currentColor" strokeWidth="2" opacity={.75 - index * .09} />)}
        <rect x="51" y="10" width="5" height="76" stroke="currentColor" strokeWidth="1.5" opacity=".4" />
      </svg>
    </div>
  );
}

export default function TrustedByTraders() {
  return (
    <section className="relative overflow-hidden bg-[#020f14] px-6 py-5 font-[family-name:var(--font-inter)] text-white max-[640px]:px-4 max-[640px]:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_7%_55%,rgba(14,70,77,.28),transparent_25%),radial-gradient(ellipse_at_95%_20%,rgba(16,60,70,.17),transparent_22%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between gap-10 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-8">
          <div className="min-w-0">
            <h2 className="text-6xl font-black leading-[1.2] tracking-wide text-white max-[640px]:text-[38px]">
              Trusted by <span className="text-amber-500">150+ Happy Players</span>
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-5 max-[640px]:gap-3">
              <div className="flex items-center gap-2.5">
                <TrustpilotStar />
                <span className="text-3xl font-bold leading-10 text-white">Trustpilot</span>
              </div>
              <div className="flex gap-1.5" aria-label="Trustpilot rating: 4.5 out of 5">
                {[0, 1, 2, 3].map((star) => <span key={star} className="grid size-12 place-items-center rounded-[9.64px] bg-[#00b67a]"><TrustpilotStar inverse /></span>)}
                <span className="relative grid size-12 place-items-center overflow-hidden rounded-[9.64px] bg-neutral-200 before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-[#00b67a]"><span className="relative"><TrustpilotStar inverse /></span></span>
              </div>
              <span className="text-3xl font-black leading-10 text-stone-300">4.5/5</span>
            </div>
          </div>
          <VerifiedReviewBadge />
        </div>

        <div className="mt-7 grid grid-cols-3 gap-6 max-[900px]:gap-4 max-[700px]:grid-cols-1">
          {reviews.map((review) => (
            <article key={review.name} className="flex min-h-[216px] flex-col rounded-[11px] border border-[#263039] bg-[linear-gradient(145deg,rgba(20,31,40,.92),rgba(9,18,24,.95))] px-[15px] py-[14px] shadow-[0_9px_20px_rgba(0,0,0,.2)]">
              <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#d1b36d] shadow-inner">
                  <Image src={review.avatar} alt="" fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold leading-4 text-[#eef0ef]">{review.name}</h3>
                  <RatingStars />
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-[14px] text-[#9eaeb9]">&quot;{review.review}&quot;</p>
              <div className="mt-auto flex items-center gap-5 pt-3 text-[10px] font-medium">
                <span className="flex items-center gap-1.5 text-[#00b67a]"><span className="grid size-3 place-items-center rounded-[3px] bg-[#00b67a] text-[9px] text-white">✓</span>Verified Buyer</span>
                <span>on</span>
                <span className="flex items-center gap-1.5 text-[#00b67a]"><span className="text-sm leading-none">★</span>Trustpilot</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
