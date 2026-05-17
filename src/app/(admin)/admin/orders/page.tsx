import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Filter, Search } from "lucide-react";

// Mock Data
const ALL_ORDERS = [
  { id: "VC-8492", customer: "Ahmed Khan", date: "May 15, 2026", total: 26000, status: "PENDING_PAYMENT", items: 1 },
  { id: "VC-8491", customer: "Zain Ali", date: "May 15, 2026", total: 42000, status: "IN_PRODUCTION", items: 2 },
  { id: "VC-8490", customer: "Omar Farooq", date: "May 14, 2026", total: 24500, status: "PAYMENT_UNDER_REVIEW", items: 1 },
  { id: "VC-8489", customer: "Ali Hassan", date: "May 14, 2026", total: 32000, status: "SHIPPED", items: 1 },
  { id: "VC-8488", customer: "Bilal Qureshi", date: "May 12, 2026", total: 18500, status: "DELIVERED", items: 1 },
  { id: "VC-8487", customer: "Hamza Tariq", date: "May 10, 2026", total: 54000, status: "CANCELLED", items: 2 },
];

export default function AdminOrdersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "IN_PRODUCTION": return "bg-[var(--color-velcraft-gold)]/10 text-[var(--color-velcraft-gold)] border-[var(--color-velcraft-gold)]/20";
      case "PAYMENT_UNDER_REVIEW": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "PENDING_PAYMENT": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "CANCELLED": return "bg-[var(--color-velcraft-error)]/10 text-[var(--color-velcraft-error)] border-[var(--color-velcraft-error)]/20";
      default: return "bg-[var(--surface-hover)] text-[var(--foreground)] border-[var(--border)]";
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Orders</h1>
          <p className="text-[var(--foreground-secondary)]">Manage and track customer orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)]" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-sm text-sm font-medium hover:bg-[var(--surface-hover)]">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--surface-hover)] text-[var(--foreground-secondary)] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Items</th>
                <th className="px-6 py-4 font-medium text-right">Total</th>
                <th className="px-6 py-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {ALL_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--surface-hover)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--color-velcraft-gold)]">{order.id}</td>
                  <td className="px-6 py-4 text-[var(--foreground-secondary)]">{order.date}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-[var(--foreground-secondary)]">{order.items}</td>
                  <td className="px-6 py-4 font-medium text-right" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(order.total)}</td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/admin/orders/${order.id}`} className="text-xs font-medium uppercase tracking-widest text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)]">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-[var(--border)] flex items-center justify-between text-sm text-[var(--foreground-secondary)]">
          <span>Showing 1 to 6 of 142 orders</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[var(--border)] rounded-sm hover:bg-[var(--surface-hover)] disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-[var(--border)] rounded-sm hover:bg-[var(--surface-hover)]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
