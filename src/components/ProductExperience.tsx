import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Precision Engineering",
    description: "Every ball is balanced to within 0.1 grams for perfect flight consistency.",
  },
  {
    title: "Quantum Grip Tech",
    description: "Our proprietary surface material adapts to moisture levels in real-time.",
  },
  {
    title: "Kinetic Core",
    description: "Internal energy distribution system maximizes bounce efficiency.",
  },
];

export default function ProductExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      featureRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-[120px] px-4 md:px-8 max-w-[1280px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Large Product Visual */}
        <div className="h-[520px] rounded-[24px] overflow-hidden bg-zinc-900 border border-white/5">
          <img
            src="https://picsum.photos/seed/experience/1200/800"
            alt="Product Experience"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        {/* Right: Feature Descriptions */}
        <div className="flex flex-col gap-12">
          <div className="mb-4">
            <h2 className="text-4xl font-bold text-white mb-4">Immersive Experience</h2>
            <p className="text-gray-400 max-w-md">
              Designed for those who demand excellence. Our technology pushes the boundaries of what's possible on the court.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                ref={(el) => { featureRefs.current[i] = el; }}
                className="flex flex-col gap-2 border-l-2 border-accent/20 pl-6 hover:border-accent hover:bg-white/5 hover:translate-x-2 transition-all duration-300 rounded-r-xl p-4 cursor-default"
              >
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
