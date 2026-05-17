"use client";

import { useConfiguratorStore } from "@/stores/configurator-store";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for options based on step
const OPTIONS_DATA: Record<string, any[]> = {
  design: [
    { id: "oxford", name: "The Classic Oxford", price: 0, image: "/images/shoe-1.jpg" },
    { id: "derby", name: "The Derby", price: 0, image: "/images/shoe-6.jpg" },
    { id: "monk", name: "Double Monk Strap", price: 1500, image: "/images/shoe-2.jpg" },
    { id: "loafer", name: "Penny Loafer", price: -2000, image: "/images/shoe-4.jpg" },
  ],
  color: [
    { id: "black", name: "Onyx Black", hex: "#1A1A1A", price: 0 },
    { id: "brown", name: "Antique Brown", hex: "#5C3A21", price: 0 },
    { id: "burgundy", name: "Oxblood Burgundy", hex: "#4A0E17", price: 0 },
    { id: "tan", name: "English Tan", hex: "#A66E38", price: 0 },
    { id: "navy", name: "Midnight Navy", hex: "#1B263B", price: 1500 },
    { id: "green", name: "Hunter Green", hex: "#2C3E2D", price: 2500 },
  ],
  material: [
    { id: "calf", name: "Italian Calfskin", desc: "Smooth, durable, classic.", price: 0 },
    { id: "suede", name: "Repello Suede", desc: "Soft, luxurious, water-resistant.", price: 0 },
    { id: "patent", name: "Patent Leather", desc: "High gloss for formal events.", price: 1000 },
    { id: "grain", name: "Pebble Grain", desc: "Textured and highly resilient.", price: 1500 },
    { id: "crocodile", name: "Faux Crocodile", desc: "Exotic texture impression.", price: 3500 },
  ],
  sole: [
    { id: "leather", name: "Single Leather Sole", desc: "Traditional and sleek.", price: 0 },
    { id: "rubber_studded", name: "Studded Rubber", desc: "Dainite style for grip.", price: 1500 },
    { id: "leather_double", name: "Double Leather", desc: "Thicker for durability.", price: 2000 },
    { id: "crepe", name: "Crepe Sole", desc: "Casual comfort.", price: 1000 },
  ],
  buckle: [ // applicable if monk strap is chosen, but shown generally for simplicity
    { id: "none", name: "No Hardware / Standard Laces", price: 0 },
    { id: "silver", name: "Sterling Silver Finish", price: 0 },
    { id: "gold", name: "Brass Gold Finish", price: 500 },
    { id: "gunmetal", name: "Gunmetal Finish", price: 500 },
  ],
  accessories: [
    { id: "toe_tap", name: "Metal Toe Taps", desc: "Prevents tip wear.", price: 1500 },
    { id: "heel_plate", name: "Metal Heel Plates", desc: "Prevents heel wear.", price: 1500 },
    { id: "trees", name: "Cedar Shoe Trees", desc: "Maintains shape.", price: 3500 },
  ],
  engraving: [
    { id: "none", name: "No Engraving", desc: "Keep it clean.", price: 0 },
    { id: "sole", name: "Initials on Sole", desc: "Up to 3 letters on the waist.", price: 2500 },
    { id: "heel", name: "Initials on Heel", desc: "Up to 3 letters on outer heel.", price: 3500 },
  ],
  size: [
    { id: "uk6", name: "UK 6" },
    { id: "uk7", name: "UK 7" },
    { id: "uk8", name: "UK 8" },
    { id: "uk9", name: "UK 9" },
    { id: "uk10", name: "UK 10" },
    { id: "uk11", name: "UK 11" },
    { id: "uk12", name: "UK 12" },
  ]
};

export function OptionPanel() {
  const { currentStep, selections, updateSelection } = useConfiguratorStore();

  const renderOptions = () => {
    switch (currentStep) {
      case 0: // Design
        return (
          <div className="grid grid-cols-2 gap-4">
            {OPTIONS_DATA.design.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSelection("design", opt.id)}
                className={`relative flex flex-col aspect-square bg-[var(--surface)] border rounded-sm overflow-hidden transition-all ${
                  selections.design === opt.id 
                    ? "border-[var(--color-velcraft-gold)] ring-1 ring-[var(--color-velcraft-gold)]" 
                    : "border-[var(--border)] hover:border-[var(--foreground)]"
                }`}
              >
                <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 w-full relative">
                  <img src={opt.image} alt={opt.name} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply dark:mix-blend-screen" />
                </div>
                <div className="p-3 text-left w-full border-t border-[var(--border)]">
                  <p className="text-xs font-medium">{opt.name}</p>
                  {opt.price !== 0 && (
                    <p className="text-[10px] text-[var(--foreground-secondary)] mt-0.5">
                      {opt.price > 0 ? "+" : ""}{formatPrice(opt.price)}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 1: // Color
        return (
          <div className="grid grid-cols-3 gap-4">
            {OPTIONS_DATA.color.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSelection("color", opt.id)}
                className={`flex flex-col items-center gap-3 p-4 border rounded-sm transition-all ${
                  selections.color === opt.id 
                    ? "border-[var(--color-velcraft-gold)] bg-[var(--color-velcraft-gold)]/5" 
                    : "border-[var(--border)] hover:border-[var(--foreground)]"
                }`}
              >
                <div className="w-12 h-12 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: opt.hex }} />
                <div className="text-center">
                  <p className="text-xs font-medium">{opt.name}</p>
                  {opt.price > 0 && (
                    <p className="text-[10px] text-[var(--foreground-secondary)] mt-1">+{formatPrice(opt.price)}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 2: // Material
      case 3: // Sole
      case 4: // Buckle
      case 6: // Engraving
        const stepKey = ["design", "color", "material", "soleColor", "buckle", "accessories", "engraving", "size"][currentStep] as keyof typeof selections;
        const dataKey = ["design", "color", "material", "sole", "buckle", "accessories", "engraving", "size"][currentStep];
        
        return (
          <div className="space-y-3">
            {OPTIONS_DATA[dataKey].map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSelection(stepKey, opt.id)}
                className={`w-full flex items-center justify-between p-4 border rounded-sm transition-all ${
                  selections[stepKey] === opt.id 
                    ? "border-[var(--color-velcraft-gold)] bg-[var(--color-velcraft-gold)]/5" 
                    : "border-[var(--border)] hover:border-[var(--foreground)]"
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-medium">{opt.name}</p>
                  {opt.desc && <p className="text-xs text-[var(--foreground-secondary)] mt-1">{opt.desc}</p>}
                </div>
                {opt.price !== 0 && (
                  <span className="text-xs font-medium">
                    {opt.price > 0 ? "+" : ""}{formatPrice(opt.price)}
                  </span>
                )}
              </button>
            ))}
          </div>
        );

      case 5: // Accessories (Multi-select)
        return (
          <div className="space-y-3">
            {OPTIONS_DATA.accessories.map((opt) => {
              const isSelected = selections.accessories.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    const newAcc = isSelected 
                      ? selections.accessories.filter(id => id !== opt.id)
                      : [...selections.accessories, opt.id];
                    updateSelection("accessories", newAcc);
                  }}
                  className={`w-full flex items-center justify-between p-4 border rounded-sm transition-all ${
                    isSelected 
                      ? "border-[var(--color-velcraft-gold)] bg-[var(--color-velcraft-gold)]/5" 
                      : "border-[var(--border)] hover:border-[var(--foreground)]"
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? "bg-[var(--color-velcraft-gold)] border-[var(--color-velcraft-gold)]" : "border-[var(--border)]"}`}>
                      {isSelected && <svg className="w-3 h-3 text-[var(--color-velcraft-black)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{opt.name}</p>
                      <p className="text-xs text-[var(--foreground-secondary)] mt-1">{opt.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium">+{formatPrice(opt.price)}</span>
                </button>
              );
            })}
          </div>
        );

      case 7: // Size
        return (
          <div className="grid grid-cols-2 gap-3">
            {OPTIONS_DATA.size.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSelection("size", opt.id)}
                className={`py-4 border rounded-sm transition-all ${
                  selections.size === opt.id 
                    ? "border-[var(--color-velcraft-gold)] bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] font-medium" 
                    : "border-[var(--border)] hover:border-[var(--foreground)]"
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        );

      case 8: // Review
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface)] p-6 rounded-sm border border-[var(--border)]">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-secondary)] mb-4">Your Custom Specification</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <dt className="text-[var(--foreground-secondary)]">Design</dt>
                  <dd className="font-medium text-right capitalize">{selections.design || "Not selected"}</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <dt className="text-[var(--foreground-secondary)]">Color</dt>
                  <dd className="font-medium text-right capitalize">{selections.color || "Not selected"}</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <dt className="text-[var(--foreground-secondary)]">Material</dt>
                  <dd className="font-medium text-right capitalize">{selections.material || "Not selected"}</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <dt className="text-[var(--foreground-secondary)]">Sole</dt>
                  <dd className="font-medium text-right capitalize">{selections.soleColor || "Not selected"}</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <dt className="text-[var(--foreground-secondary)]">Size</dt>
                  <dd className="font-medium text-right uppercase">{selections.size || "Not selected"}</dd>
                </div>
              </dl>
            </div>
            
            <div className="bg-[var(--color-velcraft-gold)]/10 border border-[var(--color-velcraft-gold)]/20 p-4 rounded-sm text-center">
              <p className="text-xs text-[var(--color-velcraft-gold)]">
                Handcrafted bespoke items require 3-4 weeks for production.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderOptions()}
      </motion.div>
    </AnimatePresence>
  );
}
