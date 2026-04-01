import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What makes our elite gear different?",
    answer: "Our Elite Series features proprietary materials and precision engineering that ensures superior performance and durability even in high-intensity use."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 50 countries worldwide. Shipping times vary by location but typically range from 5-12 business days for international orders."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day no-questions-asked return policy. If you're not completely satisfied with your gear, simply return it in its original packaging for a full refund."
  },
  {
    question: "How do I care for my premium gear?",
    answer: "For premium gear, we recommend following the specific care instructions included with each product and storing them in a cool, dry place."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-12 md:px-24 bg-zinc-950 border-y border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex p-3 rounded-2xl bg-accent/10 text-accent mb-6">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Common Questions</h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Everything you need to know about our elite gear</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/20"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold uppercase tracking-tight text-white text-sm">{faq.question}</span>
                <div className="text-accent">
                  {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-zinc-400 text-xs leading-relaxed uppercase tracking-wider">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
