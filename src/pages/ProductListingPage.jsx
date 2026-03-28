import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

function ProductListingPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const filtered = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );

  return (
    <div className="space-y-6">
      <div className="panel-shell flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <h1 className="section-title">Shop</h1>
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="input-base md:max-w-sm" placeholder="Search products" />
      </div>
      <p className="text-sm text-gray-400">Showing {filtered.length} of {products.length} products</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductListingPage;
