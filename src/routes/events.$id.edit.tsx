import { EventDetailData } from "@/features/eventDetail/types";
import { FormParent } from "@/features/newEvent/FormParent";
import { eventFormOpts } from "@/features/newEvent/FormOptions";
import { DanceEventCreation } from "@/features/newEvent/types";
import { PATHS } from "@/paths";
import { getEventById, updateEventById } from "@/services/events-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/events/$id/edit")({
  beforeLoad: requireAuth,
  component: RouteComponent,
  ssr: false,
});

const eventDetailDataToDanceEventCreation = (
  event: EventDetailData,
): DanceEventCreation => {
  return {
    basicInfo: {
      eventName: event.basicInfo?.eventName || "",
      location: {
        name: event.basicInfo?.location.name || "",
        street: event.basicInfo?.location.street || "",
        city: event.basicInfo?.location.city || "",
        state: event.basicInfo?.location.state || "",
        postalCode: event.basicInfo?.location.postalCode || "",
        houseNumber: event.basicInfo?.location.houseNumber || "",
        country: event.basicInfo?.location.country || "",
        county: event.basicInfo?.location.county || "",
      },
      date: event.basicInfo?.date || "",
      time: event.basicInfo?.time || "",
      endDate: event.basicInfo?.endDate || "",
      price: event.basicInfo?.price ?? undefined,
      currency: event.basicInfo?.currency || undefined,
      isRecurring: false,
      recurrenceType: undefined,
      recurrenceEndDate: null,
    },
    additionalDetails: {
      danceStyles:
        event.additionalDetails?.danceStyles.map((ds) => ds.id) || [],
      skillLevel: event.additionalDetails?.skillLevel.map((sl) => sl.id) || [],
      typeOfEvent:
        event.additionalDetails?.typeOfEvent.map((te) => te.id) || [],
      maxAttendees: event.additionalDetails?.maxAttendees || undefined,
      allowWaitlist: event.additionalDetails?.allowWaitlist || false,
      allowPartnerPairing:
        event.additionalDetails?.allowPartnerPairing || false,
        facebookEventUrl: event.facebookEventUrl || undefined,
    },
    description: event.description || "",
    coverImage: event.coverImage || undefined,
    media: event.media || [],
  };
};

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: event } = useQuery<EventDetailData>({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });
  const eventMutation = useMutation({
    mutationFn: (data: DanceEventCreation) => updateEventById(id, data),
    onSuccess: (data) => {
      console.log("Event updated successfully:", data);
      navigate({ to: PATHS.EVENTS.DETAIL(data.events[0]) });
    },
    onError: (error) => {
      console.error("Error updating event:", error);
    },
  });

  if (!event) {
    return null;
  }

  const editEventFormOpts = {
    ...eventFormOpts,
    defaultValues: eventDetailDataToDanceEventCreation(event),
  };

  return (
    <>
      <FormParent eventFormOpts={editEventFormOpts} eventMutation={eventMutation} isEditing={true} />
    </>
  );
}
