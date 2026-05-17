import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    id: "formal",
    title: "The Executive Collection",
    description: "Impeccable oxfords and derbies designed for the boardroom. Hand-patinated leathers and timeless silhouettes.",
    image: "/images/collection-formal.jpg",
    slug: "executive",
    itemCount: 12
  },
  {
    id: "wedding",
    title: "The Groom's Cut",
    description: "Opulent velvet, patent leathers, and bespoke embroidery for your special day. Make a statement that lasts a lifetime.",
    image: "/images/collection-wedding.jpg",
    slug: "wedding",
    itemCount: 8
  },
  {
    id: "casual",
    title: "Weekend Elegance",
    description: "Refined loafers, driving shoes, and chelsea boots. Because true luxury doesn't take days off.",
    image: "/images/collection-casual.jpg",
    slug: "weekend",
    itemCount: 15
  },
  {
    id: "exotic",
    title: "The Exotic Vault",
    description: "Rare materials including alligator, ostrich, and python. For those who demand the absolute pinnacle of exclusivity.",
    image: "/images/collection-exotic.jpg",
    slug: "exotic",
    itemCount: 4
  }
];

export default function CollectionsPage() {
  return (
    <div className="container-luxury py-12 md:py-20">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Curated <span className="text-accent text-[var(--color-velcraft-gold)]">Collections</span>
        </h1>
        <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed">
          Explore our thematic collections. Each series is thoughtfully curated to serve different facets of the modern gentleman's life.
        </p>
      </div>

      <div className="flex flex-col gap-12 md:gap-24">
        {COLLECTIONS.map((collection, index) => (
          <div 
            key={collection.id} 
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center group`}
          >
            <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] relative overflow-hidden bg-[var(--surface)]">
              <Link href={`/collections/${collection.slug}`}>
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                   <Image 
                     src={collection.image} 
                     alt={collection.title} 
                     fill 
                     className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                   />
                   <span className="text-xs text-neutral-400 absolute bottom-4 right-4">Collection Image</span>
                </div>
              </Link>
            </div>
            
            <div className="w-full md:w-2/5 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-velcraft-gold)] mb-4">
                {collection.itemCount} Styles
              </span>
              <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                {collection.title}
              </h2>
              <p className="text-[var(--foreground-secondary)] leading-relaxed mb-8">
                {collection.description}
              </p>
              <Link 
                href={`/collections/${collection.slug}`} 
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-[var(--color-velcraft-gold)] transition-colors w-fit"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
