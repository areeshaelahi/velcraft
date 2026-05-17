import { ConfiguratorCanvas } from "@/components/configurator/configurator-canvas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoe Builder | Velcraft",
  description: "Design your own custom bespoke luxury footwear.",
};

export default function ConfiguratorPage() {
  return <ConfiguratorCanvas />;
}
