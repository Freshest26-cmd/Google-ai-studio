import { motion } from "motion/react";
import { Star, ShoppingCart, TrendingUp, Eye } from "lucide-react";
import { products, Product } from "../data/products";
import { cartStore } from "../data/cartStore";

interface TrendingProductsProps {
  onSelectProduct: (product: Product) => void;
}

export default function TrendingProducts({ onSelectProduct }: TrendingProductsProps) {
  // Just take a subset or shuffle for "trending"
  const trending = products.slice(0, 3);

  return (
    <section className="py-24 px-12 md:px-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-2xl bg-accent/10 text-accent">
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Trending Now</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Most wanted gear this week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trending.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-zinc-900/10 border border-white/5 rounded-[2rem] p-6 hover:bg-zinc-900/30 transition-all duration-500 cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              <div className="flex gap-6">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-zinc-950 flex-shrink-0 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={10} 
                          className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-zinc-700"} 
                        />
                      ))}
                      <span className="text-[8px] text-zinc-500 ml-1">({product.reviewsCount})</span>
                    </div>
                    <h3 className="font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{product.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-black text-xl tracking-tighter text-white">${product.price}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        cartStore.addItem(product);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-accent hover:text-white transition-all text-zinc-400"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Stock Badge */}
              <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-zinc-950/80 border border-white/5 backdrop-blur-sm">
                <p className="text-[8px] font-bold uppercase tracking-widest text-emerald-500">
                  {product.stock} in stock
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
