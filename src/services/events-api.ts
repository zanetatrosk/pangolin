import { axiosInstance } from "./axios";
import { DanceEventCreation } from "@/features/newEvent/types";
import { EventDetailData } from "@/features/eventDetail/types";
import { EventItem } from "@/features/eventsList/types";

const EVENT_URL = "/events";
export const getAllEvents = async (): Promise<EventItem[]> => {
    const response = await axiosInstance.get(EVENT_URL);
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
