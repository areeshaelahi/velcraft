"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

export function CraftsmanshipStory() {
  return (
    <section className="py-[var(--spacing-section-mobile)] md:py-[var(--spacing-section)] bg-[var(--color-velcraft-black)] text-white">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <AnimatedSection direction="right" className="order-2 lg:order-1">
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-velcraft-gold)] mb-6">
              Our Heritage
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              A Legacy of <br />
              <span className="text-accent text-[var(--color-velcraft-gold)]">Excellence</span>
            </h3>
            
            <div className="space-y-6 text-[var(--color-velcraft-silver)] text-base md:text-lg leading-relaxed mb-10">
              <p>
                Every Velcraft shoe begins its journey in the hands of master artisans in Lahore, Pakistan. 
                Drawing upon generations of shoemaking heritage, we blend traditional techniques with modern innovation.
              </p>
              <p>
                It takes over 200 meticulous steps to construct a single pair. From the careful selection of 
                full-grain European calfskin to the hand-painted patina and final polish, perfection is our only standard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-3xl font-medium text-[var(--color-velcraft-gold)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>200+</p>
                <p className="text-xs uppercase tracking-widest text-[var(--color-velcraft-silver)]">Steps per pair</p>
              </div>
              <div>
                <p className="text-3xl font-medium text-[var(--color-velcraft-gold)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>100%</p>
                <p className="text-xs uppercase tracking-widest text-[var(--color-velcraft-silver)]">Handcrafted</p>
              </div>
            </div>

            <Link href="/story" className="inline-block border-b border-[var(--color-velcraft-gold)] text-[var(--color-velcraft-gold)] pb-1 text-sm font-medium uppercase tracking-widest hover:text-[var(--color-velcraft-gold-light)] hover:border-[var(--color-velcraft-gold-light)] transition-colors">
              Read Our Story
            </Link>
          </AnimatedSection>

          <FadeIn className="order-1 lg:order-2 relative h-[500px] md:h-[700px] w-full">
            {/* Collage effect */}
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-neutral-800">
               <div className="w-full h-full bg-[url('/images/craft-1.jpg')] bg-cover bg-center opacity-50 mix-blend-overlay" />
               <div className="absolute inset-0 border border-white/10 m-4" />
            </div>
            
            <div className="absolute bottom-0 left-0 w-[60%] h-[50%] bg-[var(--color-velcraft-dark)] border border-white/5 shadow-2xl p-2 bg-neutral-900">
               <div className="w-full h-full bg-[url('/images/craft-2.jpg')] bg-cover bg-center opacity-60 mix-blend-overlay" />
            </div>

            {/* Decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[var(--color-velcraft-gold)] flex items-center justify-center bg-[var(--color-velcraft-black)]/50 backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-velcraft-gold)] text-center">Since<br/>2024</span>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
