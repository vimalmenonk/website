import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../services/api';

function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct).catch(() => setProduct(null));
  }, [id]);

  if (!product) {
    return <p className="text-gray-300">Product not found.</p>;
  }

  return (
    <section className="grid gap-7 lg:grid-cols-[1.2fr_1fr]">
      <div className="panel-shell overflow-hidden p-3">
        <img src={product.image} alt={product.name} className="h-[460px] w-full rounded-xl object-cover" />
      </div>
      <div className="panel-shell space-y-6 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-blue-300">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{product.name}</h1>
          <p className="mt-4 text-sm text-gray-300">{product.description}</p>
        </div>
        <p className="text-4xl font-bold text-amber-300">₹{Math.round(product.price * 10)}</p>
        <div className="flex gap-3">
          <button type="button" className="neon-btn flex-1" onClick={() => addToCart(product)}>Add to Cart</button>
          <Link className="neon-btn-soft" to="/products">Back</Link>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
