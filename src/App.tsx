/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import PromotionVideoButton from "./components/PromotionVideoButton";
import PriceTag from "./components/PriceTag";
import AddToCartButton from "./components/AddToCartButton";
import CarouselArrows from "./components/CarouselArrows";
import BasketballCanvas from "./components/BasketballCanvas";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <Navbar />

      <main className="relative w-full max-w-7xl px-12 md:px-24 flex flex-col items-center justify-center">
        {/* Hero Content Wrapper */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Promotion Video (Left) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <PromotionVideoButton />
          </div>

          {/* Heading & Price Group */}
          <div className="w-full flex flex-col items-start -ml-12 gap-4 md:gap-8">
            <motion.h1 
              className="relative text-spacing-hero text-gray-medium select-none whitespace-nowrap"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              SPACING
              
              {/* Basketball Overlay (Three.js) */}
              <motion.div
                id="basketball-container"
                className="absolute z-10 pointer-events-none"
                style={{ top: '50%', left: '78%' }}
                initial={{ scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }}
                animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                transition={{ 
                  delay: 0.4, 
                  duration: 1, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15 
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Glow/Shadow behind ball */}
                  <div className="absolute w-[300px] h-[300px] bg-accent/20 blur-[100px] rounded-full" />
                  <BasketballCanvas />
                </div>
              </motion.div>
            </motion.h1>

            <PriceTag />
          </div>

          {/* Bottom Controls */}
          <div className="w-full mt-12 md:mt-24 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
            <div className="hidden md:block w-32" />
            
            <div className="flex justify-center">
              <AddToCartButton />
            </div>

            <div className="w-full md:w-auto flex justify-end">
              <CarouselArrows />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

