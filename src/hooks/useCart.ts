import { useShoppingCart } from "@/store/shopping-cart";
import { toast } from "sonner";
import type { Course } from "@/types/couse";

export const useCart = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemById,
    toggleCart,
    setIsOpen,
  } = useShoppingCart();

  // Calculate computed values
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.course.price * item.quantity,
    0
  );

  // Helper function to check if a course is in the cart
  const isInCart = (courseId: string): boolean => {
    return items.some((item) => item.course.id === courseId);
  };

  // Helper function to get quantity of a specific course in cart
  const getQuantity = (courseId: string): number => {
    const item = getItemById(courseId);
    return item ? item.quantity : 0;
  };

  // Helper function to add course with notification/feedback
  const addToCart = (course: Course) => {
    addItem(course);
    toast.success(`تم إضافة "${course.title}" إلى السلة`);
  };

  // Helper function to remove course with notification/feedback
  const removeFromCart = (courseId: string) => {
    const item = getItemById(courseId);
    if (item) {
      removeItem(courseId);
      toast.info(`تم حذف "${item.course.title}" من السلة`);
    }
  };

  // Toggle item in cart (add if not present, remove if present)
  const toggleInCart = (course: Course) => {
    if (isInCart(course.id)) {
      removeFromCart(course.id);
    } else {
      addToCart(course);
    }
  };

  return {
    // State
    items,
    totalItems,
    totalPrice,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleInCart,
    toggleCart,
    setIsOpen,

    // Helpers
    isInCart,
    getQuantity,
    getItemById,
  };
};
