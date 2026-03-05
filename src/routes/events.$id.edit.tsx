import { EventDetailData } from "@/features/eventDetail/types";
import { FormParent } from "@/features/newEvent/FormParent";
import { DanceEventCreation } from "@/features/newEvent/types";
import { PATHS } from "@/paths";
import { getEventById, updateEventById } from "@/services/events-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { authStore, selectIsAuthenticated } from "@/stores/authStore";

export const Route = createFileRoute("/events/$id/edit")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = selectIsAuthenticated(authStore.state);
    
    if (!isAuthenticated) {
      throw redirect({
        to: PATHS.LOGIN,
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

const eventDetailDataToDanceEventCreation = (
  event: EventDetailData,
): DanceEventCreation => {
  return {
    basicInfo: {
      eventName: event.basicInfo?.eventName || "",
      location: event.basicInfo?.location || {
        name: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        houseNumber: "",
        country: "",
        county: "",
      },
      date: event.basicInfo?.date || "",
      time: event.basicInfo?.time || "",
      endDate: event.basicInfo?.endDate || "",
      price: event.basicInfo?.price || undefined,
      currency: event.basicInfo?.currency || undefined,
      isRecurring: false,
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
  if (!event) {
    return null;
  }

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

  const eventFormOpts = {
    defaultValues: eventDetailDataToDanceEventCreation(event),
  };

  return (
    <>
      <FormParent eventFormOpts={eventFormOpts} eventMutation={eventMutation} isEditing={true} />
    </>
  );
}
