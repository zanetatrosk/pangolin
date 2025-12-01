import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, TrendingUp, Star } from 'lucide-react'

export function FeaturesSection() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Connect2Dance?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to discover, join, and organize incredible dance events
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-xl bg-pink-100 dark:bg-gray-900/80 backdrop-blur">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Partner Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                Our intelligent matching system pairs you with compatible dance partners based on skill level, style preferences, and availability.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl bg-pink-100 dark:bg-gray-900/80 backdrop-blur">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                Easy-to-use tools for creating, managing, and promoting your dance events. Integrated forms, payments, and attendee management.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl bg-pink-100 dark:bg-gray-900/80 backdrop-blur">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Community Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                Read honest reviews from fellow dancers, rate events, and help build a trusted community of dance enthusiasts.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}