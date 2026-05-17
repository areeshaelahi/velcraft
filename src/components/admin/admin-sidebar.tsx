"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ReceiptText, Package, Users, Settings, LogOut } from "lucide-react";
import { BRAND } from "@/lib/constants";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Payment Proofs", href: "/admin/payments", icon: ReceiptText },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--surface)] border-r border-[var(--border)] min-h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-[0.2em] uppercase text-lg" style={{ fontFamily: "var(--font-heading)" }}>
          {BRAND.name}
        </Link>
        <span className="text-[9px] bg-[var(--color-velcraft-gold)] text-black px-2 py-0.5 uppercase tracking-wider font-bold rounded-sm">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                isActive 
                  ? "bg-[var(--color-velcraft-gold)]/10 text-[var(--color-velcraft-gold)] font-medium" 
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-sm text-sm text-[var(--color-velcraft-error)] hover:bg-[var(--color-velcraft-error)]/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
