import { updateRegistrationStatus } from "@/services/registrations-api";
import { RegistrationActionRequest } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateRegistrationStatusParams {
    eventId: string;
    registrationId: string;
    request: RegistrationActionRequest;
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
