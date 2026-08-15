import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Capabilities } from "@/components/home/Capabilities";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { IndustriesShowcase } from "@/components/home/IndustriesShowcase";
import { DeliveryApproach } from "@/components/home/DeliveryApproach";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Capabilities />
      <FeaturedProjects />
      <IndustriesShowcase />
      <DeliveryApproach />
      <PartnersStrip />
      <FinalCTA />
    </>
  );
}
