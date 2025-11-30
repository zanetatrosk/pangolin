import { Button } from '@/components/ui/button'
import { Calendar, Users, Star, Plus } from 'lucide-react'

export function HeroSection() {

  return (
    <section className="relative px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 dark:from-purple-400/10 dark:via-pink-400/10 dark:to-orange-400/10" />
      
      <div className="relative max-w-7xl mx-auto text-center">
        
        <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-7">
          Connect Through Dance
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Discover amazing social dance events, find your perfect dance partner, and join a vibrant community of dancers
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Find Events
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-purple-300 hover:bg-purple-50 dark:border-purple-600 dark:hover:bg-purple-900/50">
                <Plus className="mr-2 h-5 w-5" />
                Host Event
              </Button>
          
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">500+ Active Dancers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-pink-600" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">50+ Events Monthly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">4.9★ Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}