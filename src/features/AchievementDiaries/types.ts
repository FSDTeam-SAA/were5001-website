export type DiaryTier = "Easy" | "Medium" | "Hard" | "Elite";

export interface DiaryPriceMap {
  Easy: number;
  Medium: number;
  Hard: number;
  Elite: number;
}

export interface DiaryItem {
  id: string;
  name: string;
  image: string;
  prices: DiaryPriceMap;
  defaultTier: DiaryTier;
  iconSymbol?: string;
}
