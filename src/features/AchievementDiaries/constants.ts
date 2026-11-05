import { DiaryItem } from "./types";

export const DIARY_STEPS = [
  {
    step: 1,
    title: "Add your desired achievement diary to your cart",
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

export const DIARY_ITEMS: DiaryItem[] = [
  {
    id: "ardougne",
    name: "ARDOUGNE DIARY",
    image: "/assets/diaries/ardougne-cloak-4.webp",
    defaultTier: "Easy",
    prices: { Easy: 1.68, Medium: 2.18, Hard: 4.02, Elite: 5.03 },
  },
  {
    id: "desert",
    name: "DESERT DIARY",
    image: "/assets/diaries/desert-amulet-4.webp",
    defaultTier: "Medium",
    prices: { Easy: 1.34, Medium: 2.18, Hard: 4.69, Elite: 6.03 },
  },
  {
    id: "falador",
    name: "FALADOR DIARY",
    image: "/assets/diaries/falador-shield-4.webp",
    defaultTier: "Easy",
    prices: { Easy: 1.68, Medium: 3.35, Hard: 5.86, Elite: 8.38 },
  },
  {
    id: "fremennik",
    name: "FREMENNIK DIARY",
    image: "/assets/diaries/fremennik-sea-boots-4.webp",
    defaultTier: "Medium",
    prices: { Easy: 2.18, Medium: 2.18, Hard: 4.19, Elite: 8.38 },
  },
  {
    id: "kandarin",
    name: "KANDARIN DIARY",
    image: "/assets/diaries/kandarin-headgear-4.webp",
    defaultTier: "Easy",
    prices: { Easy: 1.17, Medium: 4.19, Hard: 4.52, Elite: 6.20 },
  },
  {
    id: "karamja",
    name: "KARAMJA DIARY",
    image: "/assets/diaries/karamja-gloves-4.webp",
    defaultTier: "Medium",
    prices: { Easy: 1.68, Medium: 3.52, Hard: 5.03, Elite: 5.70 },
  },
  {
    id: "kourend-and-kebos",
    name: "KOUREND & KEBOS DIARY",
    image: "/assets/diaries/radas-blessing-4.webp",
    defaultTier: "Easy",
    prices: { Easy: 2.18, Medium: 3.52, Hard: 4.19, Elite: 15.08 },
  },
  {
    id: "lumbridge-draynor",
    name: "LUMBRIDGE & DRAYNOR DIARY",
    image: "/assets/diaries/explorers-ring-4.webp",
    defaultTier: "Easy",
    prices: { Easy: 1.68, Medium: 2.18, Hard: 4.19, Elite: 6.70 },
  },
  {
    id: "morytania",
    name: "MORYTANIA DIARY",
    image: "/assets/diaries/morytania-legs-4.webp",
    defaultTier: "Hard",
    prices: { Easy: 1.68, Medium: 3.35, Hard: 4.19, Elite: 5.03 },
  },
  {
    id: "varrock",
    name: "VARROCK DIARY",
    image: "/assets/diaries/varrock-armour-4.webp",
    defaultTier: "Medium",
    prices: { Easy: 1.68, Medium: 3.35, Hard: 4.19, Elite: 4.19 },
  },
  {
    id: "western-provinces",
    name: "WESTERN PROVINCES DIARY",
    image: "/assets/diaries/western-banner-4.webp",
    defaultTier: "Hard",
    prices: { Easy: 1.68, Medium: 4.19, Hard: 6.70, Elite: 21.78 },
  },
  {
    id: "wilderness",
    name: "WILDERNESS DIARY",
    image: "/assets/diaries/wilderness-sword-4.webp",
    defaultTier: "Hard",
    prices: { Easy: 1.68, Medium: 2.68, Hard: 6.70, Elite: 8.38 },
  },
];
