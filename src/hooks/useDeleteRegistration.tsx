import { deleteRegistration } from "@/services/registrations-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRegistration = (eventId: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (registrationId: string) => deleteRegistration(eventId, registrationId),
        onSuccess: async () => {
            // Invalidate relevant queries to refresh data
            await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["event", eventId] }),
            queryClient.invalidateQueries({ queryKey: ["myRegistrations"] }),
            queryClient.invalidateQueries({ queryKey: ["events"] })
            ])
        },
    });

    return mutation;
}