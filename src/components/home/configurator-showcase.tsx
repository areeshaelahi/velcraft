"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Droplets, Scissors } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

const features = [
  {
    icon: Droplets,
    title: "Premium Materials",
    description: "Choose from full-grain calfskin, suede, or exotic leathers.",
  },
  {
    icon: Sparkles,
    title: "Endless Details",
    description: "Customize everything from sole color to stitching and laces.",
  },
  {
    icon: Scissors,
    title: "Personalized Fit",
    description: "Crafted to your exact size specifications for ultimate comfort.",
  },
];

export function ConfiguratorShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-[var(--spacing-section-mobile)] md:py-[var(--spacing-section)] overflow-hidden">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <div className="relative h-[600px] w-full rounded-sm overflow-hidden bg-[var(--surface)]">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
              <motion.div 
                style={{ y }} 
                className="absolute inset-[-20%] bg-[url('/images/leather-texture.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-velcraft-black)] via-transparent to-transparent" />
            </div>

            {/* Interactive Demo Representation */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full max-w-sm aspect-square">
                {/* Center Shoe */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <img src="/images/hero-shoe.png" alt="Customizable Shoe" className="w-full object-contain drop-shadow-2xl scale-125" />
                </motion.div>

                {/* Floating Swatches */}
                <motion.div 
                  className="absolute top-10 right-10 w-12 h-12 rounded-full bg-[#8B4513] shadow-lg border-2 border-[var(--border)] z-30"
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div 
                  className="absolute bottom-20 left-4 w-12 h-12 rounded-full bg-[#1A1A1A] shadow-lg border-2 border-[var(--border)] z-30"
                  animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div 
                  className="absolute top-1/2 -right-4 w-12 h-12 rounded-full bg-[#C9A96E] shadow-lg border-2 border-[var(--border)] z-30"
                  animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />

                {/* Rings */}
                <div className="absolute inset-0 border border-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-4 border border-[var(--color-velcraft-gold)]/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="max-w-xl">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Be the <span className="text-accent text-[var(--color-velcraft-gold)]">Designer</span>
              </h2>
              <p className="text-lg text-[var(--foreground-secondary)] mb-10 leading-relaxed">
                Step into our 3D configurator and bring your vision to life. With millions of possible combinations, your Velcraft shoes will be uniquely yours.
              </p>
            </AnimatedSection>

            <div className="space-y-8 mb-12">
              {features.map((feature, i) => (
                <FadeIn key={i} delay={i * 0.1} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--color-velcraft-gold)] bg-[var(--surface)]">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 font-sans">{feature.title}</h3>
                    <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">{feature.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <AnimatedSection delay={0.4}>
              <Link href="/configurator" className="btn-primary w-full sm:w-auto">
                Start Customizing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
