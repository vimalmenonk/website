import { Link, NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/inventory', label: 'Inventory' },
];

function AdminLayout({ title, subtitle, actions, children }) {
  return (
    <div className="admin-shell grid min-h-[calc(100vh-2rem)] grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
      <aside className="admin-panel p-4 lg:p-5">
        <Link to="/admin/dashboard" className="mb-6 block text-3xl font-bold tracking-tight text-white">
          G<span className="text-fuchsia-400">lowvitra</span>
        </Link>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-violet-500/25 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-3">
          <p className="mb-3 text-sm font-semibold text-slate-200">Quick Actions</p>
          <div className="space-y-2">
            <Link to="/admin/products/new" className="neon-btn block text-center text-sm">Add New Product</Link>
            <Link to="/admin/inventory" className="neon-btn-soft block text-center">View Reports</Link>
          </div>
        </div>
      </aside>

      <section className="space-y-4">
        <header className="admin-panel flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
          </div>
          {actions}
        </header>

        {children}
      </section>
    </div>
  );
}

export default AdminLayout;
