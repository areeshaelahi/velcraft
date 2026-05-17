import { formatPrice } from "@/lib/utils";
import { CheckCircle, XCircle, FileImage, Eye } from "lucide-react";
import Image from "next/image";

// Mock Data
const PENDING_PAYMENTS = [
  { id: "PAY-991", orderId: "VC-8490", customer: "Omar Farooq", method: "Bank Transfer", amount: 24500, date: "May 14, 2026", status: "PENDING", proofImage: "/images/hero-shoe.png" },
  { id: "PAY-988", orderId: "VC-8485", customer: "Saad Tariq", method: "EasyPaisa", amount: 12000, date: "May 13, 2026", status: "PENDING", proofImage: "/images/hero-shoe.png" },
];

export default function AdminPaymentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Payment Verification</h1>
        <p className="text-[var(--foreground-secondary)]">Review and verify manually uploaded payment receipts.</p>
      </div>

      <div className="bg-[var(--color-velcraft-gold)]/10 border border-[var(--color-velcraft-gold)]/20 p-4 rounded-sm mb-8 flex items-center justify-between">
        <p className="text-sm text-[var(--color-velcraft-gold)]">
          <strong>2 payments</strong> are currently awaiting manual verification.
        </p>
      </div>

      <div className="space-y-6">
        {PENDING_PAYMENTS.map((payment) => (
          <div key={payment.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden flex flex-col md:flex-row">
            
            {/* Proof Image View */}
            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-[var(--border)] p-6 bg-[var(--surface-hover)] flex flex-col items-center justify-center relative min-h-[250px]">
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono flex items-center gap-2">
                <FileImage className="w-3 h-3" /> Proof Receipt
              </div>
              
              {/* Using a placeholder shoe image as a dummy receipt for now */}
              <div className="relative w-full h-48 border border-[var(--border)] bg-[var(--background)]">
                <Image src={payment.proofImage} alt="Payment Proof" fill className="object-contain" />
              </div>
              
              <button className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)] transition-colors">
                <Eye className="w-4 h-4" /> View Full Resolution
              </button>
            </div>

            {/* Details & Actions */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)] mb-1">Order Ref</p>
                  <h3 className="text-xl font-bold text-[var(--color-velcraft-gold)]">{payment.orderId}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)] mb-1">Claimed Amount</p>
                  <p className="text-2xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(payment.amount)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 mb-8 text-sm">
                <div>
                  <p className="text-[var(--foreground-secondary)] mb-0.5">Customer</p>
                  <p className="font-medium">{payment.customer}</p>
                </div>
                <div>
                  <p className="text-[var(--foreground-secondary)] mb-0.5">Method</p>
                  <p className="font-medium">{payment.method}</p>
                </div>
                <div>
                  <p className="text-[var(--foreground-secondary)] mb-0.5">Upload Date</p>
                  <p className="font-medium">{payment.date}</p>
                </div>
                <div>
                  <p className="text-[var(--foreground-secondary)] mb-0.5">Payment ID</p>
                  <p className="font-mono text-xs">{payment.id}</p>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-4 border-t border-[var(--border)] pt-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--color-velcraft-gold)] text-black font-semibold text-sm rounded-sm hover:bg-[var(--color-velcraft-gold-light)] transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  Approve & Move to Production
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[var(--color-velcraft-error)] text-[var(--color-velcraft-error)] font-semibold text-sm rounded-sm hover:bg-[var(--color-velcraft-error)]/10 transition-colors">
                  <XCircle className="w-4 h-4" />
                  Reject Proof
                </button>
              </div>
            </div>
            
          </div>
        ))}

        {PENDING_PAYMENTS.length === 0 && (
          <div className="text-center py-20 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
            <CheckCircle className="w-12 h-12 text-[var(--color-velcraft-gold)] mx-auto mb-4 opacity-50" />
            <p className="text-[var(--foreground-secondary)]">No pending payments to verify.</p>
          </div>
        )}
      </div>
    </div>
  );
}
