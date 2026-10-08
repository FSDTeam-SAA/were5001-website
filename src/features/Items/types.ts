export type GameCategory = "OSRS" | "RS3";

export interface GameItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  game: GameCategory;
  category: "Weapons" | "Armor" | "Shields" | "Boots" | "Rares";
  popularRank: number;
}
