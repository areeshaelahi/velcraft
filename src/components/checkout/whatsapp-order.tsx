"use client";

import { useCartStore } from "@/stores/cart-store";
import { generateWhatsAppLink, formatPrice } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function WhatsAppOrder() {
  const items = useCartStore((s) => s.items);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    let message = `*New Order Inquiry - Velcraft*\n\n`;
    message += `I would like to place an order for the following items:\n\n`;

    let total = 0;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Size: ${item.size}\n`;
      if (item.color) message += `   Color: ${item.color}\n`;
      message += `   Qty: ${item.quantity} x ${formatPrice(item.price)}\n`;
      
      if (item.isCustom && item.customization) {
        message += `   Custom Details: ${JSON.stringify(item.customization)}\n`;
      }
      message += `\n`;
      total += item.price * item.quantity;
    });

    const shipping = total > 25000 ? 0 : 1000;
    const finalTotal = total + shipping;

    message += `Subtotal: ${formatPrice(total)}\n`;
    message += `Shipping: ${shipping === 0 ? "Free" : formatPrice(shipping)}\n`;
    message += `*Total: ${formatPrice(finalTotal)}*\n\n`;
    message += `Please guide me on the next steps.`;

    const url = generateWhatsAppLink(message);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[var(--surface-hover)] border border-[var(--border)] rounded-sm p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
      <div>
        <h3 className="font-semibold mb-2">Prefer to order via WhatsApp?</h3>
        <p className="text-sm text-[var(--foreground-secondary)]">
          Send your cart details directly to our concierge team and we'll handle the rest manually.
        </p>
      </div>
      <button 
        onClick={handleWhatsAppOrder}
        type="button" 
        className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 text-sm font-medium transition-colors rounded-sm w-full md:w-auto justify-center"
      >
        <MessageCircle className="w-5 h-5" />
        Order on WhatsApp
      </button>
    </div>
  );
}
