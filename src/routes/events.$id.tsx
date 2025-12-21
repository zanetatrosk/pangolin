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
import { DanceEventCreation } from "@/features/newEvent/types";
import { CoverImage } from "@/features/events/components/CoverImage";
import { HeroInformations } from "@/features/events/components/HeroInformations";

export const Route = createFileRoute("/events/$id")({
  component: RouteComponent,
});

// --- Interfaces (Adapted for Display) ---

export interface AttendeeStats {
  going: {
    total: number;
    leaders: number;
    followers: number;
  };
  interested: number;
}

export interface EventDetailData extends DanceEventCreation{
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
  coverImage: new File([], "cover.jpg"),
  facebookEventUrl: "https://facebook.com/events/example",
  media: [
    {
      type: "image",
      file: new File([], "example.jpg"),
    },
    {
      type: "image",
      file: new File([], "example2.jpg"),
    },
    {
      type: "image",
      file: new File([], "example3.jpg"),
    },
    { type: "video", file: new File([], "example_video.mp4") },
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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero / Cover Image */}
      <div className="relative w-full md:h-96 flex flex-col md:block bg-muted">
          <CoverImage coverImage={coverImage} eventName={basicInfo.eventName} />
          <HeroInformations basicInfo={basicInfo} facebookEventUrl={facebookEventUrl}/>
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
                          src={URL.createObjectURL(item.file)}
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
