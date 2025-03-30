import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);

  const addToCart = (dish) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === dish.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== dishId));
  };

  const updateQuantity = (dishId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(dishId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === dishId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const value = {
    isOpen,
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 