import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { WhatIsMirrorSection } from "@/components/what-is-mirror"
import { CoreFeaturesSection } from "@/components/core-features"
import { IntegrationsSection } from "@/components/integrations-section"
import { VisionSection } from "@/components/vision-section"
import { AccessSection } from "@/components/access-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full bg-white text-black">
      <Navigation />
      <HeroSection />
      <WhatIsMirrorSection />
      <CoreFeaturesSection />
      <IntegrationsSection />
      <VisionSection />
      <AccessSection />
      <Footer />
    </main>
  )
}
