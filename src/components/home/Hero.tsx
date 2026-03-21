import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      )
      .fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-24"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl space-y-8">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]"
        >
          Elevate Your <span className="text-accent">Game</span>
        </h1>
        <p 
          ref={subtextRef}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Experience the future of basketball with our premium interactive gear. 
          Designed for those who demand excellence on and off the court.
        </p>
        <div className="pt-4">
          <button 
            ref={ctaRef}
            className="px-10 py-5 bg-accent text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-2xl shadow-accent/20"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute bottom-12 left-12 w-24 h-24 border border-white/5 rounded-full animate-pulse" />
      <div className="absolute top-32 right-24 w-12 h-12 border border-accent/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
    </section>
  );
}
