export interface SkillInfo {
  id: string;
  name: string;
  icon: string;
  category: "combat" | "gathering" | "artisan" | "support";
  ratePerM: number; // USD per 1M XP
}

export interface AccountPreset {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
}

export interface TrainingMethod {
  id: string;
  name: string;
  speedMultiplier: number;
  priceMultiplier: number;
}
