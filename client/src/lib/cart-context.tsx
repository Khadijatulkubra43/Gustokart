import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItemType {
  id: string;
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  price: number;
  recipeName: string;
}

interface CartContextType {
  items: CartItemType[];
  addItem: (item: Omit<CartItemType, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DELIVERY_FEE = 4.99;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gustokart-cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("gustokart-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItemType, "id">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.ingredientId === item.ingredientId);
      if (existing) {
        return prev.map((i) =>
          i.ingredientId === item.ingredientId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item, id: crypto.randomUUID() }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getDeliveryFee = () => {
    return items.length > 0 ? DELIVERY_FEE : 0;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getSubtotal,
        getDeliveryFee,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
