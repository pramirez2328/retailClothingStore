import React, { createContext, useContext, useState } from 'react';

interface CartContextProps {
  cartItems: number;
  addItemToCart: () => void;
  removeItemFromCart: (arg0: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentCart = localStorage.getItem('cart');
  const [cartItems, setCartItems] = useState(currentCart ? JSON.parse(currentCart).length : 0);

  // Add an item to the cart
  const addItemToCart = () => {
    setCartItems((prev: number) => prev + 1);
  };

  // Remove an item from the cart
  const removeItemFromCart = (items: number) => {
    setCartItems((prev: number) => prev - items);
  };

  // Clear the cart
  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems(0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line
export const useCart = () => {
  // Custom hook to use the cart context
  // This hook will be used in components to access the cart state and functions
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
