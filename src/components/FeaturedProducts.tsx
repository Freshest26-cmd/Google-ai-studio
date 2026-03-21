import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";

const products = [
  {
    id: 1,
    name: "Aero-Dynamic Ball",
    price: "$129",
    image: "https://picsum.photos/seed/ball1/600/400",
    category: "Pro Series",
  },
  {
    id: 2,
    name: "Gravity Grip",
    price: "$89",
    image: "https://picsum.photos/seed/ball2/600/400",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Neon Pulse",
    price: "$159",
    image: "https://picsum.photos/seed/ball3/600/400",
    category: "Limited Edition",
  },
];

export default function FeaturedProducts() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    
    gsap.to(card, {
      scale: 1.04,
      boxShadow: "0 20px 40px rgba(255, 60, 0, 0.1)",
      borderColor: "rgba(255, 60, 0, 0.2)",
      duration: 0.4,
      ease: "power2.out",
    });
    
    if (img) {
      gsap.to(img, {
        y: -12,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
      borderColor: "rgba(255, 255, 255, 0.05)",
      duration: 0.4,
      ease: "power2.out",
    });
    
    if (img) {
      gsap.to(img, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <section className="w-full py-[120px] px-4 md:px-8 max-w-[1280px] mx-auto">
      <div className="flex flex-col mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Featured Gear</h2>
        <div className="w-20 h-1 bg-accent" />
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative h-[420px] bg-zinc-900/50 rounded-[20px] overflow-hidden border border-white/5 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Image Container */}
            <div className="h-[260px] overflow-hidden bg-zinc-800">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2 block">
                {product.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-2xl font-light text-white/60">{product.price}</p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
