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
  const inventoryValue = inventory.reduce((acc, item) => acc + item.stockQuantity, 0);

  return (
    <div className="space-y-7">
      <h1 className="section-title">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel-shell p-5"><p className="text-xs uppercase text-gray-400">Total Products</p><p className="text-3xl font-bold text-white">{products.length}</p></div>
        <div className="panel-shell p-5"><p className="text-xs uppercase text-gray-400">Low Stock</p><p className="text-3xl font-bold text-amber-300">{lowStock}</p></div>
        <div className="panel-shell p-5"><p className="text-xs uppercase text-gray-400">Units In Inventory</p><p className="text-3xl font-bold text-emerald-300">{inventoryValue}</p></div>
      </div>
      <div className="panel-shell space-y-3 p-6">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link className="neon-btn" to="/admin/products">Manage Products</Link>
          <Link className="neon-btn" to="/admin/products/new">Add Product</Link>
          <Link className="neon-btn" to="/admin/inventory">Inventory</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
