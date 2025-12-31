import { EventItem } from "@/features/eventsList/components/EventCard";
import { axiosInstance } from "./axios";
import { DanceEventCreation } from "@/features/newEvent/types";

const EVENT_URL = "/events";
export const getAllEvents = async (): Promise<EventItem[]> => {
    const response = await axiosInstance.get(EVENT_URL);
    return response.data;
}

export const postNewEvent = async (eventData: DanceEventCreation): Promise<any> => {
    const response = await axiosInstance.post(EVENT_URL, eventData);
    return response.data;
}
