import { motion } from "motion/react";
import { Zap, Shield, Target, Award } from "lucide-react";

const features = [
  {
    icon: <Zap size={24} />,
    title: "Explosive Power",
    description: "Engineered for maximum energy return on every bounce."
  },
  {
    icon: <Shield size={24} />,
    title: "Pro Durability",
    description: "Reinforced composite leather that withstands elite play."
  },
  {
    icon: <Target size={24} />,
    title: "Precision Grip",
    description: "Micro-texture surface for ultimate control and release."
  },
  {
    icon: <Award size={24} />,
    title: "Elite Status",
    description: "The official choice for professional athletes worldwide."
  }
];

export default function Features() {
  return (
    <section className="py-32 px-12 md:px-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tighter text-white">{feature.title}</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
