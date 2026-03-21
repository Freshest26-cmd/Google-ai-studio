const testimonials = [
  {
    name: "Marcus Jordan",
    role: "Pro Athlete",
    text: "The responsiveness of this ball is unlike anything I've ever played with. It feels like an extension of my hand.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    name: "Elena Rodriguez",
    role: "Skills Coach",
    text: "I recommend Slam Dunk gear to all my students. The consistency helps them build muscle memory faster.",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
  {
    name: "David Chen",
    role: "Collector",
    text: "Not just a sports equipment, it's a piece of art. The design and build quality are absolutely top-tier.",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-[120px] px-4 md:px-8 max-w-[1280px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Trusted by Pros</h2>
        <p className="text-gray-400">Join the community of elite athletes worldwide.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 p-8 rounded-[16px] border border-white/5 flex flex-col justify-between hover:bg-zinc-900/60 transition-colors duration-300"
          >
            <p className="text-gray-300 italic mb-8 leading-relaxed">
              "{t.text}"
            </p>
            
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-accent/30"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">{t.name}</span>
                <span className="text-accent text-[10px] uppercase tracking-widest font-bold">
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
