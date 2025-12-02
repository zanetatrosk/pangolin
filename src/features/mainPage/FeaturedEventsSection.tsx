import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { FeatureEventCard } from './FeatureEventCard'
import { useTranslation } from 'react-i18next'


const featuredEvents = [
  {
    id: 1,
    title: "Salsa & Bachata Social Night",
    description: "Join us for an unforgettable evening of passionate Latin rhythms",
    date: "Dec 15, 2025",
    time: "8:00 PM - 2:00 AM",
    location: "Downtown Dance Studio",
    price: "$25",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
    attendees: 45,
    maxAttendees: 80,
    difficulty: "All Levels",
    instructor: "Maria Rodriguez",
    tags: ["Salsa", "Bachata", "Social"],
    rating: 4.8,
    pairingAvailable: true
  },
  {
    id: 2,
    title: "Tango Workshop & Milonga",
    description: "Experience the elegance and passion of Argentine Tango",
    date: "Dec 18, 2025",
    time: "7:00 PM - 11:30 PM",
    location: "La Milonga Hall",
    price: "$35",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400",
    attendees: 28,
    maxAttendees: 50,
    difficulty: "Intermediate",
    instructor: "Carlos & Elena",
    tags: ["Tango", "Workshop", "Milonga"],
    rating: 4.9,
    pairingAvailable: true
  },
  {
    id: 3,
    title: "Kizomba & Urban Kiz Fusion",
    description: "Smooth sensual moves meet modern urban style",
    date: "Dec 22, 2025",
    time: "8:30 PM - 1:00 AM",
    location: "Fusion Dance Center",
    price: "$30",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400",
    attendees: 35,
    maxAttendees: 60,
    difficulty: "Beginner-Friendly",
    instructor: "DJ Antoine & Lisa",
    tags: ["Kizomba", "Urban Kiz", "Fusion"],
    rating: 4.7,
    pairingAvailable: false
  }
]

export function FeaturedEventsSection() {
  const { t } = useTranslation();
  return (
    <section className="px-4 py-16 bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t('home.featuredEvents')}
          subtitle={t('home.featuredEventsText')}
        />
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event) => (
            <FeatureEventCard key={event.id} {...event} />
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            {t('home.viewEvents')}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}