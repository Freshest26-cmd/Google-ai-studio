import { motion } from "motion/react";
import gsap from "gsap";
import { cartStore } from "../data/cartStore";
import { products } from "../data/products";

interface GetStartedButtonProps {
  onClick?: () => void;
}

export default function GetStartedButton({ onClick }: GetStartedButtonProps) {
  const playModernSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for a "ping" sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1); // A4

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);

    // Second "whoosh" layer
    const noiseOsc = audioContext.createOscillator();
    const noiseGain = audioContext.createGain();
    
    noiseOsc.type = 'triangle';
    noiseOsc.frequency.setValueAtTime(100, audioContext.currentTime);
    noiseOsc.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);
    
    noiseGain.gain.setValueAtTime(0.05, audioContext.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    noiseOsc.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    
    noiseOsc.start();
    noiseOsc.stop(audioContext.currentTime + 0.1);
  };

  const handleClick = () => {
    playModernSound();
    if (onClick) onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      className="bg-accent text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-accent/20 rounded-xl cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: "#FF5500",
        boxShadow: "0 20px 40px rgba(255, 60, 0, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      Get Started
    </motion.button>
  );
}
