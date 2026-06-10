import { useReveal } from '@/animations/useReveal'
import BeforeAfterProof from '@/sections/BeforeAfterProof'
import ClientTrustStrip from '@/sections/ClientTrustStrip'
import ContactAssessment from '@/sections/ContactAssessment'
import FAQSection from '@/sections/FAQSection'
import HeroSection from '@/sections/HeroSection'
import ImpactStatsBand from '@/sections/ImpactStatsBand'
import ProjectsInFocus from '@/sections/ProjectsInFocus'
import ServicesOverview from '@/sections/ServicesOverview'
import TestimonialsPremium from '@/sections/TestimonialsPremium'

export default function Home() {
  useReveal()

  return (
    <main className="relative overflow-hidden bg-surface-dark">
      <HeroSection />
      <ClientTrustStrip />
      <ServicesOverview />
      <ImpactStatsBand />
      <ProjectsInFocus />
      <BeforeAfterProof />
      <TestimonialsPremium />
      <FAQSection />
      <ContactAssessment />
    </main>
  )
}
