import { updateRegistrationStatus } from "@/services/events-api";
import { OrganizerRegistrationActionRequest } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateRegistrationStatusParams {
    eventId: string;
    registrationId: string;
    request: OrganizerRegistrationActionRequest;
}

export const useUpdateRegistrationStatus = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: ({ eventId, registrationId, request }: UpdateRegistrationStatusParams) => 
            updateRegistrationStatus(eventId, registrationId, request),
        onSuccess: (data, variables) => {
            // Invalidate event stats to refresh the registration list
            queryClient.invalidateQueries({ queryKey: ["event-stats", variables.eventId] });
        },
    });

    return mutation;
};
