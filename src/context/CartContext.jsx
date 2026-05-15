import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const location = useLocation();
  
  // 1. Get current slug from URL
  const getSlug = () => {
    const parts = location.pathname.split('/');
    const slug = parts[1];
    if (!slug || ['admin', 'login', 'launch', 'founder'].includes(slug)) return null;
    return slug;
  };

  const currentSlug = getSlug();

  // 2. Initialize 'allCarts' from localStorage: { [slug]: items[] }
  const [allCarts, setAllCarts] = useState(() => {
    const saved = localStorage.getItem('carthive_all_carts');
    return saved ? JSON.parse(saved) : {};
  });

  // 3. Persist allCarts whenever it changes
  useEffect(() => {
    localStorage.setItem('carthive_all_carts', JSON.stringify(allCarts));
  }, [allCarts]);

  // 4. Get the active cart for the current slug
  const cart = useMemo(() => {
    if (!currentSlug) return [];
    return allCarts[currentSlug] || [];
  }, [allCarts, currentSlug]);

  // 5. Update functions that only affect the current slug's cart
  const updateCurrentCart = (newCartItems) => {
    if (!currentSlug) return;
    setAllCarts(prev => ({
      ...prev,
      [currentSlug]: newCartItems
    }));
  };

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item.id === product.id);
    let newItems;
    if (existing) {
      newItems = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newItems = [...cart, { ...product, quantity }];
    }
    updateCurrentCart(newItems);
  };

  const removeFromCart = (productId) => {
    const newItems = cart.filter(item => item.id !== productId);
    updateCurrentCart(newItems);
  };

  const updateQuantity = (productId, delta) => {
    const newItems = cart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCurrentCart(newItems);
  };

  const clearCart = () => updateCurrentCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
