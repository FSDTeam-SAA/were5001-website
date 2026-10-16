"use client";

import { useState } from "react";
import { TreePine, Flame, Skull, BookOpen, Compass, ChevronDown, ChevronUp } from "lucide-react";

export type ServiceType =
  | "skilling"
  | "fire-capes"
  | "infernal-capes"
  | "achievement-diaries"
  | "questing";

interface ServiceFAQConfig {
  title: string;
  categoryBadge: string;
  icon: React.ReactNode;
  theme: {
    primary: string; // e.g. text color or hex
    border: string;
    borderActive: string;
    bgActive: string;
    iconBg: string;
    glow: string;
    badgeBorder: string;
  };
  questions: {
    question: string;
    answer: string;
  }[];
}

const serviceConfigs: Record<ServiceType, ServiceFAQConfig> = {
  skilling: {
    title: "Frequently Asked Questions",
    categoryBadge: "SKILLING SERVICES FAQ",
    icon: <TreePine className="size-6 text-[#48bb78]" />,
    theme: {
      primary: "#48bb78",
      border: "border-[#1c3826]",
      borderActive: "border-[#48bb78]/60",
      bgActive: "bg-[linear-gradient(160deg,rgba(16,38,24,0.92),rgba(6,18,11,0.98))]",
      iconBg: "border-[#48bb78]/40 bg-[#0f2417]",
      glow: "shadow-[0_0_24px_-8px_rgba(72,187,120,0.35)]",
      badgeBorder: "border-[#48bb78]/50 text-[#68d391]",
    },
    questions: [
      {
        question: "How is the skilling service done?",
        answer:
          "All training is completed 100% manually by experienced players. We do not use any bots, macros or automated software.",
      },
      {
        question: "Is it safe to use your skilling service?",
        answer:
          "Yes. We follow strict safety measures and only use proven training methods to keep your account as safe as possible.",
      },
      {
        question: "Will I get banned for skilling services?",
        answer:
          "While no service can guarantee zero ban risk, we use safe methods and take all necessary precautions to minimize any risk.",
      },
      {
        question: "What do I need to provide?",
        answer:
          "You will need to provide your login information or join our trusted launcher. We recommend using a temporary password.",
      },
      {
        question: "Do I need to stay online?",
        answer:
          "No, you do not need to be online while we train your account. You can check the progress anytime.",
      },
      {
        question: "Can I request progress updates?",
        answer:
          "Yes! You will receive regular updates, and you can also contact our support team whenever you want.",
      },
      {
        question: "How long does training take?",
        answer:
          "The time depends on the skill, level range, and your account. You can see the estimated time on each product page.",
      },
      {
        question: "What if I change my mind?",
        answer:
          "If we have not started your order yet, we offer a full refund. Please contact support as soon as possible.",
      },
    ],
  },

  "fire-capes": {
    title: "Frequently Asked Questions",
    categoryBadge: "FIRE CAPE SERVICES FAQ",
    icon: <Flame className="size-6 text-[#ed8936]" />,
    theme: {
      primary: "#ed8936",
      border: "border-[#3f2715]",
      borderActive: "border-[#ed8936]/60",
      bgActive: "bg-[linear-gradient(160deg,rgba(40,24,14,0.92),rgba(18,10,6,0.98))]",
      iconBg: "border-[#ed8936]/40 bg-[#29170c]",
      glow: "shadow-[0_0_24px_-8px_rgba(237,137,54,0.35)]",
      badgeBorder: "border-[#ed8936]/50 text-[#f6ad55]",
    },
    questions: [
      {
        question: "How is the Fire Cape service completed?",
        answer:
          "Our experienced PvM players complete the Fight Caves for you 100% manually. No bots, macros or third-party software are used.",
      },
      {
        question: "What account builds can you use?",
        answer:
          "We can use most account builds including Mains, Pures, Zerks and Ironman (in supported cases). Check the product page for details.",
      },
      {
        question: "Do I need special gear or items?",
        answer:
          "We will let you know exactly what gear, items and stats are required before we start your order.",
      },
      {
        question: "Will I get banned?",
        answer:
          "We follow strict safety protocols to keep your account as safe as possible. While no service can guarantee 100% ban protection, we minimize all risks.",
      },
      {
        question: "What login method do you use?",
        answer:
          "We recommend providing a temporary password. We only access the account while the service is being completed.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most Fire Capes are completed within 24 hours, depending on account build, queue and current workload.",
      },
      {
        question: "Will you keep my account logged in?",
        answer:
          "No. We always log out once the service is finished and confirm completion with you.",
      },
      {
        question: "What happens if I fail the caves?",
        answer:
          "Our players are highly experienced. If a rare failure happens, we will continue the attempt at no extra cost.",
      },
    ],
  },

  "infernal-capes": {
    title: "Frequently Asked Questions",
    categoryBadge: "INFERNAL CAPE SERVICES FAQ",
    icon: <Skull className="size-6 text-[#b794f4]" />,
    theme: {
      primary: "#b794f4",
      border: "border-[#32234d]",
      borderActive: "border-[#b794f4]/60",
      bgActive: "bg-[linear-gradient(160deg,rgba(34,22,54,0.92),rgba(14,9,24,0.98))]",
      iconBg: "border-[#b794f4]/40 bg-[#211438]",
      glow: "shadow-[0_0_24px_-8px_rgba(183,148,244,0.35)]",
      badgeBorder: "border-[#b794f4]/50 text-[#d6bcfa]",
    },
    questions: [
      {
        question: "How is the Infernal Cape service done?",
        answer:
          "Your Infernal Cape is completed 100% manually by our experienced Inferno specialists. We do not use any bots, macros or scripts.",
      },
      {
        question: "What are the requirements?",
        answer:
          "You will need the required stats, quests and gear to attempt the Inferno. Check the product page for the full requirements.",
      },
      {
        question: "Do you offer different combat styles?",
        answer:
          "Yes! We can complete the Inferno with Melee, Range or Mage setups depending on your account.",
      },
      {
        question: "Will I get banned?",
        answer:
          "We use safe and proven methods to minimize any risk. No service can guarantee zero ban risk, but we take every precaution.",
      },
      {
        question: "What login method do you use?",
        answer:
          "We recommend a temporary password. We only log in to complete your order and log out immediately after.",
      },
      {
        question: "How long does it take?",
        answer:
          "Infernal Capes usually take between 2 to 7 days depending on account build, attempts and current workload.",
      },
      {
        question: "Can I receive updates?",
        answer:
          "Yes! You will receive progress updates throughout the order, and we will notify you once the cape is completed.",
      },
      {
        question: "What if I don't have all the requirements?",
        answer:
          "Contact our support team and we will let you know what is missing and how to prepare your account.",
      },
    ],
  },

  "achievement-diaries": {
    title: "Frequently Asked Questions",
    categoryBadge: "ACHIEVEMENT DIARY SERVICES FAQ",
    icon: <BookOpen className="size-6 text-[#63b3ed]" />,
    theme: {
      primary: "#63b3ed",
      border: "border-[#1c324a]",
      borderActive: "border-[#63b3ed]/60",
      bgActive: "bg-[linear-gradient(160deg,rgba(18,34,52,0.92),rgba(8,16,26,0.98))]",
      iconBg: "border-[#63b3ed]/40 bg-[#112438]",
      glow: "shadow-[0_0_24px_-8px_rgba(99,179,237,0.35)]",
      badgeBorder: "border-[#63b3ed]/50 text-[#90cdf4]",
    },
    questions: [
      {
        question: "How are Diaries completed?",
        answer:
          "Our players complete your Achievement Diaries manually on your account following all requirements.",
      },
      {
        question: "What diary tiers do you offer?",
        answer:
          "We offer Easy, Medium, Hard and Elite Diaries. Select your desired tier on the product page.",
      },
      {
        question: "Do I need all the requirements ready?",
        answer:
          "Yes, please make sure you have all the requirements completed before ordering. We do not complete requirements.",
      },
      {
        question: "What happens if I'm missing something?",
        answer:
          "If something is missing, we will let you know before starting the order so you can get it ready.",
      },
      {
        question: "Will I get banned?",
        answer:
          "We use safe methods and follow Jagex rules as much as possible to keep your account safe.",
      },
      {
        question: "How long does it take?",
        answer:
          "Diary completion time depends on the tier and your account. You can see the estimated time on the product page.",
      },
      {
        question: "Do you provide progress updates?",
        answer:
          "Yes, we provide regular updates and will notify you once your chosen diary tier is completed.",
      },
      {
        question: "Do you offer multiple diaries?",
        answer:
          "Yes! You can order multiple diaries and we will complete them one by one.",
      },
    ],
  },

  questing: {
    title: "Frequently Asked Questions",
    categoryBadge: "QUEST SERVICES FAQ",
    icon: <Compass className="size-6 text-[#38b2ac]" />,
    theme: {
      primary: "#38b2ac",
      border: "border-[#183938]",
      borderActive: "border-[#38b2ac]/60",
      bgActive: "bg-[linear-gradient(160deg,rgba(16,38,37,0.92),rgba(6,18,18,0.98))]",
      iconBg: "border-[#38b2ac]/40 bg-[#0e2726]",
      glow: "shadow-[0_0_24px_-8px_rgba(56,178,172,0.35)]",
      badgeBorder: "border-[#38b2ac]/50 text-[#81e6d9]",
    },
    questions: [
      {
        question: "How are quests completed?",
        answer:
          "Our experienced questers complete your selected quests manually on your account.",
      },
      {
        question: "Do I need to have the requirements?",
        answer:
          "Yes, please make sure you have all quest requirements completed before ordering.",
      },
      {
        question: "What quests can you complete?",
        answer:
          "We can complete all quests including Normal, Grandmaster, and Mini Quests. Check the product page for the list.",
      },
      {
        question: "Will I get banned?",
        answer:
          "We use safe methods and follow Jagex rules as much as possible to keep your account safe.",
      },
      {
        question: "What login method do you use?",
        answer:
          "We recommend using a temporary password. We only access your account while we complete your order.",
      },
      {
        question: "How long does it take?",
        answer:
          "It depends on the quest(s) and your account. You can see the estimated time on each product page.",
      },
      {
        question: "Can I get progress updates?",
        answer:
          "Yes! You will receive updates during longer quest orders and a confirmation once completed.",
      },
      {
        question: "What if I change my mind?",
        answer:
          "If your order has not started yet, we offer a full refund. Contact support as soon as possible.",
      },
    ],
  },
};

export default function ServiceFAQ({ service }: { service: ServiceType }) {
  const config = serviceConfigs[service];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!config) return null;

  return (
    <section
      aria-labelledby={`service-faq-${service}`}
      className="relative overflow-hidden bg-[#020f14] px-6 py-20 font-[family-name:var(--font-inter)] text-white max-[640px]:px-4 max-[640px]:py-14"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(214,164,58,0.06),transparent_70%),radial-gradient(ellipse_at_0%_60%,rgba(0,135,150,0.08),transparent_40%),radial-gradient(ellipse_at_100%_90%,rgba(30,55,160,0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#182b31,transparent)]" />

      <div className="relative mx-auto max-w-[980px]">
        {/* Section Header */}
        <header className="reveal-init mb-12 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,#b88a26)]" />
            <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase ${config.theme.badgeBorder}`}>
              {config.icon}
              <span>{config.categoryBadge}</span>
            </div>
            <span className="h-px w-10 bg-[linear-gradient(270deg,transparent,#b88a26)]" />
          </div>

          <h2
            id={`service-faq-${service}`}
            className="mt-4 font-[family-name:var(--font-eb-garamond)] text-5xl font-semibold leading-tight text-[#eef0ef] max-[640px]:text-3xl"
          >
            Frequently Asked{" "}
            <span className="bg-[linear-gradient(180deg,#ffdf70,#d4931a)] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-base text-[#8d9aa3] max-[640px]:text-sm">
            Everything you need to know about our {config.categoryBadge.replace(" FAQ", "").toLowerCase()}.
          </p>
        </header>

        {/* Accordion List */}
        <div className="reveal-init space-y-3.5">
          {config.questions.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className={`group overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? `${config.theme.borderActive} ${config.theme.bgActive} ${config.theme.glow}`
                    : `${config.theme.border} bg-[linear-gradient(160deg,rgba(16,25,33,0.7),rgba(8,14,20,0.85))] hover:border-[#d6a43a]/30`
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors max-[640px]:px-5 max-[640px]:py-4 cursor-pointer"
                >
                  <span
                    className={`text-lg font-semibold transition-colors duration-200 max-[640px]:text-base ${
                      isOpen
                        ? "text-[#f3ead0]"
                        : "text-[#dbe3e8] group-hover:text-white"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 max-[640px]:size-8 ${
                      isOpen
                        ? "border-[#d6a43a] bg-[linear-gradient(180deg,#ffda5d,#d78b14)] text-yellow-950 shadow-[0_0_15px_rgba(214,164,58,0.45)]"
                        : "border-[#2c3d4a] bg-[#121f29] text-[#9eb0bc] group-hover:border-[#d6a43a]/50 group-hover:text-white"
                    }`}
                  >
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.5}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[#1d2c38]/70 px-6 pb-6 pt-4 text-[15px] leading-relaxed text-[#a0b0bd] max-[640px]:px-5 max-[640px]:pb-5 max-[640px]:text-sm">
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
