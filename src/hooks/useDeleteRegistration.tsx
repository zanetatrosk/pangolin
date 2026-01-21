import { deleteRsvp } from "@/services/events-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRegistration = (eventId: string) => {
    const mutation = useMutation({
        mutationFn: () => deleteRsvp(eventId),
    });

    return mutation;
}