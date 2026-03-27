import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 12 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [items]);

  const value = useMemo(
    () => ({ items, addToCart, updateQty, removeItem, clearCart, ...totals }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
