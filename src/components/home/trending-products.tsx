"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/animated-section";
import { formatPrice } from "@/lib/utils";

// Mock data for trending products
const TRENDING_PRODUCTS = [
  {
    id: "p1",
    name: "The Monarch Oxford",
    price: 24500,
    image: "/images/shoe-1.jpg",
    rating: 5,
    reviews: 124,
    category: "Formal",
  },
  {
    id: "p2",
    name: "Signature Double Monk",
    price: 26000,
    image: "/images/shoe-2.jpg",
    rating: 4.8,
    reviews: 86,
    category: "Formal",
  },
  {
    id: "p3",
    name: "Heritage Chelsea Boot",
    price: 32000,
    image: "/images/shoe-3.jpg",
    rating: 4.9,
    reviews: 210,
    category: "Boots",
  },
  {
    id: "p4",
    name: "Classic Penny Loafer",
    price: 22500,
    image: "/images/shoe-4.jpg",
    rating: 4.7,
    reviews: 54,
    category: "Casual",
  },
];

export function TrendingProducts() {
  return (
    <section className="py-[var(--spacing-section-mobile)] md:py-[var(--spacing-section)]">
      <div className="container-luxury">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl mb-4">Trending Now</h2>
            <p className="text-[var(--foreground-secondary)]">
              Our most coveted designs, ready to ship or customize to your exact preferences.
            </p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)] transition-colors">
            Shop All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRENDING_PRODUCTS.map((product) => (
            <StaggerItem key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-[var(--surface)] mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  {/* Fallback for missing images */}
                  <span className="text-[10px] text-neutral-400 absolute bottom-2 right-2">Product Image</span>
                </div>
                
                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-[var(--background)] text-[var(--foreground)] px-6 py-3 text-xs font-semibold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-black)]">
                    Quick View
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)]">{product.category}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[var(--color-velcraft-gold)] text-[var(--color-velcraft-gold)]" />
                    <span className="text-xs text-[var(--foreground-secondary)]">{product.rating} ({product.reviews})</span>
                  </div>
                </div>
                <h3 className="font-medium text-base truncate">{product.name}</h3>
                <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(product.price)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
