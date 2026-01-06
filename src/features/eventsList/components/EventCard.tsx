import { DataWithIcon } from "@/components/DataWithIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EventMediaItem } from "@/features/newEvent/types";
import { PATHS } from "@/paths";
import { getLabelFromPrice } from "@/utils/getLabelFromPrice";
import { useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  Calendar,
  ExternalLink,
  Heart,
  MapPin,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EventItem } from "../types";



export const EventCard: React.FC<EventItem> = (event) => {
  const { t } = useTranslation();
  const [isInterested, setIsInterested] = useState(false);
  const navigate = useNavigate();
  const cardInfoWithIcon = [
    {
      icon: Calendar,
      label: `${event.date} ${t("eventCard.at")} ${event.time}`,
    },
    {
      icon: MapPin,
      label: event.address,
    },
    {
      icon: Users,
      label: `${event.interested} interested, ${event.attendees} ${t(
        "eventCard.attending"
      )}`,
    },
    {
      icon: Banknote,
      label: getLabelFromPrice(event.price, event.currency),
      bold: true,
    },
  ];
  return (
    <Card className="py-0 md:flex-row md:gap-0 rounded-l-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-violet-200/50 dark:border-violet-700/50 ">
      <CardContent className="p-0 flex flex-col md:flex-row w-full">
        {/* Event Image */}
        <div className="relative md:w-64 h-48 md:h-auto shrink-0">
          {event.promoMedia?.url ? (
            <img
              src={event.promoMedia.url}
              alt={event.eventName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-900 dark:to-violet-800 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-violet-400 dark:text-violet-600" />
            </div>
          )}
        </div>
        <div className="sm:min-w-54 grow">
          <div className="flex-1 p-4 md:p-6 md:pt-2 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {event.eventName}
                  </h3>
                  {event.organizer && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("eventCard.by")} {event.organizer}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 md:mb-4">
                  {event.tags.slice(0, 5).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {event.tags.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{event.tags.length - 5}
                    </Badge>
                  )}
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {event.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-y-2 md:gap-y-3 gap-x-20">
                {cardInfoWithIcon.map(({ icon, label, bold }) => (
                  <DataWithIcon
                    key={label}
                    icon={icon}
                    value={label}
                    bold={bold}
                  />
                ))}
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-3">
            <div
              className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:justify-start">
              <Button variant="ghost" size="sm" onClick={() => setIsInterested(!isInterested)} className={`${'' +
                          isInterested
                            ? 'text-rose-600 hover:text-rose-700'
                            : 'text-gray-600 hover:text-rose-600'
                        }`}>
                <Heart className={`w-4 h-4 mr-1 ${isInterested ? 'fill-rose-600' : ''}`} />
                {"Interest"}
              </Button>
              <Button variant={"outline"} size="sm">
                <UserPlus className="w-4 h-4 mr-1" />
                {"Join Event"}
              </Button>
            </div>

            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <Button size="sm" className="w-full md:w-auto" onClick={() => navigate({ to: PATHS.EVENTS.DETAIL(event.id) })}>
                View Details
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
