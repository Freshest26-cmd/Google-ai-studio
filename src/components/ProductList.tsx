import { motion } from "motion/react";
import { Plus, ShoppingCart, Star, Eye } from "lucide-react";
import { products, Product } from "../data/products";
import { cartStore } from "../data/cartStore";

interface ProductListProps {
  onSelectProduct: (product: Product) => void;
}

export default function ProductList({ onSelectProduct }: ProductListProps) {
  return (
    <section id="products" className="py-32 px-12 md:px-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent uppercase tracking-[0.4em] text-[10px] font-black mb-4"
            >
              The Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white"
            >
              Elite Gear <br /> For You
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 max-w-sm text-xs uppercase tracking-widest leading-relaxed"
          >
            Engineered for maximum performance in every situation. Choose your gear and elevate your lifestyle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(255, 60, 0, 0.15)",
                borderColor: "rgba(255, 60, 0, 0.3)"
              }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5
              }}
              className="group relative bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8 hover:bg-zinc-900/40 transition-all duration-500 cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              {/* Image Container */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8 bg-zinc-950">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      cartStore.addItem(product);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl shadow-accent/40"
                  >
                    <Plus size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Eye size={20} />
                  </motion.button>
                </div>

                {/* Stock Badge */}
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <p className="text-[8px] font-black uppercase tracking-widest text-emerald-400">
                    {product.stock} units left
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={10} 
                            className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-zinc-700"} 
                          />
                        ))}
                      </div>
                      <span className="text-[8px] text-zinc-500 font-bold">({product.reviewsCount})</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-black mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-black uppercase tracking-tighter text-xl text-white group-hover:text-accent transition-colors">{product.name}</h3>
                  </div>
                  <p className="font-black text-2xl tracking-tighter text-white">${product.price}</p>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Footer Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cartStore.addItem(product);
                }}
                className="w-full mt-8 py-4 rounded-2xl border border-white/10 text-[10px] uppercase tracking-[0.3em] font-black text-white hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                <ShoppingCart size={14} className="group-hover:scale-110 transition-transform" />
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
