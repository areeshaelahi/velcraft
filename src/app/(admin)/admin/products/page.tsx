import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Plus, Edit2, Trash2 } from "lucide-react";

// Mock Data
const PRODUCTS = [
  { id: "P1", name: "The Monarch Oxford", category: "Formal", price: 24500, stock: 12, status: "Active", image: "/images/shoe-1.jpg" },
  { id: "P2", name: "Signature Double Monk", category: "Formal", price: 26000, stock: 8, status: "Active", image: "/images/shoe-2.jpg" },
  { id: "P3", name: "Heritage Chelsea Boot", category: "Boots", price: 32000, stock: 5, status: "Active", image: "/images/shoe-3.jpg" },
  { id: "P4", name: "Classic Penny Loafer", category: "Casual", price: 22500, stock: 0, status: "Out of Stock", image: "/images/shoe-4.jpg" },
];

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Products</h1>
          <p className="text-[var(--foreground-secondary)]">Manage catalog, pricing, and inventory.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-velcraft-gold)] text-black rounded-sm text-sm font-semibold hover:bg-[var(--color-velcraft-gold-light)]">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--surface-hover)] text-[var(--foreground-secondary)] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Inventory</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--surface-hover)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 bg-[var(--background)] border border-[var(--border)] rounded-sm overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--foreground-secondary)]">{product.category}</td>
                  <td className="px-6 py-4 font-medium" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock === 0 ? "text-[var(--color-velcraft-error)] font-medium" : ""}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                      product.status === "Active" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-[var(--color-velcraft-error)]/10 text-[var(--color-velcraft-error)] border-[var(--color-velcraft-error)]/20"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-[var(--foreground-secondary)] hover:text-[var(--color-velcraft-gold)] transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-[var(--foreground-secondary)] hover:text-[var(--color-velcraft-error)] transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
