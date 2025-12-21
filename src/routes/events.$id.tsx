import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AttendeeStatsCard } from "@/features/events/AttendiesCard";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Heart,
  Check,
  ExternalLink,
  Info,
  Banknote,
  Facebook,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/events/$id")({
  component: RouteComponent,
});

// --- Interfaces (Adapted for Display) ---

export interface BasicDetailsData {
  eventName: string;
  location: string;
  date: string;
  time: string;
  isRecurring: boolean;
  endDate?: string;
  priceRange: string;
  priceExact?: string;
}

export interface AdditionalDetailsData {
  danceStyles: string[];
  skillLevel: string[];
  typeOfEvent: string[];
  maxAttendees?: number;
  allowWaitlist: boolean;
  allowPartnerPairing: boolean;
}

export interface EventMediaItem {
  url: string;
  type: "image" | "video";
}

export interface AttendeeStats {
  going: {
    total: number;
    leaders: number;
    followers: number;
  };
  interested: number;
}

export interface EventDetailData {
  basicInfo: BasicDetailsData;
  additionalDetails?: AdditionalDetailsData;
  description?: string;
  coverImage?: string;
  media?: EventMediaItem[];
  attendeeStats?: AttendeeStats;
  facebookEventUrl?: string;
}

// --- Mock Data ---
const MOCK_EVENT: EventDetailData = {
  basicInfo: {
    eventName: "Salsa & Bachata Night Fever",
    location: "Dance Studio 101, New York, NY",
    date: "2024-06-15",
    time: "20:00",
    isRecurring: true,
    priceRange: "15-20",
    priceExact: "15",
  },
  additionalDetails: {
    danceStyles: ["Salsa", "Bachata", "Merengue"],
    skillLevel: ["All Levels", "Beginner Friendly"],
    typeOfEvent: ["Social", "Party", "Workshop"],
    maxAttendees: 150,
    allowWaitlist: true,
    allowPartnerPairing: true,
  },
  description:
    "Join us for an unforgettable night of dancing! We start with a beginner-friendly workshop at 8 PM, followed by social dancing until 2 AM. Great music, amazing atmosphere, and the best dancers in town. \n\nWhether you are a seasoned pro or just starting out, you'll find a welcoming community and plenty of partners to dance with. Don't miss out on the special performance at midnight!",
  coverImage:
    "https://www.shbarcelona.com/blog/en/wp-content/uploads/2016/04/Bachata-dance.jpg",
  facebookEventUrl: "https://facebook.com/events/example",
  media: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1546215364-12f3fff5d578?q=80&w=1000&auto=format&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop",
    },
    { type: "video", url: "https://www.youtube.com/shorts/-9YFJkmlHWo" },
  ],
  attendeeStats: {
    going: {
      total: 45,
      leaders: 20,
      followers: 25,
    },
    interested: 120,
  },
};

function RouteComponent() {
  const { id } = Route.useParams();
  const { t } = useTranslation();
  const event = MOCK_EVENT; // In a real app, fetch this data using the ID

  const [isGoing, setIsGoing] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const {
    basicInfo,
    additionalDetails,
    description,
    coverImage,
    media,
    attendeeStats,
    facebookEventUrl,
  } = event;

  const handleJoin = () => {
    setIsGoing(!isGoing);
    if (isInterested) setIsInterested(false);
  };

  const handleInterested = () => {
    setIsInterested(!isInterested);
    if (isGoing) setIsGoing(false);
  };

  const handleViewOnFacebook = () => {
    window.open("https://facebook.com/events/example", "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero / Cover Image */}
      <div className="relative w-full md:h-96 flex flex-col md:block bg-muted">
        <div className="relative h-64 md:h-full w-full overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={basicInfo.eventName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
          )}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative md:absolute md:bottom-0 md:left-0 w-full bg-background md:bg-transparent p-6 md:p-10">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              {basicInfo.eventName}
            </h1>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-foreground/90 font-medium text-sm md:text-base mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{basicInfo.date}</span>
              </div>
              <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/20" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{basicInfo.time}</span>
              </div>
              <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/20" />
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                <span>
                  {basicInfo.priceExact
                    ? `$${basicInfo.priceExact}`
                    : basicInfo.priceRange}
                </span>
              </div>
              <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/20" />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  basicInfo.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary hover:underline transition-colors cursor-pointer"
                title="View on Google Maps"
              >
                <MapPin className="w-4 h-4" />
                <span>{basicInfo.location}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/20" />

              {facebookEventUrl && (
                <a
                  href={facebookEventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto flex items-center gap-2 hover:text-[#1877F2] hover:underline transition-colors cursor-pointer"
                  title="View on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook Event</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-4 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="contents lg:block lg:col-span-2 lg:space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 order-1 lg:order-none">
              <Button
                size="lg"
                className={`flex-1 md:flex-none gap-2 ${
                  isGoing ? "bg-green-600 hover:bg-green-700" : ""
                }`}
                onClick={handleJoin}
              >
                {isGoing ? <Check className="w-4 h-4" /> : null}
                {isGoing ? "Going" : "Join Event"}
              </Button>

              <Button
                variant={isInterested ? "secondary" : "outline"}
                size="lg"
                className={`flex-1 md:flex-none gap-2 ${
                  isInterested ? "text-primary" : ""
                }`}
                onClick={handleInterested}
              >
                <Heart
                  className={`w-4 h-4 ${isInterested ? "fill-current" : ""}`}
                />
                Interested
              </Button>

              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none order-3 lg:order-none">
              <h2 className="text-2xl font-semibold mb-4">About Event</h2>
              <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Media Gallery */}
            {media && media.length > 0 && (
              <div className="order-4 lg:order-none">
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {media.map((item, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-xl overflow-hidden bg-muted"
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/10">
                          <span className="text-xs text-muted-foreground">
                            Video
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Details */}
          <div className="contents lg:block lg:space-y-6">
            {/* Attendee Stats Card */}
            {attendeeStats && (
              <div className="order-2 lg:order-none">
                <AttendeeStatsCard attendeeStats={attendeeStats} />
              </div>
            )}

            {/* Details */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 order-5 lg:order-none">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Details
              </h3>
              <div className="mt-4 space-y-4">
                

                {event.additionalDetails?.typeOfEvent && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Event Type
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {event.additionalDetails.typeOfEvent.map((type) => (
                        <span
                          key={type}
                          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {event.additionalDetails?.danceStyles && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Styles
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {event.additionalDetails.danceStyles.map((style) => (
                        <span
                          key={style}
                          className="inline-flex items-center rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-700/10"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {event.additionalDetails?.skillLevel && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Level
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {event.additionalDetails.skillLevel.map((level) => (
                        <span
                          key={level}
                          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Card className="order-6 lg:order-none">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  DS
                </div>
                <div>
                  <p className="text-sm font-medium">Organized by</p>
                  <p className="font-bold">Dance Studio 101</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
