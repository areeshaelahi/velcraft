"use client";

import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 25000 ? 0 : 1000;
  const total = subtotal + shipping;

  return (
    <div className="bg-[var(--surface)] p-6 md:p-8 border border-[var(--border)] sticky top-32">
      <h2 className="text-xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Order Summary</h2>
      
      <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-20 bg-[var(--background)] shrink-0 border border-[var(--border)]">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[10px] flex items-center justify-center font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
              <p className="text-xs text-[var(--foreground-secondary)] mt-1">{item.size} {item.color && `/ ${item.color}`}</p>
              <p className="text-sm font-semibold mt-auto" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6 text-sm border-t border-[var(--border)] pt-6">
        <div className="flex justify-between">
          <span className="text-[var(--foreground-secondary)]">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--foreground-secondary)]">Shipping</span>
          <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-[var(--border)] pt-6">
        <span className="font-semibold uppercase tracking-widest text-sm">Total</span>
        <span className="text-2xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
