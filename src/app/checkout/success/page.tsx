"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Upload, FileImage } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentMethod = searchParams.get("payment");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const submitProof = async () => {
    if (!file) return;
    setUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploading(false);
    setUploaded(true);
  };

  const requiresProof = paymentMethod !== "cod";

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="w-16 h-16 text-[var(--color-velcraft-gold)]" />
      </div>
      <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
        Order Confirmed
      </h1>
      <p className="text-lg text-[var(--foreground-secondary)] mb-8">
        Thank you for your purchase. Your order <strong className="text-[var(--foreground)]">{orderId}</strong> has been received.
      </p>

      {requiresProof && !uploaded && (
        <div className="bg-[var(--surface)] border border-[var(--color-velcraft-gold)]/30 p-8 rounded-sm mb-8 text-left">
          <h3 className="text-lg font-medium mb-2 text-[var(--color-velcraft-gold)]">Action Required: Payment Proof</h3>
          <p className="text-sm text-[var(--foreground-secondary)] mb-6">
            Please upload a screenshot or image of your payment receipt to process your order.
          </p>

          {!file ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--border)] hover:border-[var(--color-velcraft-gold)] rounded-sm cursor-pointer transition-colors bg-[var(--background)]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-6 h-6 mb-2 text-[var(--foreground-secondary)]" />
                <p className="text-sm text-[var(--foreground-secondary)]">Click to upload receipt</p>
                <p className="text-xs text-[var(--foreground-secondary)] mt-1">(PNG, JPG up to 5MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
          ) : (
            <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-sm bg-[var(--background)]">
              <div className="flex items-center gap-3">
                <FileImage className="w-6 h-6 text-[var(--color-velcraft-gold)]" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFile(null)} 
                  className="text-xs px-3 py-1 border border-[var(--border)] hover:bg-[var(--surface-hover)]"
                >
                  Change
                </button>
                <button 
                  onClick={submitProof}
                  disabled={uploading}
                  className="text-xs px-3 py-1 bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] font-medium disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Submit Proof"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {uploaded && (
        <div className="bg-[var(--color-velcraft-gold)]/10 border border-[var(--color-velcraft-gold)]/20 p-6 rounded-sm mb-8">
          <p className="text-sm font-medium text-[var(--color-velcraft-gold)]">
            Payment proof submitted successfully. We will review it shortly.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/account/orders" className="btn-secondary">
          Track Order
        </Link>
        <Link href="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container-luxury py-20 min-h-[70vh] flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
