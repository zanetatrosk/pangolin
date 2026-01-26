import { HeroInformations } from "./components/HeroInformations";
import { CoverImage } from "./components/CoverImage";
import { ActionButtons } from "./components/ActionButtons";
import { Description } from "./components/Description";
import { MediaGallery } from "./components/MediaGallery";
import { Details } from "./components/Details";
import { OrganizerCard } from "./components/OrganizerCard";
import { AttendeeStatsCard } from "./components/AttendiesCard";
import { EventDetailData, EventStatus } from "./types";
import { useUser } from "@/hooks/useUser";
import { EventItemManageButtons } from "./components/EventItemManageButtons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

interface EventDetailProps {
  event: EventDetailData;
}

export function EventDetail({ event }: EventDetailProps) {
  const { user } = useUser();

  const {
    basicInfo,
    additionalDetails,
    description,
    coverImage,
    media,
    attendeeStats,
    facebookEventUrl,
  } = event;

  const isCancelled = basicInfo.status === EventStatus.CANCELLED;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero / Cover Image */}
      <div className="relative w-full md:h-96 flex flex-col md:block bg-muted">
        <CoverImage coverImage={coverImage} eventName={basicInfo.eventName} isCancelled={isCancelled} />
        <HeroInformations
          basicInfo={basicInfo}
          facebookEventUrl={facebookEventUrl}
        />
      </div>

      {/* Cancelled Event Banner */}
      {isCancelled && (
        <div className="container mx-auto max-w-6xl px-4 lg:px-0 mt-2 mb-6">
          <Alert variant="destructive" className="border-2">
            <XCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold">Event Cancelled !!!</AlertTitle>
            <AlertDescription className="text-base">
              This event has been cancelled by the organizer. If you were registered, you may have been notified via email.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container mx-auto max-w-6xl py-2 px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="contents lg:block lg:col-span-2 lg:space-y-8">
            {/* Action Buttons */}
            <div className="order-1">
              {user.userId === basicInfo.organizer.userId ? (
                // Organizer view
                <EventItemManageButtons eventId={event.id} eventStatus={basicInfo.status || ""}/>
              ) : (
                <ActionButtons
                  key={event.id + event.basicInfo.statusUser}
                  rsvpData={{
                    eventId: event.id,
                    userId: "", // Replace with actual user ID
                    status: event.basicInfo.statusUser,
                  }}
                />)
              }
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
              <OrganizerCard organizer={basicInfo.organizer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
