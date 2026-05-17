import Link from "next/link";
import { Package, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock data
const ORDERS = [
  {
    id: "VC-8492",
    date: "May 15, 2026",
    status: "IN_PRODUCTION",
    total: 26000,
    items: [
      { name: "The Monarch Oxford", qty: 1, size: "UK 9", custom: false }
    ],
    paymentStatus: "VERIFIED"
  },
  {
    id: "VC-7104",
    date: "April 02, 2026",
    status: "DELIVERED",
    total: 34500,
    items: [
      { name: "Custom Bespoke Shoe", qty: 1, size: "UK 9", custom: true }
    ],
    paymentStatus: "VERIFIED"
  }
];

export default function OrdersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "IN_PRODUCTION": return "text-[var(--color-velcraft-gold)] bg-[var(--color-velcraft-gold)]/10 border-[var(--color-velcraft-gold)]/20";
      case "PENDING_PAYMENT": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      default: return "text-[var(--foreground-secondary)] bg-[var(--surface-hover)] border-[var(--border)]";
    }
  };

  const getStatusText = (status: string) => {
    return status.replace(/_/g, " ");
  };

  return (
    <div className="container-luxury py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "var(--font-heading)" }}>Order History</h1>
        
        <div className="space-y-6">
          {ORDERS.map((order) => (
            <div key={order.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-[var(--border)] bg-[var(--surface-hover)]">
                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-4 md:mb-0">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)] mb-1">Order Placed</p>
                    <p className="text-sm font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)] mb-1">Total</p>
                    <p className="text-sm font-medium" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)] mb-1">Order #</p>
                    <p className="text-sm font-medium">{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/account/orders/${order.id}`} className="btn-secondary py-2 px-4 text-xs">
                    View Details
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 border rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  {order.status === "IN_PRODUCTION" && (
                    <span className="text-xs text-[var(--foreground-secondary)] flex items-center gap-2">
                      <Package className="w-4 h-4" /> Estimated dispatch in 2 weeks
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                         <span className="text-xs text-[var(--foreground-secondary)]">Image</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {item.name} {item.custom && <span className="text-[10px] text-[var(--color-velcraft-gold)] uppercase tracking-wider ml-2">(Custom)</span>}
                        </h4>
                        <p className="text-xs text-[var(--foreground-secondary)] mt-1">
                          Qty: {item.qty} | Size: {item.size}
                        </p>
                      </div>
                      <button className="text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)] text-sm flex items-center gap-1 transition-colors">
                        Review <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
