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
      case "derby": return "/images/shoe-1.jpg"; // Using shoe-1 as base for all to maintain consistent color mapping
      case "monk": return "/images/shoe-3.jpg";
      case "loafer": return "/images/shoe-2.jpg";
      default: return "/images/shoe-1.jpg";
    }
  };

  // Precise color tinting using hue-rotate, assuming base shoe is brown
  const getFilterStyles = () => {
    let filter = "";
    
    switch (selections.color) {
      case "black": filter = "grayscale(100%) contrast(1.2) brightness(0.6)"; break;
      case "brown": filter = "hue-rotate(0deg) saturate(1.1)"; break;
      case "burgundy": filter = "hue-rotate(320deg) saturate(1.8) brightness(0.8)"; break;
      case "tan": filter = "hue-rotate(15deg) saturate(1.4) brightness(1.2)"; break;
      case "navy": filter = "hue-rotate(200deg) saturate(1.5) brightness(0.7)"; break;
      case "green": filter = "hue-rotate(100deg) saturate(1.2) brightness(0.7)"; break;
    }
    
    // Material adjustments
    if (selections.material === "patent") filter += " contrast(1.4) brightness(1.1) saturate(1.2)";
    if (selections.material === "suede") filter += " contrast(0.9) brightness(1.1) sepia(0.2)";
    
    return { filter, transition: "filter 0.5s ease-in-out" };
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
            className="object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl"
            priority
          />
          
          {/* Material Texture Overlay Simulator */}
          {selections.material === "suede" && (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />
          )}
          {selections.material === "grain" && (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-40 mix-blend-overlay" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative environment */}
      <div className="absolute bottom-20 w-3/4 h-8 bg-black/10 dark:bg-black/40 blur-xl rounded-[100%]" />
    </div>
  );
}
