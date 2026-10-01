import Image from "next/image";
import Link from "next/link";

const links = [
  "HOME",
  "BUY OSRS GOLD",
  "SELL OSRS GOLD",
  "BUY RS3 GOLD",
  "SELL RS3 GOLD",
  "ITEMS",
];

export default function Navbar() {
  return (
    <header className="relative z-10 flex h-20 items-center justify-between bg-[#19202f] px-[6.667%] py-3 max-[1500px]:px-[3%] max-[1100px]:px-6">
      <Link href="/" className="shrink-0" aria-label="Secnx home">
        <Image
          src="/assets/site-logo.svg"
          alt="Secnx"
          width={94}
          height={40}
          priority
        />
      </Link>
      <nav
        className="flex h-full items-center gap-10 font-[family-name:var(--font-inter)] text-base font-semibold text-white max-[1500px]:gap-5 max-[1100px]:hidden"
        aria-label="Primary navigation"
      >
        {links.map((link, index) => (
          <Link
            key={link}
            href="#"
            className={`relative flex h-full items-center whitespace-nowrap ${index === 0 ? "text-[#dc9c20] after:absolute after:bottom-[-12px] after:left-0 after:h-1 after:w-[49px] after:rounded-t-[20px] after:bg-[#dc9c20]" : ""}`}
          >
            {link}
          </Link>
        ))}
        <Link href="#" className="flex items-center gap-2 whitespace-nowrap">
          OSRS SERVICES{" "}
          <Image src="/assets/nav-chevron.svg" alt="" width={16} height={16} />
        </Link>
      </nav>
      <div className="flex items-center gap-8 font-[family-name:var(--font-inter)] max-[1500px]:gap-[18px]">
        <Link
          href="#"
          className="text-lg font-bold text-white max-[640px]:hidden"
        >
          Blog
        </Link>
        <Link
          href="#"
          className="text-base font-bold text-white max-[640px]:hidden"
        >
          Contact
        </Link>
        <Link
          href="#"
          className="relative flex size-14 items-center justify-center rounded-[60px] bg-[#1b2130] max-[640px]:hidden"
          aria-label="Shopping cart"
        >
          <Image src="/assets/nav-cart.svg" alt="" width={24} height={24} />
          <span className="absolute right-[-3px] top-0 flex size-6 items-center justify-center rounded-full bg-[#c4af8a] text-sm font-bold text-white">
            0
          </span>
        </Link>
        <Link
          href="#"
          className="rounded-[7px] bg-[#dc9c20] px-6 py-3 text-base font-bold text-white"
        >
          Log in
        </Link>
      </div>
    </header>
  );
}
