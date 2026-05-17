import { ProductCard } from "@/components/product/product-card";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

// Mock data
const ALL_PRODUCTS = [
  {
    id: "p1", name: "The Monarch Oxford", slug: "monarch-oxford", price: 24500,
    image: "/images/shoe-1.jpg", category: "Formal", rating: 5, reviews: 124, isCustomizable: true
  },
  {
    id: "p2", name: "Signature Double Monk", slug: "signature-double-monk", price: 26000,
    image: "/images/shoe-2.jpg", category: "Formal", rating: 4.8, reviews: 86, isCustomizable: true
  },
  {
    id: "p3", name: "Heritage Chelsea Boot", slug: "heritage-chelsea", price: 32000,
    image: "/images/shoe-3.jpg", category: "Boots", rating: 4.9, reviews: 210, isNew: true
  },
  {
    id: "p4", name: "Classic Penny Loafer", slug: "classic-penny-loafer", price: 22500,
    image: "/images/shoe-4.jpg", category: "Casual", rating: 4.7, reviews: 54
  },
  {
    id: "p5", name: "Velvet Evening Slipper", slug: "velvet-evening-slipper", price: 18000,
    image: "/images/shoe-5.jpg", category: "Evening", rating: 4.6, reviews: 32
  },
  {
    id: "p6", name: "The Executive Derby", slug: "executive-derby", price: 23500,
    image: "/images/shoe-6.jpg", category: "Formal", rating: 4.9, reviews: 115, isCustomizable: true
  },
];

export default function ProductsPage() {
  return (
    <div className="container-luxury py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--border)] pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            All Footwear
          </h1>
          <p className="text-[var(--foreground-secondary)]">
            Explore our complete collection of handcrafted luxury footwear.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] hover:border-[var(--color-velcraft-gold)] transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] hover:border-[var(--color-velcraft-gold)] transition-colors">
            Sort By
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-[var(--foreground-secondary)]">
              <li className="flex items-center justify-between hover:text-[var(--foreground)] cursor-pointer">
                <span>All Footwear</span>
                <span>(24)</span>
              </li>
              <li className="flex items-center justify-between text-[var(--color-velcraft-gold)] cursor-pointer">
                <span>Oxfords</span>
                <span>(6)</span>
              </li>
              <li className="flex items-center justify-between hover:text-[var(--foreground)] cursor-pointer">
                <span>Derbies</span>
                <span>(4)</span>
              </li>
              <li className="flex items-center justify-between hover:text-[var(--foreground)] cursor-pointer">
                <span>Loafers</span>
                <span>(8)</span>
              </li>
              <li className="flex items-center justify-between hover:text-[var(--foreground)] cursor-pointer">
                <span>Boots</span>
                <span>(6)</span>
              </li>
            </ul>
          </div>
          
          <div className="w-full h-[1px] bg-[var(--border)]" />
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Price</h3>
            <ul className="space-y-3 text-sm text-[var(--foreground-secondary)]">
              <li className="flex items-center gap-3 hover:text-[var(--foreground)] cursor-pointer">
                <input type="checkbox" className="accent-[var(--color-velcraft-gold)]" />
                <span>Under PKR 20,000</span>
              </li>
              <li className="flex items-center gap-3 hover:text-[var(--foreground)] cursor-pointer">
                <input type="checkbox" className="accent-[var(--color-velcraft-gold)]" />
                <span>PKR 20,000 - 30,000</span>
              </li>
              <li className="flex items-center gap-3 hover:text-[var(--foreground)] cursor-pointer">
                <input type="checkbox" className="accent-[var(--color-velcraft-gold)]" />
                <span>Over PKR 30,000</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {ALL_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button className="btn-secondary">Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
