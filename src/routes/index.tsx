import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/features/mainPage/HeroSection'
import { FeaturesSection } from '@/features/mainPage/FeaturesSection'
import { FeaturedEventsSection } from '@/features/mainPage/FeaturedEventsSection'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
      <HeroSection />
      <FeaturesSection />
      <FeaturedEventsSection />
      <Footer />
    </div>
  )
}
