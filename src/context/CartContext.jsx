import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addCartItem, fetchCart, removeCartItem } from '../services/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const refreshCart = async () => {
    if (!localStorage.getItem('glowvitra_token')) {
      setItems([]);
      return;
    }

    try {
      const data = await fetchCart();
      setItems(data);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (product) => {
    await addCartItem(product.id, 1);
    await refreshCart();
  };

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;

    const item = items.find((entry) => entry.productId === productId);
    if (!item) return;

    await removeCartItem(productId);
    await addCartItem(productId, qty);
    await refreshCart();
  };

  const removeItem = async (productId) => {
    await removeCartItem(productId);
    await refreshCart();
  };

  const clearCart = async () => {
    await Promise.all(items.map((item) => removeCartItem(item.productId)));
    await refreshCart();
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 12 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [items]);

  const value = useMemo(
    () => ({ items, addToCart, updateQty, removeItem, clearCart, refreshCart, ...totals }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
