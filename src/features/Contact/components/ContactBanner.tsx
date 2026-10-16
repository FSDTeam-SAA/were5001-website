"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Headphones,
  ExternalLink,
  X,
  Send,
  Clock,
  Users,
} from "lucide-react";

const DISCORD_SERVER_ID = "46252435872857";
const DISCORD_INVITE_URL = "https://discord.gg/secnx";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function ChatDotsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" fill="currentColor" fillOpacity="0.15" />
      <circle cx="8" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="16" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const posClasses = {
    tl: "-top-[2px] -left-[2px]",
    tr: "-top-[2px] -right-[2px] scale-x-[-1]",
    bl: "-bottom-[2px] -left-[2px] scale-y-[-1]",
    br: "-bottom-[2px] -right-[2px] -scale-100",
  }[position];

  return (
    <div className={`pointer-events-none absolute ${posClasses} z-10 size-5.5`}>
      <svg viewBox="0 0 24 24" fill="none" className="size-full">
        {/* Outer corner frame */}
        <path
          d="M1 18V5a4 4 0 0 1 4-4h13"
          stroke="#e5a93c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Inner gold diagonal accent */}
        <path d="M2 2L9 9" stroke="#ffd95b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="5" cy="5" r="1.2" fill="#ffd95b" />
      </svg>
    </div>
  );
}

export default function ContactBanner() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! Welcome to SECNX 24/7 Live Support. How can we help you with your order today?",
    },
  ]);

  useEffect(() => {
    const pay = searchParams.get("pay");
    const item = searchParams.get("item");
    const price = searchParams.get("price");

    if (pay || item) {
      setChatOpen(true);
      const userInquiry = `Hi, I would like to pay with ${pay ? pay.toUpperCase() : "CARD PAY"} for ${item || "my purchase"} (Amount: $${price || "0.00"}). Could you please guide me through the payment?`;
      setChatHistory([
        {
          sender: "bot",
          text: "Hello! Welcome to SECNX 24/7 Live Support. An agent is online to assist you.",
        },
        {
          sender: "user",
          text: userInquiry,
        },
        {
          sender: "bot",
          text: `Thank you for choosing SECNX! We have received your request to pay via ${pay ? pay.toUpperCase() : "Card Pay"} for ${item || "your order"} ($${price || "0.00"}). An agent will provide the secure checkout link or tag right now.`,
        },
      ]);
    }
  }, [searchParams]);

  const handleCopyId = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(DISCORD_SERVER_ID);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage.trim();
    setChatHistory((prev) => [...prev, { sender: "user", text: userText }]);
    setChatMessage("");

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "An agent is reviewing your inquiry. For immediate trade verification, please provide your Order ID.",
        },
      ]);
    }, 900);
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-14 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-16 sm:pb-32">
      {/* 1. Background Artwork from public/assets/footer-image.png - matching user screenshot */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
        style={{ backgroundImage: "url('/assets/footer-image.png')" }}
      />

      {/* 2. Ambient lighting & gradients for maximum clarity and rich aesthetics */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(2,6,9,0.30)_15%,rgba(2,6,9,0.50)_60%,rgba(1,4,7,0.88)_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#d6a43a]/12 blur-[130px]" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Top Diamond Ornament */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,transparent,#d6a43a)] opacity-70" />
            <span className="text-[#d6a43a] text-lg font-serif">◇</span>
            <span className="h-px w-12 sm:w-16 bg-[linear-gradient(90deg,#d6a43a,transparent)] opacity-70" />
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-eb-garamond)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.14em] uppercase">
            <span className="text-[#e5a93c] drop-shadow-[0_2px_14px_rgba(214,164,58,0.55)]">
              CONTACT
            </span>{" "}
            <span className="text-[#f1f5f9] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
              SECNX
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-sm sm:text-base font-medium text-[#8e9ca7]">
            Real support, available 24/7.
          </p>
        </div>

        {/* Support Options Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 max-w-4xl mx-auto">
          {/* Card 1: Instant Replies 24/7 */}
          <div className="group relative rounded-2xl border border-[#d6a43a]/45 bg-[#090d14]/92 p-7 sm:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(214,164,58,0.22)] backdrop-blur-md transition-all duration-300 hover:border-[#d6a43a]/70 hover:shadow-[0_20px_50px_rgba(214,164,58,0.15)] flex flex-col items-center text-center">
            {/* 4 Ornate Corners */}
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            {/* Glowing Cyan Circle Aura */}
            <div className="relative mt-2 flex size-22 sm:size-24 items-center justify-center rounded-full bg-[#00c8ff]/10 ring-2 ring-[#00e5ff] shadow-[0_0_35px_rgba(0,229,255,0.45)] transition-transform duration-300 group-hover:scale-105">
              <ChatDotsIcon className="size-10 sm:size-11 text-[#00e5ff]" />
            </div>

            {/* Title */}
            <h2 className="mt-6 font-[family-name:var(--font-eb-garamond)] text-2xl sm:text-3xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_2px_10px_rgba(214,164,58,0.35)]">
              Instant Replies 24/7
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-[14.5px] leading-relaxed text-[#8e9ca7] max-w-sm">
              Chat with our experienced, English-speaking support team. Get help with orders,
              payments, items, or any questions anytime, day or night.
            </p>

            {/* CTA Button */}
            <div className="mt-auto pt-7 w-full">
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                id="start-live-chat-btn"
                aria-label="Start Live Chat"
                className="group/btn flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] font-bold tracking-wider text-white shadow-[0_6px_22px_rgba(214,147,32,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-200 active:scale-[0.98] hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] hover:shadow-[0_8px_28px_rgba(214,147,32,0.6)] cursor-pointer sm:text-base"
              >
                <MessageSquare className="size-5 fill-white text-[#d49320] shrink-0" />
                <span>START LIVE CHAT</span>
                <ChevronRight className="size-4.5 stroke-[3] transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>

              {/* Status Indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#8e9ca7]">
                <span className="size-2 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676] animate-pulse" />
                <span>Typical reply: under 1 minute</span>
              </div>
            </div>
          </div>

          {/* Card 2: Discord Support */}
          <div className="group relative rounded-2xl border border-[#d6a43a]/45 bg-[#090d14]/92 p-7 sm:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(214,164,58,0.22)] backdrop-blur-md transition-all duration-300 hover:border-[#d6a43a]/70 hover:shadow-[0_20px_50px_rgba(88,101,242,0.15)] flex flex-col items-center text-center">
            {/* 4 Ornate Corners */}
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            {/* Glowing Purple Circle Aura */}
            <div className="relative mt-2 flex size-22 sm:size-24 items-center justify-center rounded-full bg-[#5865F2]/15 ring-2 ring-[#7289da] shadow-[0_0_35px_rgba(88,101,242,0.45)] transition-transform duration-300 group-hover:scale-105">
              <DiscordIcon className="size-11 sm:size-12 text-[#9fa8f5]" />
            </div>

            {/* Title */}
            <h2 className="mt-6 font-[family-name:var(--font-eb-garamond)] text-2xl sm:text-3xl font-bold tracking-tight text-[#ffda5d] drop-shadow-[0_2px_10px_rgba(214,164,58,0.35)]">
              Discord Support
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-[14.5px] leading-relaxed text-[#8e9ca7] max-w-sm">
              Open a ticket on our official Discord server and get fast support, updates, and
              assistance from our team -anytime.
            </p>

            {/* Server ID Box */}
            <div className="mt-6 w-full rounded-lg border border-[#1e293b] bg-[#0c121c] p-3 sm:p-3.5">
              <div className="text-[11px] font-semibold text-[#8e9ca7] mb-1.5">
                SECNX Official Discord
              </div>
              <div className="flex items-center justify-center gap-3">
                <DiscordIcon className="size-5.5 text-[#5865F2] shrink-0" />
                <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-[#d1d5db]">
                  ID:{DISCORD_SERVER_ID}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  title="Copy Discord ID"
                  aria-label="Copy Discord ID"
                  className="rounded-md border border-[#232f42] bg-[#141b27] p-1.5 text-[#8e9ca7] transition-all hover:border-[#d6a43a]/50 hover:bg-[#1c2637] hover:text-[#ffda5d] cursor-pointer"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons: OPEN DISCORD & COPY ID */}
            <div className="mt-auto pt-4 w-full flex items-center gap-3">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="open-discord-btn"
                aria-label="Open Discord Server"
                className="group/btn flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] font-bold tracking-wider text-white shadow-[0_6px_22px_rgba(214,147,32,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-200 active:scale-[0.98] hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] hover:shadow-[0_8px_28px_rgba(214,147,32,0.6)] cursor-pointer text-xs sm:text-sm"
              >
                <DiscordIcon className="size-4.5 text-white shrink-0" />
                <span>OPEN DISCORD</span>
                <ChevronRight className="size-4 stroke-[3] transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={handleCopyId}
                id="copy-discord-id-btn"
                aria-label="Copy Discord Server ID"
                className="flex h-12 items-center justify-center gap-2 rounded-lg border border-[#232f42] bg-[#121824] px-4 font-bold tracking-wider text-[#cbd6dc] transition-all duration-200 hover:border-[#384860] hover:bg-[#1a2334] hover:text-white active:scale-[0.98] cursor-pointer text-xs sm:text-sm"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4 text-[#8e9ca7]" />
                    <span>COPY ID</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Trust / Assurance Bar (Matching User Screenshot) */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-xl border border-[#d6a43a]/35 bg-[#070b12]/85 shadow-[0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(214,164,58,0.15)] backdrop-blur-md overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#d6a43a]/25">
            {/* Feature 1: 24/7 Support */}
            <div className="flex items-center gap-4 px-6 py-4.5 sm:py-5">
              <Clock
                className="size-9 sm:size-10 text-[#ffd700] stroke-[2.2] shrink-0 drop-shadow-[0_0_12px_rgba(255,215,0,0.35)]"
              />
              <div className="min-w-0">
                <h3 className="text-sm sm:text-[15px] font-bold text-[#e5a93c] tracking-wide">
                  24/7 Support
                </h3>
                <p className="text-xs sm:text-[13px] text-[#8e9ca7] mt-0.5">
                  We&apos;re always here for you.
                </p>
              </div>
            </div>

            {/* Feature 2: Experienced English Speakers */}
            <div className="flex items-center gap-4 px-6 py-4.5 sm:py-5">
              <Users
                className="size-9 sm:size-10 text-[#ffd700] stroke-[2] shrink-0 drop-shadow-[0_0_12px_rgba(255,215,0,0.35)]"
              />
              <div className="min-w-0">
                <h3 className="text-sm sm:text-[15px] font-bold text-[#e5a93c] tracking-wide">
                  Experienced English Speakers
                </h3>
                <p className="text-xs sm:text-[13px] text-[#8e9ca7] mt-0.5">
                  Clear, friendly, and professional.
                </p>
              </div>
            </div>

            {/* Feature 3: No Account Required */}
            <div className="flex items-center gap-4 px-6 py-4.5 sm:py-5">
              <ShieldCheck
                className="size-9 sm:size-10 text-[#ffd700] stroke-[2] shrink-0 drop-shadow-[0_0_12px_rgba(255,215,0,0.35)]"
              />
              <div className="min-w-0">
                <h3 className="text-sm sm:text-[15px] font-bold text-[#e5a93c] tracking-wide">
                  No Account Required
                </h3>
                <p className="text-xs sm:text-[13px] text-[#8e9ca7] mt-0.5">
                  Get support instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal Simulation */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative flex h-[540px] w-full max-w-md flex-col rounded-2xl border border-[#d6a43a]/60 bg-[#0b1017] shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(214,164,58,0.25)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#232f42] bg-[#101724] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex size-9 items-center justify-center rounded-full bg-[#00e5ff]/15 ring-2 ring-[#00e5ff]">
                  <Headphones className="size-4.5 text-[#00e5ff]" />
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-[#00e676] ring-2 ring-[#101724]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-eb-garamond)] text-lg font-bold text-[#ffda5d]">
                    SECNX 24/7 Live Support
                  </h3>
                  <p className="text-[11px] text-[#8e9ca7]">Agent available • Typically replies in 1 min</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-lg p-1.5 text-[#8e9ca7] transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 space-y-3.5 overflow-y-auto p-4 text-xs sm:text-sm">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[linear-gradient(180deg,#d49320,#b87412)] text-white font-medium shadow-md"
                        : "border border-[#1f293d] bg-[#121927] text-[#cbd6dc]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 border-t border-[#232f42] bg-[#0e1420] p-3"
            >
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-[#232f42] bg-[#141b27] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#62717f] outline-none transition-colors focus:border-[#d6a43a]"
              />
              <button
                type="submit"
                className="flex size-10 items-center justify-center rounded-lg bg-[linear-gradient(180deg,#d49320,#b87412)] text-white transition-transform active:scale-95 hover:bg-[linear-gradient(180deg,#e5a530,#c7831d)] cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
