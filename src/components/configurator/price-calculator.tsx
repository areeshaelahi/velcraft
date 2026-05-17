"use client";

import { useConfiguratorStore } from "@/stores/configurator-store";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useRouter } from "next/navigation";
import { CONFIGURATOR_STEPS } from "@/lib/constants";
import { useEffect, useState } from "react";

export function PriceCalculator() {
  const { currentStep, nextStep, prevStep, selections, basePrice, totalPrice, setTotalPrice } = useConfiguratorStore();
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  
  // Calculate price dynamically (mock logic for demo)
  useEffect(() => {
    let extra = 0;
    if (selections.design === "monk") extra += 1500;
    if (selections.design === "loafer") extra -= 2000;
    if (selections.color === "navy") extra += 1500;
    if (selections.color === "green") extra += 2500;
    if (selections.material === "patent") extra += 1000;
    if (selections.material === "grain") extra += 1500;
    if (selections.material === "crocodile") extra += 3500;
    if (selections.soleColor === "rubber_studded") extra += 1500;
    if (selections.soleColor === "leather_double") extra += 2000;
    if (selections.soleColor === "crepe") extra += 1000;
    
    // accessories calculation
    if (selections.accessories.includes("toe_tap")) extra += 1500;
    if (selections.accessories.includes("heel_plate")) extra += 1500;
    if (selections.accessories.includes("trees")) extra += 3500;
    
    if (selections.engraving === "sole") extra += 2500;
    if (selections.engraving === "heel") extra += 3500;

    setTotalPrice(basePrice + extra);
  }, [selections, basePrice, setTotalPrice]);

  const isLastStep = currentStep === CONFIGURATOR_STEPS.length - 1;

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!selections.design;
      case 1: return !!selections.color;
      case 2: return !!selections.material;
      case 3: return !!selections.soleColor;
      case 7: return !!selections.size;
      default: return true;
    }
  };

  const handleAddToCart = () => {
    if (!selections.size || !selections.design) return;
    
    addItem({
      id: `custom-${Date.now()}`,
      productId: "custom-bespoke",
      name: "Custom Bespoke Shoe",
      slug: "custom",
      image: "/images/hero-shoe.png", // would be composite image in real app
      price: totalPrice,
      quantity: 1,
      size: selections.size,
      color: selections.color,
      isCustom: true,
      customization: selections as any,
    });
    
    router.push("/cart");
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)]">
          Total
        </span>
        <span className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
          {formatPrice(totalPrice)}
        </span>
      </div>

      <div className="flex gap-2">
        {currentStep > 0 && (
          <button 
            onClick={prevStep}
            className="btn-secondary px-6 py-3"
          >
            Back
          </button>
        )}
        
        {isLastStep ? (
          <button 
            onClick={handleAddToCart}
            disabled={!canProceed()}
            className="btn-primary px-8 py-3 disabled:opacity-50"
          >
            Add to Bag
          </button>
        ) : (
          <button 
            onClick={nextStep}
            disabled={!canProceed()}
            className="btn-primary px-8 py-3 disabled:opacity-50"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}
