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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          Glow<span className="bg-neon bg-clip-text text-transparent">vitra</span>
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition hover:text-blue-300 ${isActive ? 'text-blue-300' : 'text-gray-300'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/cart" className="relative rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-200 hover:border-blue-400/50">
            Cart
            <span className="ml-2 rounded-full bg-neon px-2 py-0.5 text-xs text-white">{items.length}</span>
          </Link>
          {user ? (
            <button type="button" className="neon-btn text-sm" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/auth" className="neon-btn text-sm">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
