import { create } from "zustand";
import { CartItem } from "@/features/Cart/types";

interface CartState {
  items: CartItem[];
  selectedPayment: string;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setSelectedPayment: (payment: string) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "ranged-1-20",
    name: "RANGED (1-20)",
    price: 0.28,
    quantity: 1,
    image: "/assets/items/cart-ranged.png",
    inStock: true,
    category: "OSRS Quest",
  },
  {
    id: "below-ice-mountain",
    name: "BELOW ICE MOUNTAIN | QP",
    price: 3.00,
    quantity: 1,
    image: "/assets/items/cart-ice-mountain.png",
    inStock: true,
    category: "OSRS Quest",
  },
];

export const useCartStore = create<CartState>((set, get) => ({
  items: INITIAL_ITEMS,
  selectedPayment: "visa",

  addItem: (item, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity }],
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => ({
      items: state.items
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[],
    }));
  },

  setQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  setSelectedPayment: (payment) => {
    set({ selectedPayment: payment });
  },

  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    // Standard merchant checkout processing fee (matching screenshot $3.28 -> $3.61)
    const fee = 0.33;
    return subtotal + fee;
  },
}));
