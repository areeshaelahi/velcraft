"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animated-section";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center py-12 lg:py-0 overflow-hidden">
      {/* Background with abstract luxury gradient/texture */}
      <div className="absolute inset-0 z-0 bg-[var(--background)]">
        <div className="absolute inset-0 opacity-30 dark:opacity-20 mix-blend-overlay">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-velcraft-gold)]/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[var(--color-velcraft-charcoal)]/20 to-transparent blur-3xl" />
        </div>
      </div>

      <div className="container-luxury relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Text Content */}
        <StaggerContainer className="order-2 lg:order-1 max-w-2xl text-center lg:text-left mx-auto lg:mx-0 pt-8 lg:pt-0">
          <StaggerItem>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-velcraft-gold)] mb-6">
              The Artisan Collection
            </p>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight">
              Crafted for the <br />
              <span className="text-accent text-[var(--color-velcraft-gold)]">
                Extraordinary
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-base md:text-lg text-[var(--foreground-secondary)] mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the pinnacle of luxury footwear. Bespoke designs, 
              handcrafted by master artisans using the world's finest full-grain leathers.
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/configurator" className="btn-primary w-full sm:w-auto">
              Design Your Own
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/collections" className="btn-secondary w-full sm:w-auto">
              Explore Collection
            </Link>
          </StaggerItem>
        </StaggerContainer>

        {/* Hero Image */}
        <FadeIn delay={0.3} className="order-1 lg:order-2 relative h-[50vh] lg:h-[80vh] w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-velcraft-gold)]/5 to-transparent rounded-full blur-3xl" />
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="relative w-full h-full max-w-lg lg:max-w-none mx-auto drop-shadow-2xl"
          >
            <Image
              src="/images/hero-shoe.png"
              alt="Velcraft bespoke luxury oxford shoe"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Floating UI Badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-1/4 -left-4 md:-left-12 glass px-4 py-3 rounded-sm flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--color-velcraft-gold)] animate-pulse" />
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground)]">
              Italian Calf Leather
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-1/4 -right-4 md:-right-12 glass px-4 py-3 rounded-sm flex flex-col backdrop-blur-md text-right"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--foreground-secondary)] mb-1">
              Base Price
            </p>
            <p className="text-sm font-semibold tracking-wider text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>
              PKR 18,500
            </p>
          </motion.div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-[var(--foreground-secondary)]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-velcraft-gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
