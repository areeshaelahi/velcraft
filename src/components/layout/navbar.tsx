"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Heart, Menu, X, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { BRAND, NAVIGATION } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  const cartItems = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const wishlistItems = useWishlistStore((s) => s.items);

  useEffect(() => { setMounted(true); }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const itemCount = mounted ? cartItems.reduce((s, i) => s + i.quantity, 0) : 0;
  const wishCount = mounted ? wishlistItems.length : 0;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong shadow-lg shadow-black/5"
            : "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]/50"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top bar */}
        <div className="hidden md:block border-b border-[var(--border-subtle)]">
          <div className="container-luxury flex items-center justify-between py-2">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--foreground-secondary)]">
              Free shipping on orders over PKR 25,000
            </p>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--foreground-secondary)]">
              Handcrafted in Pakistan 🇵🇰
            </p>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-luxury flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-xl md:text-2xl tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
              whileHover={{ letterSpacing: "0.25em" }}
              transition={{ duration: 0.3 }}
            >
              {BRAND.name}
            </motion.span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[13px] tracking-[0.08em] uppercase text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-velcraft-gold)] group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <ThemeToggle />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--surface-hover)] transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </motion.button>

            <Link href="/account/wishlist">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--surface-hover)] transition-colors"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] text-[10px] font-semibold flex items-center justify-center">
                    {wishCount}
                  </span>
                )}
              </motion.div>
            </Link>

            <Link href="/account">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:flex relative w-9 h-9 items-center justify-center rounded-full hover:bg-[var(--surface-hover)] transition-colors"
              >
                <User className="w-[18px] h-[18px]" />
              </motion.div>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openCart}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--surface-hover)] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] text-[10px] font-semibold flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-[var(--background)] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span
                  className="text-xl tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {BRAND.name}
                </span>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {NAVIGATION.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl tracking-[0.05em] hover:text-[var(--color-velcraft-gold)] transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-[var(--border)]">
                <p className="text-sm text-[var(--foreground-secondary)]">
                  {BRAND.tagline}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
