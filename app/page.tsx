"use client"

// Import section components
import FeaturesSection from "@/components/sections/FeaturesSection"
import ProductsSection from "@/components/sections/ProductsSection"
import OurEcosystem from "@/components/sections/OurEcosystem"
import TechnologiesSection from "@/components/sections/TechnologiesSection"
import ResearchSection from "@/components/sections/ResearchSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import CTASection from "@/components/sections/CTASection"
import IntelligentHorizonHero from "@/components/sections/SimpleHeroSection"
import NeuralTransitionHero from "@/components/sections/UnderstandingTheWorldSection"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <IntelligentHorizonHero />
      <ProductsSection />
      <FeaturesSection />
      <OurEcosystem />
      <TechnologiesSection />
      <ResearchSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
