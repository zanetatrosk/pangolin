import { updateRegistrationStatus } from "@/services/registrations-api";
import { RegistrationAction } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CancelRegistrationParams {
    eventId: string;
    registrationId: string;
}

/**
 * Hook for users to cancel their own registration
 */
export const useCancelRegistration = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: ({ eventId, registrationId }: CancelRegistrationParams) => 
            updateRegistrationStatus(eventId, { 
                action: RegistrationAction.CANCEL,
                registrations: [registrationId],
            }),
        onSuccess: (data, variables) => {
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["event-stats", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["event", variables.eventId] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return mutation;
};
