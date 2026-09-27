export default function Hero() {
  return (
    <section className="w-full bg-[#F3F4F6] px-6 pt-6 pb-16">
      <div className="w-full mx-auto">

        {/* Hero image */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: "21/9" }}
        >
          <img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1800&auto=format&fit=crop&q=85"
            alt="Music equipment and speakers on display"
            className="w-full h-full object-cover"
          />

          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center px-6">

            <p className="text-xs font-semibold tracking-widest text-white/70 uppercase mb-2">
              New Collection
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Sound, redefined.
            </h2>

            <p className="mt-3 text-sm text-white/70 max-w-xs">
              Discover instruments and gear built for every stage of your journey.
            </p>

            <a
              href="#"
              className="mt-6 inline-block text-sm font-medium text-white border border-[#FCA5A5] px-6 py-2.5 rounded-full hover:bg-[#FCA5A5] hover:text-[#111827] transition-all duration-200"
            >
              Shop now
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}