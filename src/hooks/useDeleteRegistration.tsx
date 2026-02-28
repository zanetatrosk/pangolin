import { deleteRegistration } from "@/services/registrations-api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRegistration = (eventId: string) => {
    const mutation = useMutation({
        mutationFn: (registrationId: string) => deleteRegistration(eventId, registrationId),
    });

    return mutation;
}