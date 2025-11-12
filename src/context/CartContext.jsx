import React, { createContext, useContext, useEffect, useState } from 'react';

// Contexto para manejar el carrito de compras.
// Provee funciones: addToCart, removeFromCart, updateQuantity, clearCart,
// y valores calculados: totalItems y totalPrice.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Cargar estado inicial desde localStorage (persistencia simple)
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Guardar cambios en localStorage cada vez que cambian los items
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
      // Si falla el guardado, no bloqueamos la app
    }
  }, [items]);

  // Añadir un producto (o aumentar cantidad si ya existe)
  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  // Eliminar por id
  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  // Actualizar la cantidad (mínimo 1)
  const updateQuantity = (id, quantity) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  };

  const clearCart = () => setItems([]);

  // Totales calculados para mostrar en UI
  const totalItems = items.reduce((s, it) => s + (it.quantity || 0), 0);
  const totalPrice = items.reduce((s, it) => s + (it.quantity || 0) * (Number(it.price) || 0), 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook de conveniencia para usar el contexto
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartContext;
