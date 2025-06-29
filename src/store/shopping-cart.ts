import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Course } from "@/types/couse";

export interface CartItem {
  id: number;
  course: Course;
  quantity: number;
  addedAt: string; // Changed to string for better serialization
}

interface ShoppingCartState {
  items: CartItem[];
  isOpen: boolean;
  // Actions
  addItem: (course: Course) => void;
  removeItem: (courseId: number) => void;
  updateQuantity: (courseId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  // Helper
  getItemById: (courseId: number) => CartItem | undefined;
}

export const useShoppingCart = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (course: Course) => {
        const { items } = get();
        const existingItem = items.find((item) => item.course.id === course.id);

        if (existingItem) {
          // If item already exists, increase quantity
          set({
            items: items.map((item) =>
              item.course.id === course.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: Date.now(), // Simple ID generation
            course,
            quantity: 1,
            addedAt: new Date().toISOString(), // Convert to string for better serialization
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (courseId: number) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.course.id !== courseId),
        });
      },

      updateQuantity: (courseId: number, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          set({
            items: items.filter((item) => item.course.id !== courseId),
          });
        } else {
          set({
            items: items.map((item) =>
              item.course.id === courseId ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },

      getItemById: (courseId: number) => {
        return get().items.find((item) => item.course.id === courseId);
      },
    }),
    {
      name: "shopping-cart", // Key for localStorage
      partialize: (state) => ({ items: state.items }), // Only persist items
      onRehydrateStorage: () => {
        console.log("Shopping cart: Starting rehydration...");
        return (state, error) => {
          if (error) {
            console.log("Shopping cart: Rehydration error:", error);
          } else {
            console.log(
              "Shopping cart: Rehydration finished, items:",
              state?.items?.length || 0
            );
          }
        };
      },
    }
  )
);
