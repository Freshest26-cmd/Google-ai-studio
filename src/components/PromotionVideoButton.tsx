import { motion } from "motion/react";

export default function PromotionVideoButton() {
  return (
    <motion.button
      className="flex items-center gap-4 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-accent transition-colors">
        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1 group-hover:border-l-accent transition-colors" />
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 group-hover:text-white transition-colors text-left leading-tight">
        Promotion<br />video
      </span>
    </motion.button>
  );
}
