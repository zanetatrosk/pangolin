import { Button } from '@/components/ui/button'
import { CalendarDays, MapPin, Ticket, Info } from 'lucide-react'

export type Event = {
  id: string
  title: string
  date: string
  location: string
  genre: string
  description?: string
}

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="group rounded-lg border bg-card text-card-foreground shadow-sm transition hover:shadow-md">
      <div className="relative h-36 overflow-hidden rounded-t-lg bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500">
        <div className="absolute inset-0 opacity-20">
          <div className="size-full bg-[radial-gradient(ellipse_at_center,white_0%,transparent_60%)]" />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="text-lg font-semibold tracking-tight">
          {event.title}
        </h3>
        <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <div className="inline-flex items-center gap-2">
            <CalendarDays className="size-4" /> {event.date}
          </div>
          <div className="inline-flex items-center gap-2">
            <MapPin className="size-4" /> {event.location}
          </div>
        </div>
        <div className="text-xs text-secondary-foreground/80">{event.genre}</div>
        <div className="flex gap-2 pt-2">
          <Button className="gap-2">
            <Ticket className="size-4" /> Buy Tickets
          </Button>
          <Button variant="outline" className="gap-2">
            <Info className="size-4" /> Details
          </Button>
        </div>
      </div>
    </article>
  )
}
