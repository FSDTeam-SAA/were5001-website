export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
  category?: string;
}

export type PaymentMethodOption = {
  id: string;
  name: string;
  badge?: string;
  badgeBg?: string;
  badgeText?: string;
  feePercentage?: number;
};
