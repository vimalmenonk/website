import { Link, useParams } from 'react-router-dom';
import { products } from '../services/mockData';
import { useCart } from '../context/CartContext';

function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <p className="text-gray-300">Product not found.</p>;
  }

  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-2xl object-cover" />
      <div className="glass-card space-y-6 p-6">
        <div>
          <p className="text-sm uppercase tracking-wider text-blue-300">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{product.name}</h1>
        </div>
        <p className="text-gray-300">{product.description}</p>
        <p className="text-3xl font-bold text-white">${product.price}</p>
        <p className="text-sm text-gray-400">Stock available: {product.stock}</p>
        <div className="flex gap-3">
          <button type="button" className="neon-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          <Link className="rounded-xl border border-white/15 px-4 py-2 hover:border-blue-400/70" to="/products">Back</Link>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
