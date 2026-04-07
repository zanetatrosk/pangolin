import { useQuery } from "@tanstack/react-query";
import { getEventRegistrations } from "@/services/registrations-api";
import { RegistrationModeEnum } from "@/features/eventDetail/publish-actions/PublishEventOptions";

export const useEventRegistrations = (
  eventId: string,
  registrationMode: RegistrationModeEnum,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["eventRegistrations", eventId],
    queryFn: () => getEventRegistrations(eventId, registrationMode),
    enabled,
  });
};
