"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, NAVIGATION } from "@/lib/constants";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Collections", href: "/collections" },
    { label: "Custom Builder", href: "/configurator" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Best Sellers", href: "/collections/best-sellers" },
  ],
  company: [
    { label: "Our Story", href: "/story" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  support: [
    { label: "Size Guide", href: "/faq#size-guide" },
    { label: "Shipping & Returns", href: "/faq#shipping" },
    { label: "Care Guide", href: "/faq#care" },
    { label: "Track Order", href: "/account/orders" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--color-velcraft-black)] text-[var(--color-velcraft-ivory)]">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-luxury py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3
              className="text-2xl md:text-3xl mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Join the Velcraft Circle
            </h3>
            <p className="text-sm text-[var(--color-velcraft-silver)]">
              Be the first to know about new collections, exclusive offers, and
              artisan stories.
            </p>
          </div>
          <form
            className="flex w-full md:w-auto gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-5 py-3.5 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-[var(--color-velcraft-gold)] text-[var(--color-velcraft-black)] text-xs font-semibold uppercase tracking-widest hover:bg-[var(--color-velcraft-gold-light)] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <span
                className="text-xl tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {BRAND.name}
              </span>
            </Link>
            <p className="mt-4 text-sm text-[var(--color-velcraft-silver)] leading-relaxed">
              {BRAND.description}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold)] transition-colors"
              >
                <Camera className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                href={`mailto:${BRAND.email}`}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold)] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-velcraft-gold)] mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-velcraft-silver)] hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-velcraft-gold)] mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-sm text-[var(--color-velcraft-silver)]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {BRAND.address}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[var(--color-velcraft-silver)]">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {BRAND.email}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[var(--color-velcraft-silver)]">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                +92 300 1234567
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-velcraft-muted)]">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/faq"
              className="text-xs text-[var(--color-velcraft-muted)] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/faq"
              className="text-xs text-[var(--color-velcraft-muted)] hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
