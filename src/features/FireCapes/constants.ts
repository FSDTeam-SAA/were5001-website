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
    image: "/assets/capes/fc-zerker.png",
    tiers: [
      { value: "90-99", label: "Pure 90-99 Ranged", price: 11.73 },
      { value: "75-89", label: "Pure 75-89 Ranged", price: 13.40 },
      { value: "70-74", label: "Pure 70-74 Ranged", price: 16.75 },
      { value: "64-69", label: "Pure 64-69 Ranged", price: 20.10 },
      { value: "61-63", label: "Pure 61-63 Ranged", price: 21.78 },
    ],
  },
  {
    id: "zerks",
    name: "ZERKS (40-69 DEFENCE)",
    category: "other",
    categoryLabel: "All",
    image: "/assets/capes/fc-pure.png",
    tiers: [
      { value: "90-99", label: "Zerker 90-99 Ranged", price: 8.38 },
      { value: "75-89", label: "Zerker 75-89 Ranged", price: 10.05 },
      { value: "70-74", label: "Zerker 70-74 Ranged", price: 13.40 },
      { value: "64-69", label: "Zerker 64-69 Ranged", price: 16.75 },
      { value: "61-63", label: "Zerker 61-63 Ranged", price: 18.43 },
    ],
  },
  {
    id: "mains",
    name: "MAINS (70+ DEFENCE)",
    category: "other",
    categoryLabel: "All",
    image: "/assets/capes/fc-main.png",
    tiers: [
      { value: "90-99", label: "Main 90-99 Ranged", price: 6.70 },
      { value: "75-89", label: "Main 75-89 Ranged", price: 8.38 },
      { value: "70-74", label: "Main 70-74 Ranged", price: 11.73 },
      { value: "64-69", label: "Main 64-69 Ranged", price: 18.43 },
      { value: "61-63", label: "Main 61-63 Ranged", price: 16.75 },
    ],
  },
  {
    id: "ironman",
    name: "IRONMAN/HCIM",
    category: "ironman",
    categoryLabel: "Ironman",
    image: "/assets/capes/fc-ironman.png",
    tiers: [
      { value: "90-99", label: "Ironman 90-99 Ranged", price: 13.40 },
      { value: "75-89", label: "Ironman 75-89 Ranged", price: 21.78 },
      { value: "70-74", label: "Ironman 70-74 Ranged", price: 31.83 },
      { value: "64-69", label: "Ironman 64-69 Ranged", price: 41.88 },
      { value: "61-63", label: "Ironman 61-63 Ranged", price: 51.93 },
    ],
  },
  {
    id: "no-prayer",
    name: "NO PRAYER (1-31)",
    category: "no_prayer",
    categoryLabel: "No Prayer",
    image: "/assets/capes/fc-prayer.png",
    tiers: [
      { value: "90-99", label: "No Prayer 90-99 Ranged", price: 50.25 },
      { value: "75-89", label: "No Prayer 75-89 Ranged", price: 67.00 },
      { value: "70-74", label: "No Prayer 70-74 Ranged", price: 100.50 },
      { value: "60-69", label: "No Prayer 60-69 Ranged", price: 117.25 },
      { value: "50-59", label: "No Prayer 50-59 Ranged", price: 167.50 },
    ],
  },
];
