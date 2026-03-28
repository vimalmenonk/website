import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

function CheckoutPage() {
  const { items, subtotal, shipping, total, refreshCart } = useCart();
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
    <div className="space-y-6">
      <h1 className="section-title">Checkout</h1>
      <form onSubmit={submitOrder} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="panel-shell grid gap-4 p-6 md:grid-cols-2">
          <h2 className="md:col-span-2 text-lg font-semibold text-white">Shipping Address</h2>
          <input className="input-base" placeholder="Full Name" required />
          <input className="input-base" placeholder="Email Address" type="email" required />
          <input className="input-base" placeholder="Phone Number" required />
          <input className="input-base" placeholder="City" required />
          <input className="input-base md:col-span-2" placeholder="Full Address" required />
          {error && <p className="md:col-span-2 text-sm text-red-300">{error}</p>}
          <button type="submit" className="neon-btn md:col-span-2">Save & Continue</button>
        </section>

        <aside className="panel-shell h-fit space-y-4 p-6">
          <h2 className="text-lg font-semibold text-white">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-300">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span>{item.name}</span>
                <span>₹{Math.round(item.price * item.qty * 10)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1 border-t border-white/10 pt-3 text-sm">
            <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>₹{Math.round(subtotal * 10)}</span></div>
            <div className="flex justify-between text-gray-300"><span>Shipping</span><span>₹{Math.round(shipping * 10)}</span></div>
            <div className="flex justify-between text-lg font-semibold text-white"><span>Total</span><span>₹{Math.round(total * 10)}</span></div>
          </div>
          <button type="submit" className="neon-btn w-full">Place Order</button>
        </aside>
      </form>
    </div>
  );
}

export default CheckoutPage;
