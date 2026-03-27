import { Link } from 'react-router-dom';
import { products } from '../services/mockData';

function AdminDashboardPage() {
  const lowStock = products.filter((product) => product.stock < 15).length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card p-5"><p className="text-gray-400">Total Products</p><p className="text-3xl font-bold">{products.length}</p></div>
        <div className="glass-card p-5"><p className="text-gray-400">Low Stock Items</p><p className="text-3xl font-bold">{lowStock}</p></div>
        <div className="glass-card p-5"><p className="text-gray-400">Monthly Revenue</p><p className="text-3xl font-bold">$18,420</p></div>
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
