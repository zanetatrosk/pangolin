import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Share2,
  Music,
  CheckCircle2,
  PlayCircle,
  Navigation,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  const { basicInfo, additionalDetails, description, coverImage, media, attendeeStats } = event;

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-muted">
        {coverImage ? (
          <img
            src={coverImage}
            alt={basicInfo.eventName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
            <Music className="h-24 w-24 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {additionalDetails?.typeOfEvent.map((type) => (
                <Badge key={type} variant="secondary" className="text-sm">
                  {type}
                </Badge>
              ))}
              {basicInfo.isRecurring && (
                <Badge variant="outline" className="bg-background/50 backdrop-blur">
                  Recurring Event
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {basicInfo.eventName}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 md:-mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>About this Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {description || "No description provided."}
                </p>
              </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Music className="h-5 w-5 text-primary" /> Dance Styles
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {additionalDetails?.danceStyles.map((style) => (
                    <Badge key={style} variant="outline">
                      {style}
                    </Badge>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Skill Level
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {additionalDetails?.skillLevel.map((level) => (
                    <Badge key={level} variant="outline">
                      {level}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Features List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Features</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {additionalDetails?.allowPartnerPairing && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Partner Pairing Available</span>
                  </div>
                )}
                {additionalDetails?.allowWaitlist && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Waitlist Enabled</span>
                  </div>
                )}
                {additionalDetails?.maxAttendees && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Info className="h-5 w-5 text-blue-500" />
                    <span>Max Attendees: {additionalDetails.maxAttendees}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Media Gallery */}
            {media && media.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {media.map((item, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={`Gallery ${index}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-black/10">
                          <PlayCircle className="h-12 w-12 text-white opacity-80" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="shadow-xl border-primary/10 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-6">
                  <CardTitle className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      ${basicInfo.priceExact || basicInfo.priceRange}
                    </span>
                    {basicInfo.priceExact && (
                      <span className="text-sm text-muted-foreground font-normal">
                        / person
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {basicInfo.priceExact ? "Fixed Price" : "Price Range"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{basicInfo.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {basicInfo.time}
                          {basicInfo.endDate ? ` - ${basicInfo.endDate}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{basicInfo.location}</p>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs text-primary"
                        >
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </div>

                  {attendeeStats && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-muted-foreground">Going</span>
                            <span className="font-bold">{attendeeStats.going.total}</span>
                          </div>
                          <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="bg-blue-500"
                              style={{
                                width: `${(attendeeStats.going.leaders / (attendeeStats.going.total || 1)) * 100}%`,
                              }}
                              title={`${attendeeStats.going.leaders} Leaders`}
                            />
                            <div
                              className="bg-pink-500"
                              style={{
                                width: `${(attendeeStats.going.followers / (attendeeStats.going.total || 1)) * 100}%`,
                              }}
                              title={`${attendeeStats.going.followers} Followers`}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full bg-blue-500" /> {attendeeStats.going.leaders} Leaders
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full bg-pink-500" /> {attendeeStats.going.followers} Followers
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-muted-foreground">Interested</span>
                          <span className="font-bold">{attendeeStats.interested}</span>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="grid gap-3">
                    <Button size="lg" className="w-full font-semibold">
                      Join Event
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        <Heart className="mr-2 h-4 w-4" /> Interested
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
                  
              </Card>

              {/* Organizer Placeholder */}
              <Card>
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
    </div>
  );
}
