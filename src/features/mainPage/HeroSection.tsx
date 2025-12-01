import { Button } from "@/components/ui/button";
import { Calendar, Users, Star, Plus } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-4 py-20 bg-linear-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-7 text-gray-900 dark:text-white">
          Connect Through Dance
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Discover amazing social dance events, find your perfect dance partner,
          and join a vibrant community of dancers
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-linear-to-r from-rose-500 to-violet-500 dark:from-rose-600 dark:to-violet-600 text-white rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Find Events
          </Button>
          <Button size="lg" className="px-8 py-6 text-lg">
            <Plus className="mr-2 h-5 w-5" />
            Host Event
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              500+ Active Dancers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-pink-600" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              50+ Events Monthly
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              4.9★ Average Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
