import { axiosInstance } from "./axios";
import { EventRegistration, RegistrationActionRequest, RegisterEventRequest } from "./types";

const EVENTS_URL = "/events";

/**
 * Create or update user's registration for an event
 * PUT /api/events/{eventId}/registrations
 */
export const createOrUpdateRegistration = async (
    eventId: string,
    request: RegisterEventRequest
): Promise<EventRegistration> => {
    const response = await axiosInstance.put(
        `${EVENTS_URL}/${eventId}/registrations`,
        request
    );
    return response.data;
};

/**
 * Delete a registration by registration ID
 * DELETE /api/events/{eventId}/registrations/{registrationId}
 */
export const deleteRegistration = async (
    eventId: string,
    registrationId: string
): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(
        `${EVENTS_URL}/${eventId}/registrations/${registrationId}`
    );
    return response.data;
};

/**
 * Sync event's Google Form registration data
 * POST /api/events/{eventId}/registrations/synchronization
 */
export const syncRegistrations = async (eventId: string): Promise<{ message: string; eventId: string }> => {
    const response = await axiosInstance.post(
        `${EVENTS_URL}/${eventId}/registrations/synchronization`
    );
    return response.data;
};

/**
 * Update registration status (approve/reject/cancel)
 * PATCH /api/events/{eventId}/registrations/{registrationId}
 */
export const updateRegistrationStatus = async (
    eventId: string,
    registrationId: string,
    request: RegistrationActionRequest
): Promise<EventRegistration> => {
    const response = await axiosInstance.patch(
        `${EVENTS_URL}/${eventId}/registrations/${registrationId}`,
        request
    );
    return response.data;
};
