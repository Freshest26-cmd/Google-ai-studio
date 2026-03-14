import { motion } from "motion/react";
import gsap from "gsap";

export default function AddToCartButton() {
  const handleAddToCart = () => {
    const ball = document.getElementById("basketball-container");
    const cart = document.getElementById("cart-icon");

    if (!ball || !cart) return;

    const ballRect = ball.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const tl = gsap.timeline();

    // 1. Shrink the ball with a bit of a "squeeze" effect
    tl.to(ball, {
      scale: 0.1,
      opacity: 0.5,
      duration: 0.4,
      ease: "power4.in",
    });

    // 2. Create and animate the fire energy beam
    // We'll create a few particles for a better "fire" effect
    const createParticle = (delay: number) => {
      const particle = document.createElement("div");
      particle.className = "fixed pointer-events-none z-[100] rounded-full";
      particle.style.width = "12px";
      particle.style.height = "12px";
      particle.style.background = "linear-gradient(to right, #FF3C00, #FFD700)";
      particle.style.filter = "blur(4px)";
      particle.style.boxShadow = "0 0 15px #FF3C00, 0 0 30px #FFD700";
      particle.style.left = `${ballRect.left + ballRect.width / 2}px`;
      particle.style.top = `${ballRect.top + ballRect.height / 2}px`;
      document.body.appendChild(particle);

      gsap.to(particle, {
        left: cartRect.left + cartRect.width / 2,
        top: cartRect.top + cartRect.height / 2,
        scale: 0.2,
        opacity: 0,
        duration: 0.6,
        delay: delay,
        ease: "power2.in",
        onComplete: () => {
          particle.remove();
          if (delay === 0.2) { // Last particle triggers cart animation
            gsap.fromTo(cart, 
              { scale: 1, color: "#fff" }, 
              { scale: 1.8, color: "#FF3C00", duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(4)" }
            );
          }
        }
      });
    };

    // Spawn a few particles
    createParticle(0);
    createParticle(0.1);
    createParticle(0.2);

    // 3. Restore ball after a short delay
    tl.to(ball, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      className="bg-accent text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-accent/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 60, 0, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      Add to cart
    </motion.button>
  );
}
