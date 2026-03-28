function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080a18]/80 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-gray-400 md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Glowvitra. All rights reserved.</p>
        <p className="text-xs tracking-wide text-gray-500">Secure Checkout • Fast Shipping • Easy Returns</p>
      </div>
    </footer>
  );
}

export default Footer;
