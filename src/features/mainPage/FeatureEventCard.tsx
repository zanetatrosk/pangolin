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
import { EventImage } from "@/components/EventImage";
import { PATHS } from "@/paths";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Users,
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
  price?: string;
  image?: string;
  attendees: number;
  maxAttendees?: number;
  instructor: string;
  tags: string[];
}

export const FeatureEventCard: React.FC<FeatureEventCardProps> = (event) => (
  <Card
    key={event.id}
    className="border-0 shadow-xl bg-white dark:bg-gray-900 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
  >
    <div className="relative h-48">
      <EventImage
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover"
      />
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
            {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attending
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

    <CardFooter className="pt-4 mt-auto shrink-0">
      <Link to={PATHS.EVENTS.DETAIL(event.id)}>
      <Button className="w-full">
        View Event Details
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      </Link>
    </CardFooter>
  </Card>
);
