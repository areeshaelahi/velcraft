"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Truck, Shield, Ruler } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

const PRODUCT = {
  id: "p1",
  name: "The Monarch Oxford",
  slug: "monarch-oxford",
  price: 24500,
  description: "The Monarch Oxford represents the zenith of our craftsmanship. Constructed from premium Italian full-grain calfskin and finished with our signature hand-painted patina. It features a closed lacing system for a sleek, formal silhouette that is equally at home in the boardroom or at a black-tie event.",
  details: [
    "Premium Italian full-grain calf leather upper",
    "Hand-painted antique patina finish",
    "Goodyear welted construction for longevity",
    "Leather sole with rubber forepart for grip",
    "Full leather lining",
    "Handcrafted in Lahore, Pakistan"
  ],
  images: [
    "/images/shoe-1.jpg",
    "/images/shoe-1-side.jpg",
    "/images/shoe-1-top.jpg",
    "/images/shoe-1-detail.jpg"
  ],
  colors: [
    { name: "Antique Brown", hex: "#5C3A21" },
    { name: "Onyx Black", hex: "#1A1A1A" },
    { name: "Burgundy", hex: "#4A0E17" }
  ],
  sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
  category: "Formal",
  rating: 4.9,
  reviews: 124,
  isCustomizable: true
};

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(PRODUCT.images[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const isWishlisted = hasItem(PRODUCT.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addItem({
      id: `${PRODUCT.id}-${selectedColor.name}-${selectedSize}`,
      productId: PRODUCT.id,
      name: PRODUCT.name,
      slug: PRODUCT.slug,
      image: selectedImage,
      price: PRODUCT.price,
      quantity: 1,
      size: selectedSize,
      color: selectedColor.name,
    });
  };

  return (
    <div className="container-luxury py-12 md:py-20">
      {/* Breadcrumbs */}
      <nav className="flex text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)] mb-8">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-[var(--foreground)]">Footwear</Link>
        <span className="mx-2">/</span>
        <Link href="/collections/formal" className="hover:text-[var(--foreground)]">{PRODUCT.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">{PRODUCT.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Image Gallery */}
        <div className="lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible md:w-24 flex-shrink-0">
            {PRODUCT.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-24 md:w-full md:h-32 bg-[var(--surface)] flex-shrink-0 ${
                  selectedImage === img ? "ring-1 ring-[var(--color-velcraft-gold)]" : "opacity-70 hover:opacity-100"
                } transition-all`}
              >
                <Image src={img} alt={`${PRODUCT.name} view ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] lg:h-[800px] flex-1 bg-[var(--surface)]">
            <Image src={selectedImage} alt={PRODUCT.name} fill className="object-cover" priority />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-2/5 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              {PRODUCT.name}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                {formatPrice(PRODUCT.price)}
              </p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[var(--color-velcraft-gold)] text-[var(--color-velcraft-gold)]" />
                <span className="text-sm">{PRODUCT.rating}</span>
                <span className="text-sm text-[var(--foreground-secondary)] underline ml-1">({PRODUCT.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-[var(--foreground-secondary)] leading-relaxed">
              {PRODUCT.description}
            </p>
          </div>

          <div className="h-[1px] w-full bg-[var(--border)] mb-8" />

          {/* Color Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest">Color</span>
              <span className="text-sm text-[var(--foreground-secondary)]">{selectedColor.name}</span>
            </div>
            <div className="flex gap-3">
              {PRODUCT.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    selectedColor.name === color.name ? "border-[var(--color-velcraft-gold)]" : "border-transparent"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest">Size (UK)</span>
              <button className="flex items-center gap-1 text-xs text-[var(--foreground-secondary)] hover:text-[var(--color-velcraft-gold)] transition-colors">
                <Ruler className="w-3 h-3" />
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PRODUCT.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border text-sm transition-colors ${
                    selectedSize === size
                      ? "border-[var(--color-velcraft-gold)] bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] font-medium"
                      : "border-[var(--border)] hover:border-[var(--foreground)]"
                  }`}
                >
                  {size.replace("UK ", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className="btn-primary w-full py-4 text-sm"
            >
              Add to Bag
            </button>
            
            <div className="flex gap-4">
              <button 
                onClick={(e) => { e.preventDefault(); toggleItem(PRODUCT.id); }}
                className="btn-secondary flex-1 py-4 text-xs"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[var(--foreground)]" : ""}`} />
                {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
              </button>
              {PRODUCT.isCustomizable && (
                <Link href={`/configurator?base=${PRODUCT.id}`} className="btn-secondary flex-1 py-4 text-xs border-[var(--color-velcraft-gold)] text-[var(--color-velcraft-gold)]">
                  Customize This
                </Link>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-[var(--foreground-secondary)]" />
              <span>Free shipping across Pakistan</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-[var(--foreground-secondary)]" />
              <span>1-year craftsmanship warranty</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-[var(--border)] my-8" />

          {/* Details Accordion (Simplified) */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Product Details</h3>
              <ul className="space-y-2 text-sm text-[var(--foreground-secondary)] list-disc pl-4">
                {PRODUCT.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
