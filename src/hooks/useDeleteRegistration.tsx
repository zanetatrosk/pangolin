import { deleteRegistration } from "@/services/registrations-api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRegistration = (eventId: string, registrationId: string) => {
    const mutation = useMutation({
        mutationFn: () => deleteRegistration(eventId, registrationId),
    });

    return mutation;
}