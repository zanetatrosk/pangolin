import { EventCard, type Event } from './EventCard'

const demoEvents: Event[] = [
  {
    id: '1',
    title: 'Salsa Night Fever',
    date: 'Sat, Dec 6 · 8:00 PM',
    location: 'City Dance Hall',
    genre: 'Salsa · Social',
  },
  {
    id: '2',
    title: 'Bachata Bliss Weekender',
    date: 'Dec 12–14',
    location: 'Sunset Ballroom',
    genre: 'Bachata · Festival',
  },
  {
    id: '3',
    title: 'Kizomba Under The Stars',
    date: 'Fri, Dec 19 · 9:00 PM',
    location: 'Riverside Studio',
    genre: 'Kizomba · Social',
  },
  {
    id: '4',
    title: 'Tango Milonga Elegante',
    date: 'Sun, Dec 21 · 7:00 PM',
    location: 'Teatro Moderno',
    genre: 'Tango · Milonga',
  },
]

export function EventsGrid({ events = demoEvents }: { events?: Event[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  )
}
