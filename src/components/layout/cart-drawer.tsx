"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[var(--background)] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2
                  className="text-lg tracking-[0.1em] uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your Bag
                </h2>
                <span className="text-sm text-[var(--foreground-secondary)]">
                  ({count})
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-hover)]"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="w-12 h-12 text-[var(--foreground-secondary)] opacity-40" />
                  <p
                    className="text-lg text-[var(--foreground-secondary)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Your bag is empty
                  </p>
                  <p className="text-sm text-[var(--foreground-secondary)]">
                    Explore our collections and find something extraordinary.
                  </p>
                  <Link
                    href="/collections"
                    onClick={closeCart}
                    className="btn-primary mt-4"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-24 h-28 bg-[var(--surface)] rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {item.isCustom && (
                          <span className="absolute top-1 left-1 text-[9px] tracking-wider uppercase bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] px-1.5 py-0.5 font-semibold">
                            Custom
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="text-sm font-medium truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[var(--foreground-secondary)] mt-0.5">
                            Size: {item.size}
                            {item.color && ` · ${item.color}`}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-[var(--border)] rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-[var(--surface-hover)] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs w-4 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-[var(--surface-hover)] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-[var(--color-velcraft-gold)]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[var(--foreground-secondary)] hover:text-[var(--color-velcraft-error)] transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--border)] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--foreground-secondary)] uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span
                    className="text-lg font-medium"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs text-[var(--foreground-secondary)]">
                  Shipping calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="btn-secondary w-full text-center text-xs"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
