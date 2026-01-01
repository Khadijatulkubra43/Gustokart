import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe, Ingredient } from './data';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string; // Unique ID for cart item (recipeId + selected ingredients hash could be better, but simple random ID for now)
  recipe: Recipe;
  selectedIngredients: Ingredient[];
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (recipe: Recipe, selectedIngredients: Ingredient[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (recipe: Recipe, selectedIngredients: Ingredient[]) => {
    const newItem: CartItem = {
      id: Math.random().toString(36).substring(7),
      recipe,
      selectedIngredients,
      quantity: 1,
    };

    setItems((prev) => [...prev, newItem]);
    toast({
      title: "Added to Cart",
      description: `${recipe.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => {
    const basePrice = item.recipe.price;
    const ingredientsPrice = item.selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
    return total + (basePrice + ingredientsPrice) * item.quantity;
  }, 0);

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
