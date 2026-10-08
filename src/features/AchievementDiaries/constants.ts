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
    image: "/assets/diaries/ardougne.webp",
    defaultTier: "Easy",
    prices: { Easy: 7.5, Medium: 10.0, Hard: 15.0, Elite: 30.0 },
  },
  {
    id: "desert",
    name: "DESERT DIARY",
    image: "/assets/diaries/desert.webp",
    defaultTier: "Medium",
    prices: { Easy: 7.5, Medium: 10.0, Hard: 15.0, Elite: 30.0 },
  },
  {
    id: "falador",
    name: "FALADOR DIARY",
    image: "/assets/diaries/falador.webp",
    defaultTier: "Easy",
    prices: { Easy: 7.5, Medium: 15.0, Hard: 25.0, Elite: 30.0 },
  },
  {
    id: "fremennik",
    name: "FREMENNIK DIARY",
    image: "/assets/diaries/fremennik.webp",
    defaultTier: "Medium",
    prices: { Easy: 7.5, Medium: 10.0, Hard: 15.0, Elite: 25.0 },
  },
  {
    id: "kandarin",
    name: "KANDARIN DIARY",
    image: "/assets/diaries/kandarin.webp",
    defaultTier: "Easy",
    prices: { Easy: 10.0, Medium: 15.0, Hard: 25.0, Elite: 40.0 },
  },
  {
    id: "karamja",
    name: "KARAMJA DIARY",
    image: "/assets/diaries/karamja.webp",
    defaultTier: "Medium",
    prices: { Easy: 7.5, Medium: 15.0, Hard: 20.0, Elite: 25.0 },
  },
  {
    id: "lumbridge-draynor",
    name: "LUMBRIDGE & DRAYNOR DIARY",
    image: "/assets/diaries/lumbridge-and-draynor.webp",
    defaultTier: "Easy",
    prices: { Easy: 7.5, Medium: 15.0, Hard: 25.0, Elite: 35.0 },
  },
  {
    id: "morytania",
    name: "MORYTANIA DIARY",
    image: "/assets/diaries/morytania.webp",
    defaultTier: "Hard",
    prices: { Easy: 7.5, Medium: 10.0, Hard: 15.0, Elite: 20.0 },
  },
  {
    id: "varrock",
    name: "VARROCK DIARY",
    image: "/assets/diaries/varrock.webp",
    defaultTier: "Medium",
    prices: { Easy: 7.5, Medium: 15.0, Hard: 25.0, Elite: 35.0 },
  },
  {
    id: "western-provinces",
    name: "WESTERN PROVINCES DIARY",
    image: "/assets/diaries/western-provinces.webp",
    defaultTier: "Hard",
    prices: { Easy: 7.5, Medium: 15.0, Hard: 35.0, Elite: 45.0 },
  },
  {
    id: "wilderness",
    name: "WILDERNESS DIARY",
    image: "/assets/diaries/wilderness.webp",
    defaultTier: "Hard",
    prices: { Easy: 7.5, Medium: 15.0, Hard: 25.0, Elite: 35.0 },
  },
  {
    id: "custom-diaries",
    name: "CUSTOM DIARIES",
    image: "/assets/diaries/combat-achievements.webp",
    defaultTier: "Easy",
    prices: { Easy: 12.99, Medium: 25.0, Hard: 45.0, Elite: 75.0 },
  },
];
