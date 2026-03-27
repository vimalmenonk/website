import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-base text-gray-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
