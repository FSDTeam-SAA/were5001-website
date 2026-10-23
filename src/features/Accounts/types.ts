export type GameCategory = "OSRS" | "RS3";

export type AccountBuildCategory =
  | "All"
  | "Maxed Mains"
  | "Pures (1 Def)"
  | "Zerker / Med"
  | "Ironman"
  | "Skillers"
  | "Starters / Quested";

export interface GameAccount {
  id: string;
  acc_id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  game: GameCategory;
  category: AccountBuildCategory;
  combatLevel?: number;
  totalLevel?: number;
  questPoints?: number;
  highlights: string[];
  securityBadges: string[];
  popularRank: number;
}
