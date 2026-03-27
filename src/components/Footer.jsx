function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-gray-400 md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Glowvitra. Atmosphere engineered for modern spaces.</p>
        <p>Designed for mood, focus, and transformation.</p>
      </div>
    </footer>
  );
}

export default Footer;
