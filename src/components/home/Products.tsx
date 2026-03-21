import { products, Product } from "../../data/products";
import { motion } from "motion/react";
import { ShoppingCart, Star } from "lucide-react";
import { cartStore } from "../../data/cartStore";

interface ProductsProps {
  onSelectProduct: (product: Product) => void;
}

export default function Products({ onSelectProduct }: ProductsProps) {
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    cartStore.addItem(product);
  };

  return (
    <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Featured <span className="text-accent">Gear</span>
          </h2>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">
            Curated for professional performance
          </p>
        </div>
        <div className="flex gap-4">
          {["All", "Professional", "Outdoor", "Footwear"].map((cat) => (
            <button 
              key={cat}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                cat === "All" ? "bg-white text-black border-white" : "text-zinc-500 border-white/10 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => onSelectProduct(product)}
            className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-accent/30 transition-all duration-500 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-zinc-800">
              <img 
                src={product.image} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Quick Add Button */}
              <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="absolute bottom-6 right-6 w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-accent/40"
              >
                <ShoppingCart size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-black mb-1 block">
                    {product.category}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg">
                  <Star size={10} className="text-accent fill-accent" />
                  <span className="text-[10px] text-white font-bold">{product.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xl font-black text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  {product.stock} In Stock
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
