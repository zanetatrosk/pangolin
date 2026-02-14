import { axiosInstance } from "./axios";
import { DanceEventCreation } from "@/features/newEvent/types";
import { EventDetailData } from "@/features/eventDetail/types";
import { EventItem, Pageable } from "@/features/eventsList/types";
import { SearchProps } from "@/routes/events.index";
import { convertSearchParamsToQuery } from "@/features/eventsList/utils/parseSearchParams";
import { RsvpData, RsvpResponse, EventStatusResponse, OrganizerRegistrationActionRequest, EventRegistration } from "./types";
import { PublishPayload } from "@/features/eventDetail/publish-actions/PublishEventOptions";
import { EventStatsData } from "@/features/eventStats/EventStats";


const EVENT_URL = "/events";

export const getAllEvents = async (page: number, searchParams?: SearchProps, size: number = 10): Promise<Pageable<EventItem>>  => {
    console.log(searchParams);
    const response = await axiosInstance.get(`${EVENT_URL}?page=${page}&size=${size}` + convertSearchParamsToQuery(searchParams));
    return response.data;
}

export const postNewEvent = async (eventData: DanceEventCreation): Promise<any> => {
    const response = await axiosInstance.post(EVENT_URL, eventData);
    return response.data;
}

export const getEventById = async (id: string): Promise<EventDetailData> => {
    const response = await axiosInstance.get(`${EVENT_URL}/${id}`);
    return response.data;
}

export const updateEventById = async (id: string, eventData: DanceEventCreation): Promise<any> => {
    const response = await axiosInstance.put(`${EVENT_URL}/${id}`, eventData);
    return response.data;
}

export const getMyRsvp = async (eventId: string): Promise<RsvpResponse> => {
    const response = await axiosInstance.get(`${EVENT_URL}/${eventId}/my-rsvp`);
    return response.data;
};

export const createOrUpdateRsvp = async (eventId: string, rsvpData: RsvpData): Promise<RsvpResponse> => {
    const response = await axiosInstance.put(`${EVENT_URL}/${eventId}/my-rsvp`, rsvpData);
    return response.data;
};

export const deleteRsvp = async (eventId: string): Promise<void> => {
    await axiosInstance.delete(`${EVENT_URL}/${eventId}/my-rsvp`);
};

export const publishEvent = async (eventId: string, payload: PublishPayload): Promise<EventStatusResponse> => {
    const response = await axiosInstance.patch(`${EVENT_URL}/${eventId}/publish`, payload);
    return response.data;
};

export const cancelEvent = async (eventId: string): Promise<EventStatusResponse> => {
    const response = await axiosInstance.patch(`${EVENT_URL}/${eventId}/cancel`);
    return response.data;
};

export const deleteEvent = async (eventId: string): Promise<void> => {
    await axiosInstance.delete(`${EVENT_URL}/${eventId}`);
};

export const getEventStats = async (eventId: string): Promise<EventStatsData> => {
    const response = await axiosInstance.get(`${EVENT_URL}/${eventId}/stats`);
    return response.data;
}

export const syncRegisterations = async (eventId: string): Promise<void> => {
    await axiosInstance.post(`${EVENT_URL}/${eventId}/sync-registrations`);
}

export const updateRegistrationStatus = async (
    eventId: string,
    registrationId: string,
    request: OrganizerRegistrationActionRequest
): Promise<EventRegistration> => {
    const response = await axiosInstance.patch(
        `${EVENT_URL}/${eventId}/registrations/${registrationId}`,
        request
    );
    return response.data;
};

