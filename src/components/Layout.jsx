import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const { pathname } = useLocation();
  const isAdminArea = pathname.startsWith('/admin');

  if (isAdminArea) {
    return (
      <div className="min-h-screen bg-[#070915] text-gray-100">
        <main className="mx-auto w-full max-w-[1500px] px-3 py-4 md:px-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
