import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { HeroInformations } from "@/features/eventDetail/components/HeroInformations";
import { CoverImage } from "@/features/eventDetail/components/CoverImage";
import { ActionButtons } from "@/features/eventDetail/components/ActionButtons";
import { Description } from "@/features/eventDetail/components/Description";
import { MediaGallery } from "@/features/eventDetail/components/MediaGallery";
import { Details } from "@/features/eventDetail/components/Details";
import { OrganizerCard } from "@/features/eventDetail/components/OrganizerCard";

import { MOCK_EVENT } from "@/mocks/eventDetail";
import { AttendeeStatsCard } from "@/features/eventDetail/components/AttendiesCard";

export const Route = createFileRoute("/events/$id")({
  component: RouteComponent,
});

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
          <HeroInformations basicInfo={basicInfo} facebookEventUrl={facebookEventUrl} />
      </div>

      <div className="container mx-auto max-w-6xl py-2 px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="contents lg:block lg:col-span-2 lg:space-y-8">
            {/* Action Buttons */}
            <div className="order-1">
              <ActionButtons />
            </div>

            {/* Description */}
            <div className="order-3">
              <Description description={description} />
            </div>

            {/* Media Gallery */}
            <div className="order-4">
              <MediaGallery mediaFiles={media} />
            </div>
          </div>

          {/* Right Column: Sidebar Details */}
          <div className="contents lg:block lg:space-y-6">
            {/* Attendee Stats Card */}
            {attendeeStats && (
              <div className="order-2">
                <AttendeeStatsCard attendeeStats={attendeeStats} />
              </div>
            )}

            {/* Details */}
            <div className="order-5">
              <Details additionalDetails={additionalDetails} />
            </div>

            {/* Organizer Card */}
            <div className="order-6">
              <OrganizerCard organizerName={"John Doe"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}