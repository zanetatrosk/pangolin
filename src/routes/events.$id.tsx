import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AttendeeStatsCard } from "@/features/events/components/AttendiesCard";
import { DanceEventCreation } from "@/features/newEvent/types";
import { CoverImage } from "@/features/events/components/CoverImage";
import { HeroInformations } from "@/features/events/components/HeroInformations";
import { Details } from "@/features/events/components/Details";
import { OrganizerCard } from "@/features/events/components/OrganizerCard";
import { MediaGallery } from "@/features/events/components/MediaGallery";
import { Description } from "@/features/events/components/Description";
import { ActionButtons } from "@/features/events/components/ActionButtons";
import { MOCK_EVENT } from "@/mocks/EventDetail";

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

function RouteComponent() {
  const { id } = Route.useParams();
  const { t } = useTranslation();
  const event = MOCK_EVENT; // In a real app, fetch this data using the ID

  const {
    basicInfo,
    additionalDetails,
    description,
    coverImage,
    media,
    attendeeStats,
    facebookEventUrl,
  } = event;

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
            <ActionButtons />

            {/* Description */}
            <Description description={description} />

            {/* Media Gallery */}
            <MediaGallery mediaFiles={media} />
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
            <Details additionalDetails={additionalDetails} />

            {/* Organizer Card */}
            <OrganizerCard organizerName={"John Doe"} />
          </div>
        </div>
      </div>
    </div>
  );
}
