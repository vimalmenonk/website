import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
