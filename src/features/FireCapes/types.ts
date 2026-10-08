export interface CapeTierOption {
  value: string;
  label: string;
  price: number | null;
}

export interface CapeServiceItem {
  id: string;
  name: string;
  category: "other" | "ironman" | "no_prayer";
  categoryLabel: string;
  image: string;
  tiers: CapeTierOption[];
  isCustomQuote?: boolean;
}
