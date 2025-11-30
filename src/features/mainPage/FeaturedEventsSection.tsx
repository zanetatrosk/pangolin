import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users, Star, Heart, Share2, ArrowRight } from 'lucide-react'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  price: string
  image: string
  attendees: number
  maxAttendees: number
  difficulty: string
  instructor: string
  tags: string[]
  rating: number
  pairingAvailable: boolean
}

const featuredEvents: Event[] = [
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
  return (
    <section className="px-4 py-16 bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Events
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't miss these amazing upcoming dance events in your area
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event) => (
            <Card key={event.id} className="border-0 shadow-xl bg-white dark:bg-gray-900 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
                    {event.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {event.pairingAvailable && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Heart className="w-3 h-3 mr-1" />
                      Partner Match
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{event.rating}</span>
                  </div>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees}/{event.maxAttendees} attending</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="text-2xl font-bold">{event.price}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button>
                      Join Event
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Events
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}