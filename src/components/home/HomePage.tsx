import { motion } from "motion/react";
import Hero from "./Hero";
import Products from "./Products";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Product } from "../../data/products";

interface HomePageProps {
  onCheckout: () => void;
  onAuth: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function HomePage({ onCheckout, onAuth, onSelectProduct }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen bg-black overflow-x-hidden"
    >
      <Navbar onCheckout={onCheckout} onAuth={onAuth} />
      
      <main className="relative">
        <Hero />
        
        {/* About Section (Brief) */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-y border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" 
                alt="Premium Lifestyle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 rounded-full border-2 border-white" />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-tight">
                Beyond the <br /> <span className="text-accent">Ordinary</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                At Elite Gear, we believe that quality is more than just a standard—it's a culture of innovation, 
                perseverance, and style. Our mission is to provide you with the most advanced 
                premium gear that pushes the boundaries of what's possible in your daily life.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <span className="text-3xl font-black text-white">15K+</span>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Athletes Served</p>
                </div>
                <div className="space-y-2">
                  <span className="text-3xl font-black text-white">24/7</span>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Support Ready</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Products onSelectProduct={onSelectProduct} />
      </main>

      <Footer />
    </motion.div>
  );
}
