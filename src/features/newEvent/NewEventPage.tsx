import { useMutation } from "@tanstack/react-query";
import { FormParent } from "./FormParent";
import { postNewEvent } from "@/services/events-api";
import { eventFormOpts } from "./FormOptions";
import { useNavigate } from "node_modules/@tanstack/react-router/dist/esm/useNavigate";
import { PATHS } from "@/paths";

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
