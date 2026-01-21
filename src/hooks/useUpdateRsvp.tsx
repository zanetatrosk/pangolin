import { createOrUpdateRsvp } from "@/services/events-api";
import { RsvpData } from "@/services/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpdateRsvp = () => {
    const mutation = useMutation({
        mutationFn: (rsvpData: RsvpData) => createOrUpdateRsvp(rsvpData.eventId, rsvpData)
    });

    return mutation;
}