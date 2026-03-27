import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="glass-card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-blue-500/60">
      <img src={product.image} alt={product.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-blue-300">{product.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{product.name}</h3>
        </div>
        <p className="text-sm text-gray-300">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">${product.price}</span>
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`} className="rounded-lg border border-white/15 px-3 py-2 text-sm text-gray-100 hover:border-blue-400/70">
              Details
            </Link>
            <button type="button" className="neon-btn text-sm" onClick={() => addToCart(product)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
