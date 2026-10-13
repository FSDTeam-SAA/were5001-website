export function CornerOrnament({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const posClasses = {
    tl: "-top-[2px] -left-[2px]",
    tr: "-top-[2px] -right-[2px] scale-x-[-1]",
    bl: "-bottom-[2px] -left-[2px] scale-y-[-1]",
    br: "-bottom-[2px] -right-[2px] -scale-100",
  }[position];

  return (
    <div className={`pointer-events-none absolute ${posClasses} z-10 size-5.5`}>
      <svg viewBox="0 0 24 24" fill="none" className="size-full">
        <path
          d="M1 18V5a4 4 0 0 1 4-4h13"
          stroke="#e5a93c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M2 2L9 9"
          stroke="#ffd95b"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="5" cy="5" r="1.2" fill="#ffd95b" />
      </svg>
    </div>
  );
}
