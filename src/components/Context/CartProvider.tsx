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

  const addItemToCart = () => {
    setCartItems((prev: number) => prev + 1);
  };

  const removeItemFromCart = (items: number) => {
    setCartItems((prev: number) => prev - items);
  };

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

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
