import { api } from "@/lib/api";
import { GameAccount, GameCategory } from "@/features/Accounts/types";
import { OSRS_ACCOUNTS, RS3_ACCOUNTS } from "@/features/Accounts/data/accountsData";

export interface QueryAccountParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface AccountsApiResponse {
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: GameAccount[];
}

export const accountsService = {
  async getAccounts(game: GameCategory, params?: QueryAccountParams): Promise<GameAccount[]> {
    const gameKey = game.toLowerCase();
    const fallbackList = game === "OSRS" ? OSRS_ACCOUNTS : RS3_ACCOUNTS;

    try {
      const response = await api.get(`/accounts/${gameKey}`, {
        params,
        timeout: 4000,
      });

      const rawData = response.data?.data;
      if (Array.isArray(rawData) && rawData.length > 0) {
        return rawData.map((item: any, idx: number) => ({
          id: item._id || item.acc_id || `${gameKey}-${idx}`,
          acc_id: item.acc_id || `ACC-${idx + 1}`,
          name: item.name || "RuneScape Account",
          description: item.description || "High-tier verified account with full security transfer.",
          image: item.image || (game === "OSRS" ? "/assets/card-1.png" : "/assets/rs3-card-logo.png"),
          price: typeof item.price === "number" ? item.price : parseFloat(item.price || "0"),
          stock: typeof item.stock === "number" ? item.stock : 1,
          game,
          category: "Maxed Mains",
          combatLevel: item.combatLevel || (game === "OSRS" ? 126 : 138),
          totalLevel: item.totalLevel || 2000,
          questPoints: item.questPoints || 250,
          highlights: item.highlights || ["Verified Stats", "Hand-Trained", "Email Changeable"],
          securityBadges: ["100% Hand-Trained", "Email Changeable", "Lifetime Warranty"],
          popularRank: idx + 1,
        }));
      }

      // If backend has no accounts yet or returns empty array, provide curated defaults
      return fallbackList;
    } catch {
      // Backend offline or unreachable: fall back gracefully so page never breaks
      return fallbackList;
    }
  },

  async getAccountById(game: GameCategory, id: string): Promise<GameAccount | null> {
    const gameKey = game.toLowerCase();
    const fallbackList = game === "OSRS" ? OSRS_ACCOUNTS : RS3_ACCOUNTS;

    try {
      const response = await api.get(`/accounts/${gameKey}/${id}`, { timeout: 4000 });
      const item = response.data?.data;
      if (item) {
        return {
          id: item._id || item.acc_id || id,
          acc_id: item.acc_id || id,
          name: item.name || "RuneScape Account",
          description: item.description || "High-tier verified account with full security transfer.",
          image: item.image || (game === "OSRS" ? "/assets/card-1.png" : "/assets/rs3-card-logo.png"),
          price: typeof item.price === "number" ? item.price : parseFloat(item.price || "0"),
          stock: typeof item.stock === "number" ? item.stock : 1,
          game,
          category: "Maxed Mains",
          combatLevel: item.combatLevel || (game === "OSRS" ? 126 : 138),
          totalLevel: item.totalLevel || 2000,
          questPoints: item.questPoints || 250,
          highlights: item.highlights || ["Verified Stats", "Hand-Trained", "Email Changeable"],
          securityBadges: ["100% Hand-Trained", "Email Changeable", "Lifetime Warranty"],
          popularRank: 1,
        };
      }
    } catch {
      // ignore
    }

    return fallbackList.find((a) => a.id === id || a.acc_id === id) || null;
  },
};
