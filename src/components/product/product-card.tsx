"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist-store";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    category: string;
    rating?: number;
    reviews?: number;
    isCustomizable?: boolean;
    isNew?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleItem, hasItem } = useWishlistStore();
  const isWishlisted = hasItem(product.id);

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <div className="relative aspect-[4/5] bg-[var(--surface)] mb-4 overflow-hidden rounded-sm">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="text-[10px] text-neutral-400 absolute bottom-2 right-2">Image</span>
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[var(--foreground)] text-[var(--background)] text-[9px] uppercase tracking-wider px-2 py-1 font-semibold">
              New
            </span>
          )}
          {product.isCustomizable && (
            <span className="bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] text-[9px] uppercase tracking-wider px-2 py-1 font-semibold">
              Customizable
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--background)]/80 backdrop-blur flex items-center justify-center text-[var(--foreground)] hover:text-[var(--color-velcraft-error)] hover:bg-[var(--background)] transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-[var(--color-velcraft-error)] text-[var(--color-velcraft-error)]" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)]">
            {product.category}
          </p>
          {(product.rating || product.reviews) && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[var(--color-velcraft-gold)] text-[var(--color-velcraft-gold)]" />
              <span className="text-xs text-[var(--foreground-secondary)]">{product.rating}</span>
            </div>
          )}
        </div>
        
        <Link href={`/products/${product.slug}`} className="block group-hover:text-[var(--color-velcraft-gold)] transition-colors">
          <h3 className="font-medium text-base mb-1 line-clamp-1">{product.name}</h3>
        </Link>
        
        <div className="mt-auto pt-2 flex items-center gap-3">
          <p className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <p className="text-sm text-[var(--foreground-secondary)] line-through" style={{ fontFamily: "var(--font-heading)" }}>
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
