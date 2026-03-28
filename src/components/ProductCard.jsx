import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="panel-shell group overflow-hidden border-white/15 transition duration-300 hover:-translate-y-1 hover:border-blue-400/60">
      <img src={product.image} alt={product.name} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="space-y-3 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300">{product.category}</p>
          <h3 className="mt-1 text-base font-semibold text-white">{product.name}</h3>
        </div>
        <p className="text-sm text-gray-300">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-amber-300">₹{Math.round(product.price * 10)}</span>
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`} className="neon-btn-soft">Details</Link>
            <button type="button" className="neon-btn text-sm" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
