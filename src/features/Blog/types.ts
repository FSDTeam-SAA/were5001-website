export type BlogCategory =
  | "All"
  | "Guides"
  | "Economy"
  | "Safety"
  | "PvM & Bossing"
  | "Updates";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | string[];
  category: "Guides" | "Economy" | "Safety" | "PvM & Bossing" | "Updates";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}
