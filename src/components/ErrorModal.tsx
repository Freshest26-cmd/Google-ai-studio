import { motion, AnimatePresence } from "motion/react";
import { XCircle, X } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function ErrorModal({ isOpen, onClose, title = "Purchase Error", message }: ErrorModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full -z-10" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                <XCircle size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                  {title}
                </h3>
                <p className="text-zinc-400 text-xs uppercase tracking-widest leading-relaxed">
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors mt-4"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
