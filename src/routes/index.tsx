import { createFileRoute } from '@tanstack/react-router'
import { EventsGrid } from '@/components/EventsGrid'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 opacity-30" />
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
              <Sparkles className="size-3" /> Discover unforgettable dance nights
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find and share dance events near you
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Explore salsa, bachata, kizomba, tango and more. Buy tickets, connect with artists, and never miss a beat.
            </p>
            <div className="flex gap-3">
              <Button size="lg">Browse Events</Button>
              <Button size="lg" variant="outline">Create Event</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-10">
        <EventsGrid />
      </div>
    </div>
  )
}
