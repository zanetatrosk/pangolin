import { axiosInstance } from "./axios";
import { DanceEventCreation } from "@/features/newEvent/types";
import { EventDetailData } from "@/features/eventDetail/types";
import { EventItem, Pageable } from "@/features/eventsList/types";
import { SearchProps } from "@/routes/events.index";
import { convertSearchParamsToQuery } from "@/features/eventsList/utils/parseSearchParams";

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
