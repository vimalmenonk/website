import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { fetchInventory, fetchProducts } from '../services/api';

function StatCard({ title, value, accent }) {
  return (
    <article className={`admin-panel p-5 ${accent}`}>
      <p className="text-sm text-slate-300">{title}</p>
      <p className="mt-2 text-4xl font-bold text-white">{value}</p>
    </article>
  );
}

function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setProducts([]));
    fetchInventory().then(setInventory).catch(() => setInventory([]));
  }, []);

  const metrics = useMemo(() => {
    const lowStock = inventory.filter((item) => item.stockQuantity > 0 && item.stockQuantity < 15).length;
    const outOfStock = inventory.filter((item) => item.stockQuantity === 0).length;
    const inventoryValue = inventory.reduce((acc, item) => acc + item.stockQuantity * item.price, 0);
    return { lowStock, outOfStock, inventoryValue };
  }, [inventory]);

  return (
    <AdminLayout
      title="Welcome back, Glowvitra Admin!"
      subtitle="Here’s what’s happening with your store today."
      actions={<Link to="/admin/inventory" className="neon-btn">View Inventory</Link>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Products" value={products.length} accent="bg-gradient-to-r from-blue-500/10 to-indigo-500/5" />
        <StatCard title="Low Stock Items" value={metrics.lowStock} accent="bg-gradient-to-r from-fuchsia-500/10 to-rose-500/5" />
        <StatCard title="Out of Stock" value={metrics.outOfStock} accent="bg-gradient-to-r from-orange-500/10 to-red-500/5" />
        <StatCard title="Inventory Value" value={`₹${Math.round(metrics.inventoryValue).toLocaleString('en-IN')}`} accent="bg-gradient-to-r from-violet-500/10 to-cyan-500/5" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="admin-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Inventory Status</h2>
            <Link to="/admin/inventory" className="text-sm font-semibold text-fuchsia-300">View All →</Link>
          </div>
          <div className="space-y-3">
            {inventory.slice(0, 5).map((item) => (
              <div key={item.productId} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-100">{item.productName}</span>
                  <span className="text-slate-300">{item.stockQuantity} units</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-700/60">
                  <div
                    className={`h-full rounded-full ${item.stockQuantity < 10 ? 'bg-red-500' : item.stockQuantity < 20 ? 'bg-amber-500' : 'bg-cyan-400'}`}
                    style={{ width: `${Math.min(100, item.stockQuantity)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel p-5">
          <h2 className="mb-4 text-xl font-semibold text-white">Top Products</h2>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-sm text-slate-200">{product.name}</p>
                <p className="text-sm font-semibold text-emerald-300">₹{Math.round(product.price).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;
