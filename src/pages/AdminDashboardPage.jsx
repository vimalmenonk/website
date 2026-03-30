import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { fetchDashboardSummary } from '../services/api';

function StatCard({ title, value }) {
  return (
    <article className="admin-panel p-5">
      <p className="text-sm text-slate-300">{title}</p>
      <p className="mt-2 text-4xl font-bold text-white">{value}</p>
    </article>
  );
}

function AdminDashboardPage() {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboardSummary().then(setSummary).catch(() => null);
  }, []);

  return (
    <AdminLayout
      title="Welcome back, Glowvitra Admin!"
      subtitle="Store summary from live database data."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Products" value={summary.totalProducts} />
        <StatCard title="Total Orders" value={summary.totalOrders} />
        <StatCard title="Total Revenue" value={`₹${Math.round(summary.totalRevenue).toLocaleString('en-IN')}`} />
        <StatCard title="Total Users" value={summary.totalUsers} />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;
