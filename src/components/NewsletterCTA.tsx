export default function NewsletterCTA() {
  return (
    <section className="w-full py-[120px] px-4 md:px-8 max-w-[1280px] mx-auto">
      <div className="relative h-[420px] w-full rounded-[32px] overflow-hidden bg-zinc-900 border border-white/5 flex flex-col items-center justify-center text-center px-6">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-[560px]">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay in the <span className="text-accent">Flow</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Subscribe to get early access to limited drops, exclusive events, and the latest in sports technology.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-[48px] bg-black/50 border border-white/10 rounded-[12px] px-6 text-white focus:outline-none focus:border-accent transition-colors"
            />
            <button className="h-[48px] px-8 bg-accent text-white rounded-[12px] font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
