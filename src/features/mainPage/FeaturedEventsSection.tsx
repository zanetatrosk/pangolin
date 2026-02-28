import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { FeatureEventCard } from './FeatureEventCard'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { getAllEvents } from '@/services/events-api'
import { useNavigate } from '@tanstack/react-router'
import { PATHS } from '@/paths'
import { transformEventToCard } from './utils/transformEventToCard'

export function FeaturedEventsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { data: eventsData } = useQuery({
    queryKey: ['featured-events'],
    queryFn: () => getAllEvents(0, undefined, 3),
  });

  const featuredEvents = eventsData?.content?.map(transformEventToCard) || [];

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
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8"
            onClick={() => navigate({ to: PATHS.EVENTS.LIST })}
          >
            {t('home.viewEvents')}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}