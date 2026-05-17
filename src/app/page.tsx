import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { ConfiguratorShowcase } from "@/components/home/configurator-showcase";
import { CraftsmanshipStory } from "@/components/home/craftsmanship-story";
import { TrendingProducts } from "@/components/home/trending-products";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCollection />
      <ConfiguratorShowcase />
      <CraftsmanshipStory />
      <TrendingProducts />
    </>
  );
}
