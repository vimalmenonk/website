import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data.slice(0, 4))).catch(() => setProducts([]));
  }, []);

  return (
    <div className="space-y-10">
      <section className="panel-shell relative overflow-hidden p-8 md:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative max-w-3xl space-y-5">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Transform Your Room Into a Vibe</h1>
          <p className="text-lg text-gray-300">Lighting that changes everything.</p>
          <Link to="/products" className="neon-btn inline-block">Shop Now</Link>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Galaxy & Ocean Vibes</h2>
          <Link to="/products" className="text-blue-300 hover:text-blue-200">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
