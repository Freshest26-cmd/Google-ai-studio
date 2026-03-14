import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselArrows() {
  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
    >
      <motion.button
        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors"
        whileHover={{ scale: 1.1 }}
      >
        <ChevronLeft size={20} />
      </motion.button>
      <motion.button
        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors"
        whileHover={{ scale: 1.1 }}
      >
        <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );
}
