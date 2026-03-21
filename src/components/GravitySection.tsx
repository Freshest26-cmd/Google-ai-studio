import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GravityScene from "../three/GravityScene";
import { useWebGL } from "../hooks/useWebGL";

gsap.registerPlugin(ScrollTrigger);

export default function GravitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const { isSupported: webGLSupported, setIsSupported: setWebGLSupported } = useWebGL();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        canvasContainerRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[720px] py-[120px] px-4 md:px-8 max-w-[1280px] mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-[48px] items-center">
        {/* Left side: Text Block */}
        <div ref={textRef} className="col-span-12 lg:col-span-5">
          <h2 className="text-[48px] leading-[56px] font-semibold mb-6 text-white">
            Interactive <br />
            <span className="text-accent">Energy Nodes</span>
          </h2>
          <p className="text-[18px] leading-[28px] text-gray-400 mb-8 max-w-[520px]">
            Experience the future of product interaction. Our energy nodes react to your presence, 
            creating a unique gravitational field that showcases the fluid dynamics of our technology.
          </p>
          <button className="w-[180px] h-[48px] bg-accent text-white rounded-[12px] font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
            Explore More
          </button>
        </div>

        {/* Right side: Three.js Scene */}
        <div 
          ref={canvasContainerRef}
          className="col-span-12 lg:col-span-7 h-[520px] bg-black/40 rounded-[20px] relative overflow-hidden border border-white/5 flex items-center justify-center"
        >
          {webGLSupported === false ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent animate-pulse" />
              </div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
                Interactive Scene Unavailable <br />
                <span className="opacity-50">WebGL not supported in this environment</span>
              </p>
            </div>
          ) : webGLSupported === null ? (
            <div className="w-full h-full animate-pulse bg-white/5" />
          ) : (
            <Canvas 
              camera={{ position: [0, 0, 10], fov: 45 }}
              gl={{ antialias: true, powerPreference: "high-performance" }}
              onError={(error) => {
                console.warn("Gravity Canvas Error:", error);
                setWebGLSupported(false);
              }}
            >
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={1.4} />
              <GravityScene />
            </Canvas>
          )}
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
