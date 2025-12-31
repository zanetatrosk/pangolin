import { axiosInstance } from "./axios";
import { CodebookItem } from "./types";

const EVENT_TYPES_URL = "/event-types";
export const getEventTypes = async (): Promise<CodebookItem[]> => {
    const response = await axiosInstance.get(EVENT_TYPES_URL);
    return response.data;
}     