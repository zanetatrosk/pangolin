import { createOrUpdateRegistration } from "@/services/registrations-api";
import { RegisterEventRequest } from "@/services/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpdateRsvp = () => {
    const mutation = useMutation({
        mutationFn: ({ eventId, ...request }: RegisterEventRequest & { eventId: string }) => 
            createOrUpdateRegistration(eventId, request)
    });

    return mutation;
}