import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { items, updateQty, removeItem, subtotal, shipping, total } = useCart();

  return (
    <div className="space-y-6">
      <h1 className="section-title">Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="panel-shell overflow-hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-300">Cart is empty. <Link to="/products" className="text-blue-300">Browse products</Link></td>
                </tr>
              ) : items.map((item) => (
                <tr key={item.id} className="border-t border-white/10 text-gray-100">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">₹{Math.round(item.price * 10)}</td>
                  <td className="px-4 py-3">
                    <input type="number" min="1" value={item.qty} onChange={(e) => updateQty(item.productId, Number(e.target.value))} className="input-base w-20 px-2 py-1.5" />
                  </td>
                  <td className="px-4 py-3">₹{Math.round(item.price * item.qty * 10)}</td>
                  <td className="px-4 py-3"><button type="button" onClick={() => removeItem(item.productId)} className="text-red-300 hover:text-red-200">✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="panel-shell h-fit space-y-3 p-6">
          <h2 className="text-xl font-semibold text-white">Summary</h2>
          <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>₹{Math.round(subtotal * 10)}</span></div>
          <div className="flex justify-between text-gray-300"><span>Shipping</span><span>₹{Math.round(shipping * 10)}</span></div>
          <div className="flex justify-between border-t border-white/10 pt-3 text-xl font-bold text-white"><span>Total</span><span>₹{Math.round(total * 10)}</span></div>
          <Link to="/checkout" className="neon-btn block text-center">Proceed to Checkout</Link>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
