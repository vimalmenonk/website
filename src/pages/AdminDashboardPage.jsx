import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchInventory, fetchProducts } from '../services/api';

function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setProducts([]));
    fetchInventory().then(setInventory).catch(() => setInventory([]));
  }, []);

  const lowStock = inventory.filter((item) => item.stockQuantity < 15).length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card p-5"><p className="text-gray-400">Total Products</p><p className="text-3xl font-bold">{products.length}</p></div>
        <div className="glass-card p-5"><p className="text-gray-400">Low Stock Items</p><p className="text-3xl font-bold">{lowStock}</p></div>
        <div className="glass-card p-5"><p className="text-gray-400">Tracked SKUs</p><p className="text-3xl font-bold">{inventory.length}</p></div>
      </div>
      <div className="glass-card flex flex-wrap gap-3 p-6">
        <Link className="neon-btn" to="/admin/products">Manage Products</Link>
        <Link className="neon-btn" to="/admin/products/new">Add Product</Link>
        <Link className="neon-btn" to="/admin/inventory">Inventory</Link>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
