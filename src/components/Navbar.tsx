import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { cartStore } from "../data/cartStore";
import CartDrawer from "./CartDrawer";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onCheckout: () => void;
  onAuth: () => void;
}

export default function Navbar({ onCheckout, onAuth }: NavbarProps) {
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    setCartCount(cartStore.getCount());
    const unsubscribe = cartStore.subscribe(() => {
      setCartCount(cartStore.getCount());
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    logout();
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 ${
          isScrolled ? "h-20 bg-black/80 backdrop-blur-xl border-b border-white/5" : "h-24 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
            <div className="flex flex-col leading-none font-bold text-[10px] tracking-tighter uppercase text-white">
              <span>Elite</span>
              <span>Gear</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">Member</span>
                    <span className="text-[10px] uppercase tracking-tighter text-white font-black">{user.email?.split('@')[0]}</span>
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.1, color: "#FF3C00" }}
                    className="text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={onAuth}
                  whileHover={{ scale: 1.1, color: "#FF3C00" }}
                  className="text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                >
                  <User size={20} />
                </motion.button>
              )}
            </div>

            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.05 }}
              className="text-white transition-colors relative p-2 hover:bg-white/5 rounded-xl"
            >
              <ShoppingCart size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-lg shadow-accent/40"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-white/5 p-8 md:hidden flex flex-col gap-6"
            >
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-black uppercase tracking-widest text-white hover:text-accent transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={onCheckout}
      />
    </>
  );
}
