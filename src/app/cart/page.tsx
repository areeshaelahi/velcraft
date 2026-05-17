"use client";

import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (!mounted) return <div className="min-h-[60vh] container-luxury py-20" />;

  if (items.length === 0) {
    return (
      <div className="container-luxury py-32 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Your Bag is Empty</h1>
        <p className="text-[var(--foreground-secondary)] max-w-md mx-auto mb-10">
          Looks like you haven't added anything yet. Discover our latest collections or design your own masterpiece.
        </p>
        <div className="flex gap-4">
          <Link href="/collections" className="btn-primary">Shop Collections</Link>
          <Link href="/configurator" className="btn-secondary">Design Your Own</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-luxury py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl mb-12" style={{ fontFamily: "var(--font-heading)" }}>Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-[var(--border)] pb-4 mb-8 text-xs font-semibold uppercase tracking-widest text-[var(--foreground-secondary)]">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="space-y-8 md:space-y-12">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Product Info */}
                <div className="md:col-span-6 flex gap-6">
                  <Link href={`/products/${item.slug}`} className="relative w-24 h-32 md:w-32 md:h-40 bg-[var(--surface)] shrink-0 group">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                    {item.isCustom && (
                      <span className="absolute top-2 left-2 bg-[var(--color-velcraft-gold)] text-black text-[9px] uppercase tracking-wider px-2 py-1 font-semibold">Custom</span>
                    )}
                  </Link>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-[var(--foreground-secondary)] mb-1">Size: {item.size}</p>
                    {item.color && <p className="text-sm text-[var(--foreground-secondary)] mb-4">Color: {item.color}</p>}
                    
                    {item.isCustom && item.customization && (
                      <button className="text-xs text-[var(--color-velcraft-gold)] underline text-left hover:text-[var(--color-velcraft-gold-light)] transition-colors">
                        View Customization Details
                      </button>
                    )}
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="mt-auto flex items-center gap-2 text-xs text-[var(--foreground-secondary)] hover:text-[var(--color-velcraft-error)] transition-colors w-fit"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Mobile Price & Quantity Layout */}
                <div className="md:hidden flex items-center justify-between border-y border-[var(--border)] py-4">
                  <div className="flex items-center gap-4 border border-[var(--border)] rounded-sm p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-hover)]">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-hover)]">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Desktop Quantity */}
                <div className="hidden md:flex col-span-3 justify-center">
                  <div className="flex items-center gap-4 border border-[var(--border)] rounded-sm p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-hover)]">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-hover)]">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Desktop Total */}
                <div className="hidden md:block col-span-3 text-right">
                  <span className="font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[400px]">
          <div className="bg-[var(--surface)] p-8 border border-[var(--border)] sticky top-32">
            <h2 className="text-xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--foreground-secondary)]">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-secondary)]">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="h-[1px] bg-[var(--border)] mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="font-semibold uppercase tracking-widest text-sm">Estimated Total</span>
              <span className="text-2xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(subtotal)}</span>
            </div>

            <Link href="/checkout" className="btn-primary w-full py-4 justify-center mb-4">
              Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-[var(--foreground-secondary)]">
              <ShieldCheck className="w-4 h-4" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
