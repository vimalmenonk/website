import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/account', label: 'Account' },
  { to: '/admin', label: 'Admin' },
];

function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-white md:text-2xl">
          Glow<span className="bg-gradient-to-r from-pink-400 via-violet-300 to-blue-300 bg-clip-text text-transparent">vitra</span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition ${isActive ? 'bg-blue-500/20 text-blue-200' : 'text-gray-300 hover:text-blue-200'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="neon-btn-soft text-xs md:text-sm">
            Cart <span className="ml-1 rounded-full bg-blue-500/30 px-1.5 py-0.5 text-[11px]">{items.length}</span>
          </Link>
          {user ? (
            <button type="button" className="neon-btn text-xs md:text-sm" onClick={logout}>Logout</button>
          ) : (
            <Link to="/auth" className="neon-btn text-xs md:text-sm">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
