import { motion } from "motion/react";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cartStore, CartItem } from "../data/cartStore";

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setItems(cartStore.getItems());
  }, []);

  const total = cartStore.getTotal();

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[100dvh] bg-black flex items-center justify-center p-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Order Confirmed</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Your elite gear is on its way</p>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wider">
            Thank you for choosing Slam Dunk. We've sent a confirmation email to your inbox with tracking details.
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-black text-white pt-32 pb-24 px-12 md:px-24">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Back to Store</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Truck size={20} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Shipping Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">First Name</label>
                  <input type="text" className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 focus:border-accent outline-none transition-colors text-sm" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Last Name</label>
                  <input type="text" className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 focus:border-accent outline-none transition-colors text-sm" placeholder="Doe" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Address</label>
                  <input type="text" className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 focus:border-accent outline-none transition-colors text-sm" placeholder="123 Elite Street" />
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Card Payment</h2>
              </div>
              
              <div className="space-y-6">
                {/* Simple Card Form */}
                <div className="space-y-6 p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Cardholder Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 focus:border-accent outline-none transition-colors text-sm uppercase tracking-widest font-bold" 
                      placeholder="JOHN DOE" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 focus:border-accent outline-none transition-colors text-sm font-mono" 
                        placeholder="0000 0000 0000 0000" 
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <div className="w-8 h-5 bg-zinc-800 rounded flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 -mr-1.5" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Expiry Date</label>
                      <input 
                        type="text" 
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 focus:border-accent outline-none transition-colors text-sm font-mono" 
                        placeholder="MM/YY" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">CVC</label>
                      <input 
                        type="text" 
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 focus:border-accent outline-none transition-colors text-sm font-mono" 
                        placeholder="123" 
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 uppercase tracking-widest text-center px-8">
                  Your payment is secured with 256-bit SSL encryption. We do not store your full card details.
                </p>
              </div>
            </section>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-8 sticky top-32">
              <h2 className="text-xl font-black uppercase tracking-tighter mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-black border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">QTY: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Subtotal</span>
                  <span className="text-sm font-bold tracking-tighter">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Shipping</span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm uppercase tracking-[0.2em] font-black">Total</span>
                  <span className="text-3xl font-black tracking-tighter text-accent">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-accent text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] mt-12 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </button>

              <div className="flex items-center justify-center gap-2 mt-6 text-zinc-600">
                <ShieldCheck size={14} />
                <span className="text-[8px] uppercase tracking-widest font-bold">Secure SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
