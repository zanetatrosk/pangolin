import { useMutation } from "@tanstack/react-query";
import { FormParent } from "./FormParent";
import { postNewEvent } from "@/services/events-api";
import { eventFormOpts } from "./FormOptions";
import { PATHS } from "@/paths";
import { useNavigate } from "@tanstack/react-router";

export function NewEventPage() {
  const navigate = useNavigate();
  const eventMutation = useMutation({
    mutationFn: postNewEvent,
    onSuccess: (data) => {
      console.log("Event created successfully:", data);
      navigate({ to: PATHS.EVENTS.DETAIL(data.events[0]) });
    },
    onError: (error) => {
      console.error("Error creating event:", error);
    },
  });

  return (
      <FormParent eventFormOpts={eventFormOpts} eventMutation={eventMutation} isEditing={false} />
  );
}
