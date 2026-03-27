import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { items, updateQty, removeItem, subtotal, shipping, total } = useCart();

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Your Cart</h1>
        {items.length === 0 ? (
          <div className="glass-card p-6 text-gray-300">Cart is empty. <Link to="/products" className="text-blue-300">Browse products</Link></div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="glass-card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-semibold text-white">{item.name}</h2>
                <p className="text-sm text-gray-400">${item.price} each</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, Number(e.target.value))}
                  className="w-20 rounded-lg border border-white/20 bg-transparent px-3 py-2"
                />
                <button type="button" onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-200">Remove</button>
              </div>
            </div>
          ))
        )}
      </section>

      <aside className="glass-card h-fit space-y-3 p-6">
        <h2 className="text-xl font-semibold text-white">Order Summary</h2>
        <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-gray-300"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
        <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold text-white"><span>Total</span><span>${total.toFixed(2)}</span></div>
        <Link to="/checkout" className="neon-btn block text-center">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}

export default CartPage;
