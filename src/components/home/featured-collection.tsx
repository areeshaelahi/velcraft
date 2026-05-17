"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

const collections = [
  {
    id: "formal",
    title: "The Executive",
    description: "Impeccable oxfords and derbies for the boardroom.",
    image: "/images/collection-formal.jpg", // Placeholder
    href: "/collections/executive",
  },
  {
    id: "casual",
    title: "Weekend Elegance",
    description: "Refined loafers and chelsea boots for off-duty days.",
    image: "/images/collection-casual.jpg", // Placeholder
    href: "/collections/weekend",
  },
  {
    id: "wedding",
    title: "The Groom's Cut",
    description: "Opulent velvet and patent leathers for your special day.",
    image: "/images/collection-wedding.jpg", // Placeholder
    href: "/collections/wedding",
  },
];

export function FeaturedCollection() {
  return (
    <section className="py-[var(--spacing-section-mobile)] md:py-[var(--spacing-section)] bg-[var(--background-secondary)] relative border-y border-[var(--border)]">
      <div className="container-luxury">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl mb-4">Curated Collections</h2>
            <p className="text-[var(--foreground-secondary)]">
              Discover our ready-to-wear collections, handcrafted with the same meticulous attention to detail as our bespoke offerings.
            </p>
          </div>
          <Link href="/collections" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)] transition-colors">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, i) => (
            <FadeIn key={collection.id} delay={i * 0.2}>
              <Link href={collection.href} className="group block relative overflow-hidden bg-[var(--surface)] aspect-[4/5]">
                {/* Image Background */}
                <div className="absolute inset-0 bg-neutral-800">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="w-10 h-[1px] bg-[var(--color-velcraft-gold)] mb-6 group-hover:w-20 transition-all duration-500" />
                    <h3 className="text-2xl md:text-3xl mb-3 font-normal" style={{ fontFamily: "var(--font-heading)" }}>
                      {collection.title}
                    </h3>
                    <p className="text-sm text-white/70 max-w-[90%] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {collection.description}
                    </p>
                  </motion.div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
