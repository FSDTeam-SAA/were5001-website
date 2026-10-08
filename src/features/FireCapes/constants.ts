import { CapeServiceItem } from "./types";

export const FIRE_CAPE_STEPS = [
  {
    step: 1,
    title: "Add your desired firecape service to your cart",
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

export const FIRE_CAPE_SERVICES: CapeServiceItem[] = [
  {
    id: "pures",
    name: "PURES (1-39 DEFENCE)",
    category: "other",
    categoryLabel: "All",
    image: "/assets/capes/firecape.png",
    tiers: [
      { value: "40-46", label: "40 to 46", price: 48.75 },
      { value: "47-60", label: "47 to 60", price: 33.75 },
      { value: "61-69", label: "61 to 69", price: 26.25 },
      { value: "70-74", label: "70 to 74", price: 22.5 },
      { value: "75-85", label: "75 to 85", price: 10.5 },
      { value: "86-99", label: "86 to 99", price: 9.3 },
    ],
  },
  {
    id: "zerks",
    name: "ZERKS (40-69 DEFENCE)",
    category: "other",
    categoryLabel: "All",
    image: "/assets/capes/firecape.png",
    tiers: [
      { value: "40-46", label: "40 to 46", price: 42.5 },
      { value: "47-60", label: "47 to 60", price: 28.75 },
      { value: "61-69", label: "61 to 69", price: 22.5 },
      { value: "70-74", label: "70 to 74", price: 19.5 },
      { value: "75-85", label: "75 to 85", price: 9.3 },
      { value: "86-99", label: "86 to 99", price: 8.1 },
    ],
  },
  {
    id: "mains",
    name: "MAINS (70+ DEFENCE)",
    category: "other",
    categoryLabel: "All",
    image: "/assets/capes/firecape.png",
    tiers: [
      { value: "40-46", label: "40 to 46", price: 43.75 },
      { value: "47-60", label: "47 to 60", price: 28.75 },
      { value: "61-69", label: "61 to 69", price: 22.5 },
      { value: "70-74", label: "70 to 74", price: 19.5 },
      { value: "75-85", label: "75 to 85", price: 9.3 },
      { value: "86-99", label: "86 to 99", price: 8.1 },
    ],
  },
  {
    id: "ironman",
    name: "IRONMAN/HCIM",
    category: "ironman",
    categoryLabel: "Ironman",
    image: "/assets/capes/firecape.png",
    isCustomQuote: true,
    tiers: [
      { value: "90-99", label: "90-99 Ranged", price: null },
      { value: "80-89", label: "80-89 Ranged", price: null },
      { value: "70-79", label: "70-79 Ranged", price: null },
      { value: "60-69", label: "60-69 Ranged", price: null },
      { value: "50-59", label: "50-59 Ranged", price: null },
    ],
  },
  {
    id: "no-prayer",
    name: "NO PRAYER (1-31)",
    category: "no_prayer",
    categoryLabel: "No Prayer",
    image: "/assets/capes/firecape.png",
    tiers: [
      { value: "90-99", label: "90+ Ranged 1-2 days 2k sweets", price: 48.75 },
      { value: "75-89", label: "75+ Ranged 1-2 days 2k sweets", price: 56.25 },
      { value: "70-74", label: "70+ Ranged 1-2 days 3k sweets", price: 73.75 },
      { value: "60-69", label: "60+ Ranged 1-2 days 4k sweets", price: 86.25 },
      { value: "50-75hp", label: "50 range with 75 hp 1-2 days 4k sweets", price: 150.0 },
      { value: "50-u75hp", label: "50 range under 75 hp 1-2 days 4k sweets", price: 175.0 },
      { value: "40-75hp", label: "40 range with 75 hp 1-3 days 5k sweets", price: 225.0 },
      { value: "40-u75hp", label: "40 range under 75 hp 1-3 days 6k sweets", price: 250.0 },
    ],
  },
];
