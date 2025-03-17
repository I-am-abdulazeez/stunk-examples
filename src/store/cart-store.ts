import { chunk } from "stunk";
import { withPersistence } from "stunk/middleware";


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type CartState = {
  items: CartItem[];
}

export const cartChunk = withPersistence(
  chunk<CartState>({ items: [] }),
  { key: "cart" }
);

export const addToCart = (item: CartItem) => {
  cartChunk.set((prev) => {
    const existingItem = prev.items.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        items: prev.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...prev.items, { ...item, quantity: 1 }] };
  });
};

export const removeFromCart = (id: string) => {
  cartChunk.set((prev) => ({
    items: prev.items.filter((i) => i.id !== id),
  }));
};

export const clearCart = () => {
  cartChunk.reset();
};
