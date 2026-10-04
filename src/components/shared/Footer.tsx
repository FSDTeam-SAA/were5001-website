const linkGroups = [
  { title: "OSRS Gold", links: ["Buy OSRS Gold", "Sell OSRS Gold", "OSRS Items", "OSRS Services"] },
  { title: "RS3 Gold", links: ["Buy RS3 Gold", "Sell RS3 Gold", "RS3 Items", "RS3 Services"] },
  { title: "Support", links: ["Contact Us", "FAQ", "Trading Guide", "Order Status"] },
  { title: "Company", links: ["About Us", "Blog", "Reviews", "Careers"] },
  { title: "Legal", links: ["Terms and Conditions", "Privacy Policy", "Refund Policy", "AML Policy"] },
];

const payments = Array.from({ length: 15 }, (_, index) => `/assets/footer/payment-${String(index + 1).padStart(2, "0")}.png`);

function SocialLink({ label, children }: { label: string; children: React.ReactNode }) {
  return <a href="#" aria-label={label} className="grid size-7 place-items-center text-white transition-colors hover:text-amber-400">{children}</a>;
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#020609] px-6 py-8 font-[family-name:var(--font-inter)] text-[#c7c8cb] max-[640px]:px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_8%_55%,rgba(111,81,35,.22),transparent_22%),radial-gradient(ellipse_at_90%_0%,rgba(92,76,59,.14),transparent_25%),linear-gradient(115deg,rgba(0,0,0,.56),rgba(0,0,0,.78))]" />
      <div className="relative mx-auto max-w-[1645px]">
        <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-9 max-[1050px]:grid-cols-1 max-[1050px]:gap-8">
          <div className="border-r border-white/15 pr-8 max-[1050px]:border-b max-[1050px]:border-r-0 max-[1050px]:pb-7 max-[1050px]:pr-0">
            <Image src="/assets/logo-nav.svg" alt="SECNX" width={94} height={40} className="h-auto w-[94px]" />
            <p className="mt-7 max-w-[220px] text-base leading-6 text-[#c7c8cb]">Your trusted partner for RS3 &amp; OSRS gold trading. Fast delivery, secure transactions, and 24/7 support you can count on.</p>
            <div className="mt-5 flex items-center gap-2">
              <SocialLink label="Facebook"><span className="text-2xl font-black">f</span></SocialLink>
              <SocialLink label="Instagram"><span className="rounded-[7px] border-2 border-current px-[3px] text-xs font-black">◎</span></SocialLink>
              <SocialLink label="Discord"><span className="text-lg font-black">◉</span></SocialLink>
              <SocialLink label="Twitter"><span className="text-xl">♥</span></SocialLink>
              <SocialLink label="YouTube"><span className="rounded-md bg-current px-1.5 py-0.5 text-[10px] font-black text-[#020609]">▶</span></SocialLink>
            </div>
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-5 border-b border-white/15 pb-5 max-[1050px]:grid-cols-3 max-[640px]:grid-cols-2">
              {linkGroups.map((group) => (
                <nav key={group.title} className="border-l border-white/15 px-5 first:border-l-0 first:pl-0 max-[640px]:border-0 max-[640px]:px-0 max-[640px]:pb-6">
                  <h2 className="text-xl font-medium text-[#dc9c20]">{group.title.toUpperCase()}</h2>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => <li key={link}><a href="#" className="flex items-center gap-1 text-base transition-colors hover:text-amber-400"><span className="text-[#dc9c20]">›</span>{link}</a></li>)}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-5 gap-3.5 max-[800px]:grid-cols-3 max-[480px]:grid-cols-2">
              {payments.map((payment, index) => <div key={payment} className="flex h-[57px] items-center justify-center overflow-hidden rounded-[9px] bg-white shadow-[0_2px_5px_rgba(0,0,0,.5)]"><Image src={payment} alt={`Payment method ${index + 1}`} width={240} height={57} className="h-full w-full object-contain" /></div>)}
            </div>
            <p className="mt-5 text-center text-xs text-[#bfbfbf]">© 2024 Secnx. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
import Image from "next/image";
