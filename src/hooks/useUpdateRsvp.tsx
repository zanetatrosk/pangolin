import { createOrUpdateRegistration } from "@/services/registrations-api";
import { RegisterEventRequest } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRsvp = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: ({ eventId, ...request }: RegisterEventRequest & { eventId: string }) => 
            createOrUpdateRegistration(eventId, request),
        onSuccess: async () => {
            // Invalidate relevant queries to refresh data
            await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["event"] }),
            queryClient.invalidateQueries({ queryKey: ["myRegistrations"] }),
            queryClient.invalidateQueries({ queryKey: ["events"] })
            ])
        },
    });

    return mutation;
}