"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { PaymentMethods } from "./payment-methods";
import { OrderSummary } from "./order-summary";
import { WhatsAppOrder } from "./whatsapp-order";
import { useCartStore } from "@/stores/cart-store";

const checkoutSchema = z.object({
  email: z.string().email("Valid email required"),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Full address required"),
  city: z.string().min(2, "City required"),
  postalCode: z.string().min(4, "Postal code required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useState(() => { setMounted(true); });

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call for Order Creation
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In real app, call API to create order
      const mockOrderId = `VC-${Math.floor(1000 + Math.random() * 9000)}`;
      
      clearCart();
      router.push(`/checkout/success?orderId=${mockOrderId}&payment=${paymentMethod}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || items.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("email")}
                />
                {errors.email && <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">{errors.email.message}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("firstName")}
                />
                {errors.firstName && <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">{errors.firstName.message}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("lastName")}
                />
                {errors.lastName && <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">{errors.lastName.message}</p>}
              </div>
              <div className="md:col-span-2">
                <input
                  type="tel"
                  placeholder="Phone Number (e.g. 03001234567)"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("phone")}
                />
                {errors.phone && <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-6">
            <h3 className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("address")}
                />
                {errors.address && <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">{errors.address.message}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("city")}
                />
                {errors.city && <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">{errors.city.message}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("postalCode")}
                />
                {errors.postalCode && <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">{errors.postalCode.message}</p>}
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  value="Pakistan"
                  disabled
                  className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--foreground-secondary)] border border-[var(--border)] rounded-sm text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Payment Methods Component */}
          <PaymentMethods selectedId={paymentMethod} onSelect={setPaymentMethod} />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-4 text-sm disabled:opacity-70"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-[var(--border)]">
          <WhatsAppOrder />
        </div>
      </div>

      <div className="lg:w-[450px]">
        <OrderSummary />
      </div>
    </div>
  );
}
