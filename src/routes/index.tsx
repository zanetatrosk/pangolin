import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/features/mainPage/HeroSection'
import { FeaturesSection } from '@/features/mainPage/FeaturesSection'
import { FeaturedEventsSection } from '@/features/mainPage/FeaturedEventsSection'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedEventsSection />
      <Footer />
    </>
  )
}
