export interface QuestItem {
  id: string;
  name: string;
  qp: string;
  price: number;
  category: "Free to Play" | "Members" | "Miniquests" | string;
  requirement?: string | null;
}
