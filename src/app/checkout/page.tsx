import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata = {
  title: "Checkout | Velcraft",
};

export default function CheckoutPage() {
  return (
    <div className="container-luxury py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl mb-12" style={{ fontFamily: "var(--font-heading)" }}>Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
