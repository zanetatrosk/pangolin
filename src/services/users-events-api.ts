import { axiosInstance } from "./axios";
import { MyEvent } from "@/features/myEvents/types";

export enum userEventFilter {
  HOSTING = "HOSTING",
  INTERESTED = "INTERESTED",
  GOING = "JOINED",
}

const USER_EVENTS_URL = "/users/{userId}/events";
export const getUsersEvents = async (
  userId: string,
  filter: userEventFilter,
): Promise<MyEvent[]> => {
  const url = USER_EVENTS_URL.replace("{userId}", userId) + `?filter=${filter}`;
  const response = await axiosInstance.get<MyEvent[]>(url);
  return response.data;
};
