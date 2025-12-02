import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Heart,
  Star,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  ArrowRight,
  Banknote,
} from "lucide-react";

interface FeatureEventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  attendees: number;
  maxAttendees: number;
  difficulty: string;
  instructor: string;
  tags: string[];
  rating: number;
  pairingAvailable: boolean;
}

export const FeatureEventCard: React.FC<FeatureEventCardProps> = (event) => (
  <Card
    key={event.id}
    className="border-0 shadow-xl bg-white dark:bg-gray-900 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
  >
    <div className="relative">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-4 left-4">
        <Badge>{event.difficulty}</Badge>
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        {event.pairingAvailable && (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            <Heart className="w-3 h-3 mr-1" />
            Partner Match
          </Badge>
        )}
      </div>
    </div>

    <CardHeader className="shrink-0">
      <div className="flex items-start justify-between">
        <CardTitle className="text-xl">{event.title}</CardTitle>
      </div>
      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
    </CardHeader>

    <CardContent className="space-y-3 grow">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="truncate">{event.date} at {event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>
            {event.attendees}/{event.maxAttendees} attending
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Banknote className="w-4 h-4" />
          <span className="font-semibold">{event.price}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {event.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
        {event.tags.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{event.tags.length - 3}
          </Badge>
        )}
      </div>
    </CardContent>

    <CardFooter className="pt-4 mt-auto flex-shrink-0">
      <Button className="w-full">
        View Event Details
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </CardFooter>
  </Card>
);
