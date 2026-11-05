import { SkillInfo, AccountPreset, TrainingMethod } from "./types";

export const SKILLING_STEPS = [
  {
    step: 1,
    title: "Add the desired skill training to your cart",
  },
  {
    step: 2,
    title: "Complete payment with any method of your choice",
  },
  {
    step: 3,
    title: "Choose payment method and proceed your payment",
  },
  {
    step: 4,
    title: "Wait for your order to get completed and leave feedback",
  },
];

export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  const clamped = Math.min(Math.max(level, 1), 99);
  let points = 0;
  for (let lvl = 1; lvl < clamped; lvl++) {
    points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
  }
  return Math.floor(points / 4);
}

export const ACCOUNT_PRESETS: AccountPreset[] = [
  {
    id: "main",
    name: "MAIN",
    subtitle: "(e.g. 85+ Ranged and 85+ Magic)*",
    tag: "main",
  },
  {
    id: "zerker",
    name: "ZERKER",
    subtitle: "(e.g. 85+ Ranged and 85+ Magic)*",
    tag: "zerker",
  },
  {
    id: "pure",
    name: "PURE",
    subtitle: "(e.g. 85+ Ranged and 85+ Magic)*",
    tag: "pure",
  },
];

export const OSRS_SKILLS: SkillInfo[] = [
  // Row 1
  { id: "attack", name: "ATTACK", icon: "/assets/skills/attack.png", category: "combat", ratePerM: 15.56 },
  { id: "strength", name: "STRENGTH", icon: "/assets/skills/strength.png", category: "combat", ratePerM: 15.56 },
  { id: "defence", name: "DEFENCE", icon: "/assets/skills/defence.png", category: "combat", ratePerM: 15.56 },
  { id: "prayer", name: "PRAYER", icon: "/assets/skills/prayer.png", category: "support", ratePerM: 16.08 },
  { id: "runecrafting", name: "RUNECRAFTING", icon: "/assets/skills/runecrafting.png", category: "artisan", ratePerM: 32.81 },
  { id: "ranged", name: "RANGED", icon: "/assets/skills/ranged.png", category: "combat", ratePerM: 11.49 },
  { id: "magic", name: "MAGIC", icon: "/assets/skills/magic.png", category: "combat", ratePerM: 16.75 },
  { id: "crafting", name: "CRAFTING", icon: "/assets/skills/crafting.png", category: "artisan", ratePerM: 14.51 },

  // Row 2
  { id: "mining", name: "MINING", icon: "/assets/skills/mining.png", category: "gathering", ratePerM: 39.31 },
  { id: "smithing", name: "SMITHING", icon: "/assets/skills/smithing.png", category: "artisan", ratePerM: 12.09 },
  { id: "fishing", name: "FISHING", icon: "/assets/skills/fishing.png", category: "gathering", ratePerM: 38.64 },
  { id: "cooking", name: "COOKING", icon: "/assets/skills/cooking.png", category: "artisan", ratePerM: 23.82 },
  { id: "firemaking", name: "FIREMAKING", icon: "/assets/skills/firemaking.png", category: "artisan", ratePerM: 6.32 },
  { id: "woodcutting", name: "WOODCUTTING", icon: "/assets/skills/woodcutting.png", category: "gathering", ratePerM: 18.28 },
  { id: "agility", name: "AGILITY", icon: "/assets/skills/agility.png", category: "support", ratePerM: 38.32 },
  { id: "herblore", name: "HERBLORE", icon: "/assets/skills/herblore.png", category: "artisan", ratePerM: 77.40 },

  // Row 3
  { id: "thieving", name: "THIEVING", icon: "/assets/skills/thieving.png", category: "support", ratePerM: 28.83 },
  { id: "fletching", name: "FLETCHING", icon: "/assets/skills/fletching.png", category: "artisan", ratePerM: 12.09 },
  { id: "slayer", name: "SLAYER", icon: "/assets/skills/slayer.png", category: "support", ratePerM: 102.70 },
  { id: "farming", name: "FARMING", icon: "/assets/skills/farming.png", category: "gathering", ratePerM: 17.16 },
  { id: "construction", name: "CONSTRUCTION", icon: "/assets/skills/construction.png", category: "artisan", ratePerM: 36.54 },
  { id: "hunter", name: "HUNTER", icon: "/assets/skills/hunter.png", category: "gathering", ratePerM: 27.34 },
];

export const TRAINING_METHODS: TrainingMethod[] = [
  { id: "fastest", name: "Fastest Method (High XP/hr)", speedMultiplier: 1.0, priceMultiplier: 1.15 },
  { id: "standard", name: "Standard Method (Recommended)", speedMultiplier: 1.0, priceMultiplier: 1.0 },
  { id: "afk", name: "AFK / Low Attention Method", speedMultiplier: 0.8, priceMultiplier: 0.95 },
  { id: "budget", name: "Budget Friendly (Resource Save)", speedMultiplier: 0.85, priceMultiplier: 0.9 },
];
