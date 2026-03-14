import { motion } from "motion/react";

export default function PriceTag() {
  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <span className="text-4xl font-bold text-accent">$34.99</span>
      <span className="text-[9px] uppercase tracking-widest text-gray-medium font-semibold">
        Size: 29.5" • Official
      </span>
    </motion.div>
  );
}
