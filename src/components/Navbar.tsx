import { motion } from "motion/react";
import { User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-24 px-12 md:px-24">
      {/* Logo */}
      <div className="flex items-center gap-3 -ml-12">
        <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>
        <div className="flex flex-col leading-none font-bold text-[10px] tracking-tighter uppercase">
          <span>Slam</span>
          <span>Dunk</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-12">
        {["Products", "About us", "Contacts"].map((item) => (
          <motion.a
            key={item}
            href="#"
            className={`text-xs font-medium uppercase tracking-widest relative group ${
              item === "Products" ? "text-accent" : "text-white"
            }`}
            whileHover={{ color: "#FF3C00" }}
          >
            {item}
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1, color: "#FF3C00" }}
          className="text-white transition-colors"
        >
          <User size={20} />
        </motion.button>
        <motion.button
          id="cart-icon"
          whileHover={{ scale: 1.1, color: "#FF3C00" }}
          className="text-white transition-colors"
        >
          <ShoppingCart size={20} />
        </motion.button>
      </div>
    </nav>
  );
}
