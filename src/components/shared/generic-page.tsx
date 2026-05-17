import { BRAND } from "@/lib/constants";

export default function GenericPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="container-luxury py-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl mb-6 font-medium" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h1>
      <p className="max-w-2xl text-[var(--foreground-secondary)] leading-relaxed">
        {description}
      </p>
      <div className="w-16 h-[1px] bg-[var(--color-velcraft-gold)] mt-12" />
    </div>
  );
}
