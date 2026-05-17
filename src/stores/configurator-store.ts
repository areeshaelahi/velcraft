"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ConfiguratorSelection {
  design: string;
  color: string;
  material: string;
  soleColor: string;
  buckle: string;
  laceStyle: string;
  accessories: string[];
  engraving: string;
  size: string;
}

interface ConfiguratorState {
  currentStep: number;
  selections: ConfiguratorSelection;
  basePrice: number;
  totalPrice: number;
  previewImage: string;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateSelection: (
    key: keyof ConfiguratorSelection,
    value: string | string[]
  ) => void;
  setTotalPrice: (price: number) => void;
  resetConfigurator: () => void;
}

const defaultSelections: ConfiguratorSelection = {
  design: "",
  color: "",
  material: "",
  soleColor: "",
  buckle: "",
  laceStyle: "",
  accessories: [],
  engraving: "",
  size: "",
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set) => ({
      currentStep: 0,
      selections: { ...defaultSelections },
      basePrice: 12500,
      totalPrice: 12500,
      previewImage: "",

      setStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({ currentStep: Math.min(state.currentStep + 1, 8) })),
      prevStep: () =>
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

      updateSelection: (key, value) =>
        set((state) => ({
          selections: { ...state.selections, [key]: value },
        })),

      setTotalPrice: (price) => set({ totalPrice: price }),

      resetConfigurator: () =>
        set({
          currentStep: 0,
          selections: { ...defaultSelections },
          totalPrice: 12500,
        }),
    }),
    {
      name: "velcraft-configurator",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
