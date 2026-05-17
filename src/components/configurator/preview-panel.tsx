"use client";

import { useConfiguratorStore } from "@/stores/configurator-store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PreviewPanel() {
  const { selections, currentStep } = useConfiguratorStore();

  // In a real production app with massive assets, we would construct
  // a composite image using layers based on the selected options.
  // E.g., base shoe + color mask + material normal map + sole type overlay
  // Or render a Three.js canvas. For this implementation plan, we simulate
  // the visual change using CSS filters and a base image.

  const getShoeImage = () => {
    switch (selections.design) {
      case "oxford": return "/images/shoe-1.jpg";
      case "derby": return "/images/shoe-6.jpg";
      case "monk": return "/images/shoe-2.jpg";
      case "loafer": return "/images/shoe-4.jpg";
      default: return "/images/hero-shoe.png";
    }
  };

  // Very basic color tint simulation for demo purposes
  const getFilterStyles = () => {
    let filter = "";
    
    // Simulate color changes with CSS filters
    if (selections.color === "black") filter = "grayscale(100%) contrast(1.2)";
    if (selections.color === "navy") filter = "hue-rotate(180deg) saturate(1.5) brightness(0.8)";
    if (selections.color === "burgundy") filter = "hue-rotate(320deg) saturate(2) brightness(0.9)";
    if (selections.color === "green") filter = "hue-rotate(100deg) saturate(1.2) brightness(0.7)";
    
    // Material
    if (selections.material === "patent") filter += " contrast(1.5) brightness(1.2)";
    
    return { filter };
  };

  // Determine which part to "focus" or zoom on based on step
  const getTransformStyles = () => {
    if (currentStep === 3) return { scale: 1.4, y: -100, x: 0 }; // Sole Focus
    if (currentStep === 6) return { scale: 1.5, y: -50, x: 50 }; // Engraving Focus (Heel/waist)
    return { scale: 1, y: 0, x: 0 }; // Default
  };

  return (
    <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center pointer-events-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={selections.design || "base"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            ...getTransformStyles()
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-square"
          style={getFilterStyles()}
        >
          <Image
            src={getShoeImage()}
            alt="Shoe Preview"
            fill
            className="object-contain drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative environment */}
      <div className="absolute bottom-20 w-3/4 h-8 bg-black/10 dark:bg-black/40 blur-xl rounded-[100%]" />
    </div>
  );
}
