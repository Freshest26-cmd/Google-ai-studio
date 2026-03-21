import { motion, AnimatePresence } from "motion/react";
import { X, Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { Product } from "../data/products";
import { cartStore } from "../data/cartStore";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-10 p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-accent transition-colors group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Left: Image Section */}
          <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto bg-zinc-900">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
            
            {/* Category Badge */}
            <div className="absolute bottom-8 left-8 px-4 py-2 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em]">
              {product.category}
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-zinc-800"} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    {product.rating} Rating • {product.reviewsCount} Reviews
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                  {product.name}
                </h2>
                <p className="text-3xl font-black text-accent tracking-tighter">
                  ${product.price}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed uppercase tracking-wide">
                {product.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
                  <Truck size={16} className="text-accent" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-300">Free Express Shipping</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
                  <ShieldCheck size={16} className="text-accent" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-300">2 Year Warranty</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
                  <RefreshCcw size={16} className="text-accent" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-300">30-Day Returns</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500">{product.stock} Units In Stock</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    cartStore.addItem(product);
                    onClose();
                  }}
                  className="flex-1 bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-3 group"
                >
                  <ShoppingCart size={16} className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
                <button className="px-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
                  <Star size={20} className="text-zinc-500" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
