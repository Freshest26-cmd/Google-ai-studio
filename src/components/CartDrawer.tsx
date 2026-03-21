import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cartStore, CartItem } from "../data/cartStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(cartStore.getItems());
    return cartStore.subscribe(() => {
      setItems(cartStore.getItems());
    });
  }, []);

  const total = cartStore.getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <ShoppingBag className="text-accent" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tighter">Your Cart</h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'} selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center">
                    <ShoppingBag size={32} strokeWidth={1} />
                  </div>
                  <div className="text-center">
                    <p className="uppercase tracking-[0.2em] text-xs font-bold text-white mb-2">Empty Cart</p>
                    <p className="text-[10px] uppercase tracking-widest">Add some elite gear to get started</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-accent text-[10px] uppercase tracking-widest font-bold hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-zinc-900 overflow-hidden border border-white/5 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold uppercase text-sm tracking-tight leading-tight">{item.name}</h3>
                          <button
                            onClick={() => cartStore.removeItem(item.id)}
                            className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{item.category}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 bg-zinc-900 rounded-lg px-2 py-1 border border-white/5">
                          <span className="text-[10px] font-bold text-zinc-400">QTY: {item.quantity}</span>
                        </div>
                        <p className="font-bold text-accent tracking-tighter text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-zinc-900/30 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-widest text-[10px] text-zinc-500 font-bold">Subtotal</span>
                    <span className="font-bold tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-widest text-[10px] text-zinc-500 font-bold">Shipping</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Free</span>
                  </div>
                  <div className="pt-4 flex justify-between items-center border-t border-white/5">
                    <span className="uppercase tracking-[0.2em] text-xs font-black">Total Amount</span>
                    <span className="text-3xl font-black tracking-tighter text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full bg-accent text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent/90 transition-all duration-300 shadow-xl shadow-accent/20 flex items-center justify-center gap-3 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
