"use client";

import { PAYMENT_METHODS } from "@/lib/constants";
import { Banknote, Smartphone, Building2 } from "lucide-react";

interface PaymentMethodsProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PaymentMethods({ selectedId, onSelect }: PaymentMethodsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "building-2": return <Building2 className="w-5 h-5" />;
      case "smartphone": return <Smartphone className="w-5 h-5" />;
      case "banknote": return <Banknote className="w-5 h-5" />;
      default: return <Banknote className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg mb-4" style={{ fontFamily: "var(--font-heading)" }}>Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedId === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`flex flex-col text-left p-4 border rounded-sm transition-all ${
                isSelected 
                  ? "border-[var(--color-velcraft-gold)] bg-[var(--color-velcraft-gold)]/5 ring-1 ring-[var(--color-velcraft-gold)]" 
                  : "border-[var(--border)] hover:border-[var(--foreground)]"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full ${isSelected ? "bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)]" : "bg-[var(--surface-hover)] text-[var(--foreground)]"}`}>
                  {getIcon(method.icon)}
                </div>
                <span className="font-medium text-sm">{method.name}</span>
              </div>
              <p className="text-xs text-[var(--foreground-secondary)]">{method.description}</p>
            </button>
          );
        })}
      </div>

      {/* Payment Details Reveal based on selection */}
      {selectedId !== "cod" && (
        <div className="mt-6 p-6 bg-[var(--surface-hover)] border border-[var(--border)] rounded-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-velcraft-gold)] mb-4">
            Payment Instructions
          </p>
          
          {selectedId === "bank_transfer" && (
            <div className="space-y-2 text-sm text-[var(--foreground)]">
              <p>Please transfer the total amount to the following bank account:</p>
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <span className="text-[var(--foreground-secondary)]">Bank:</span>
                <span className="col-span-2 font-medium">HBL - Habib Bank Limited</span>
                
                <span className="text-[var(--foreground-secondary)]">Account Title:</span>
                <span className="col-span-2 font-medium">Velcraft Pvt Ltd</span>
                
                <span className="text-[var(--foreground-secondary)]">Account Number:</span>
                <span className="col-span-2 font-medium tracking-wider">1234-5678-9012-3456</span>
                
                <span className="text-[var(--foreground-secondary)]">IBAN:</span>
                <span className="col-span-2 font-medium tracking-wider">PK00HABB1234567890123456</span>
              </div>
            </div>
          )}

          {(selectedId === "easypaisa" || selectedId === "jazzcash") && (
            <div className="space-y-2 text-sm text-[var(--foreground)]">
              <p>Please send the total amount to our {selectedId === "easypaisa" ? "EasyPaisa" : "JazzCash"} account:</p>
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <span className="text-[var(--foreground-secondary)]">Account Name:</span>
                <span className="col-span-2 font-medium">Velcraft</span>
                
                <span className="text-[var(--foreground-secondary)]">Mobile Number:</span>
                <span className="col-span-2 font-medium tracking-wider">0300-1234567</span>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 border border-[var(--color-velcraft-gold)]/30 bg-[var(--color-velcraft-gold)]/5 rounded-sm">
            <p className="text-xs text-[var(--foreground-secondary)]">
              <strong className="text-[var(--foreground)]">Important:</strong> After placing your order, you will need to upload a screenshot of your payment receipt on the confirmation page to process your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
