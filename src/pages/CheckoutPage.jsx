import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

function CheckoutPage() {
  const { total, refreshCart } = useCart();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitOrder = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createOrder();
      await refreshCart();
      navigate('/account');
    } catch {
      setError('Unable to place order. Ensure cart has in-stock items and you are logged in.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-white">Checkout</h1>
      <form onSubmit={submitOrder} className="glass-card grid gap-4 p-6 md:grid-cols-2">
        <input className="input-base" placeholder="Full Name" required />
        <input className="input-base" placeholder="Email" type="email" required />
        <input className="input-base md:col-span-2" placeholder="Shipping Address" required />
        <input className="input-base" placeholder="City" required />
        <input className="input-base" placeholder="ZIP" required />
        <input className="input-base md:col-span-2" placeholder="Card Number" required />
        <div className="md:col-span-2 flex items-center justify-between rounded-xl border border-white/10 p-4">
          <span className="text-gray-300">Order total</span>
          <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
        </div>
        {error && <p className="md:col-span-2 text-sm text-red-300">{error}</p>}
        <button type="submit" className="neon-btn md:col-span-2">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
