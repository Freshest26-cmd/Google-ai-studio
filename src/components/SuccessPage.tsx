import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { cartStore } from "../data/cartStore";

export default function SuccessPage({ onContinue }: { onContinue: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear cart on success
    cartStore.clear();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        iconRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "back.out(1.7)" }
      )
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".success-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".success-btn",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.2"
      );

      // Subtle green wave animation
      gsap.to(".success-wave", {
        backgroundPosition: "200% center",
        duration: 10,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-[100dvh] bg-black flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background Success Gradient */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="success-wave absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.1)_50%,transparent_100%)] bg-[length:200%_100%]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div ref={iconRef} className="flex justify-center">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-2xl shadow-emerald-500/20">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight"
          >
            Payment <span className="text-emerald-500">Successful</span> 🎉
          </h1>
          <p className="success-text text-zinc-400 text-sm uppercase tracking-[0.2em] font-bold">
            Your order has been completed successfully.
          </p>
          <p className="success-text text-zinc-500 text-xs leading-relaxed max-w-xs mx-auto">
            Thank you for choosing Elite Gear. You will receive a confirmation email shortly with your order details.
          </p>
        </div>

        <div className="pt-8">
          <button 
            onClick={onContinue}
            className="success-btn w-full px-8 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-white/5"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
