"use client";

import { useConfiguratorStore } from "@/stores/configurator-store";
import { CONFIGURATOR_STEPS } from "@/lib/constants";
import { motion } from "framer-motion";

export function StepNavigator() {
  const { currentStep, setStep } = useConfiguratorStore();

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/20 to-transparent z-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 scrollbar-hide px-2">
          {CONFIGURATOR_STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <button
                key={step.id}
                onClick={() => setStep(index)}
                className={`relative flex flex-col items-center gap-2 min-w-[60px] transition-opacity ${
                  isActive || isCompleted ? "opacity-100" : "opacity-50"
                }`}
              >
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-[var(--color-velcraft-gold)] scale-150" 
                      : isCompleted
                        ? "bg-[var(--foreground)]"
                        : "bg-[var(--foreground-secondary)]"
                  }`}
                />
                
                {isActive && (
                  <motion.div
                    layoutId="activeStep"
                    className="absolute -inset-2 border border-[var(--color-velcraft-gold)] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className={`text-[9px] uppercase tracking-wider whitespace-nowrap mt-2 ${
                  isActive ? "text-[var(--foreground)] font-semibold" : "text-[var(--foreground-secondary)]"
                }`}>
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
