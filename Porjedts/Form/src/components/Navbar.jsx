export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="w-8 h-8 rounded-full bg-[#F3F4F6] border border-[#4B5563]/20" />

        {/* Centered navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">

          <a
            href="#"
            className="text-sm text-[#111827] transition-all duration-200 ease-out hover:text-[#2D1B69] hover:scale-105"
          >
            Home
          </a>

          <a
            href="#"
            className="text-sm text-[#111827] transition-all duration-200 ease-out hover:text-[#2D1B69] hover:scale-105"
          >
            Products
          </a>

          <a
            href="#"
            className="text-sm text-[#111827] transition-all duration-200 ease-out hover:text-[#2D1B69] hover:scale-105"
          >
            Sign In
          </a>

          {/* Search */}
          <input
            type="search"
            placeholder="Search"
            className="w-32 h-8 px-3 rounded-full border border-[#4B5563]/20 bg-white text-sm text-[#111827] placeholder-[#4B5563] outline-none transition-all duration-200 ease-out hover:border-[#2D1B69] hover:text-[#2D1B69] hover:scale-105 focus:border-[#2D1B69]"
          />

        </nav>

        {/* Right spacer */}
        <div className="w-8 h-8" />

      </div>
    </header>
  );
}