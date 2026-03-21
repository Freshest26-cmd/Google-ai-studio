import { motion } from "motion/react";
import { Star, Quote, User } from "lucide-react";

const reviews = [
  {
    name: "Marcus Jordan",
    role: "Pro Athlete",
    content: "The grip on the Elite Series is unlike anything I've played with. It feels like an extension of my hand.",
    rating: 5,
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    name: "Sarah Chen",
    role: "Coach",
    content: "I recommend these to all my students. The durability for outdoor play is unmatched in the industry.",
    rating: 5,
    avatar: "https://picsum.photos/seed/user2/100/100"
  },
  {
    name: "David Smith",
    role: "Street Player",
    content: "Neon Pulse looks incredible in low light. Finally, a ball that performs as good as it looks.",
    rating: 4,
    avatar: "https://picsum.photos/seed/user3/100/100"
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-24 px-12 md:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
              Trusted By <br /> The Best
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-black text-white tracking-tighter">4.9/5.0</p>
              <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Average Rating</p>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-accent text-accent" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 group hover:bg-zinc-900/40 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 text-white/5 group-hover:text-accent/10 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={i < review.rating ? "fill-accent text-accent" : "text-zinc-800"} 
                  />
                ))}
              </div>

              <p className="text-sm text-zinc-300 italic mb-8 leading-relaxed uppercase tracking-wide">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight text-xs">{review.name}</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
