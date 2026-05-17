"use client";

import { useEffect } from "react";
import { useConfiguratorStore } from "@/stores/configurator-store";
import { StepNavigator } from "./step-navigator";
import { PreviewPanel } from "./preview-panel";
import { OptionPanel } from "./option-panel";
import { PriceCalculator } from "./price-calculator";
import { CONFIGURATOR_STEPS } from "@/lib/constants";
import { X } from "lucide-react";
import Link from "next/link";

export function ConfiguratorCanvas() {
  const { currentStep, resetConfigurator } = useConfiguratorStore();

  // Reset configurator when leaving page
  useEffect(() => {
    return () => resetConfigurator();
  }, [resetConfigurator]);

  const stepInfo = CONFIGURATOR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col md:flex-row overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--background)]">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest">{stepInfo.label}</h2>
          <p className="text-xs text-[var(--foreground-secondary)]">{stepInfo.description}</p>
        </div>
        <Link href="/" className="p-2 -mr-2">
          <X className="w-5 h-5" />
        </Link>
      </div>

      {/* Main Preview Area (Left side on desktop, Top on mobile) */}
      <div className="flex-1 relative flex flex-col bg-neutral-100 dark:bg-neutral-900">
        
        {/* Desktop Header Overlay */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 p-8 justify-between items-start z-10">
          <Link href="/" className="text-xl tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
            Velcraft
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors">
            Exit Builder
            <X className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D/2D Preview Rendering Area */}
        <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 overflow-hidden">
           <PreviewPanel />
        </div>
        
        <StepNavigator />
      </div>

      {/* Configuration Panel (Right side on desktop, Bottom drawer on mobile) */}
      <div className="w-full md:w-[400px] lg:w-[480px] bg-[var(--background)] border-t md:border-t-0 md:border-l border-[var(--border)] flex flex-col h-[50vh] md:h-full z-20 shadow-2xl md:shadow-none">
        
        {/* Desktop Step Header */}
        <div className="hidden md:block p-8 border-b border-[var(--border)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-velcraft-gold)] mb-2">
            Step {currentStep + 1} of {CONFIGURATOR_STEPS.length}
          </p>
          <h2 className="text-2xl md:text-3xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            {stepInfo.label}
          </h2>
          <p className="text-sm text-[var(--foreground-secondary)]">
            {stepInfo.description}
          </p>
        </div>

        {/* Dynamic Options List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <OptionPanel />
        </div>

        {/* Pricing & Checkout Footer */}
        <div className="p-4 md:p-8 border-t border-[var(--border)] bg-[var(--background)] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-10">
          <PriceCalculator />
        </div>
      </div>
    </div>
  );
}
