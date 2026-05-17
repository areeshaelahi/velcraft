import { DollarSign, ShoppingBag, CheckCircle, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock Data
const STATS = [
  { label: "Total Revenue", value: 1245000, icon: DollarSign, trend: "+12%" },
  { label: "Orders This Month", value: 48, icon: ShoppingBag, trend: "+5%" },
  { label: "Pending Verifications", value: 12, icon: Clock, trend: "-2", isAlert: true },
  { label: "Completed Orders", value: 315, icon: CheckCircle, trend: "+18%" },
];

const RECENT_ORDERS = [
  { id: "VC-8492", customer: "Ahmed Khan", date: "Today, 14:30", total: 26000, status: "PENDING_PAYMENT" },
  { id: "VC-8491", customer: "Zain Ali", date: "Today, 10:15", total: 42000, status: "IN_PRODUCTION" },
  { id: "VC-8490", customer: "Omar Farooq", date: "Yesterday", total: 24500, status: "PAYMENT_UNDER_REVIEW" },
  { id: "VC-8489", customer: "Ali Hassan", date: "Yesterday", total: 32000, status: "SHIPPED" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Dashboard</h1>
        <p className="text-[var(--foreground-secondary)]">Welcome back. Here is the overview of Velcraft operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-[var(--surface)] p-6 rounded-sm border border-[var(--border)] shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.isAlert ? "bg-[var(--color-velcraft-error)]/10 text-[var(--color-velcraft-error)]" : "bg-[var(--surface-hover)] text-[var(--color-velcraft-gold)]"}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-[var(--foreground-secondary)]'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-sm text-[var(--foreground-secondary)] mb-1">{stat.label}</h3>
            <p className="text-2xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              {stat.label.includes("Revenue") ? formatPrice(stat.value) : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-semibold">Recent Orders</h2>
          <button className="text-xs font-medium uppercase tracking-widest text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)]">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--surface-hover)] text-[var(--foreground-secondary)] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--surface-hover)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--color-velcraft-gold)]">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-[var(--foreground-secondary)]">{order.date}</td>
                  <td className="px-6 py-4 font-medium" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[var(--surface-hover)] border border-[var(--border)] rounded-full">
                      {order.status.replace(/_/g, " ")}
                    </span>
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
