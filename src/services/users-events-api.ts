import { axiosInstance } from "./axios";
import { MyEvent } from "@/features/myEvents/types";
import { Pageable } from "@/features/eventsList/types";

export enum userEventFilter {
  HOSTING = "HOSTING",
  INTERESTED = "INTERESTED",
  GOING = "JOINED",
}

export enum EventTimeline {
  UPCOMING = "UPCOMING",
  PAST = "PAST",
}

const USER_EVENTS_URL = "/users/{userId}/events";
export const getUsersEvents = async (
  userId: string,
  {
    filter,
    timeline,
    page = 0,
    size = 10,
  }: {
    filter: userEventFilter;
    timeline?: EventTimeline;
    page?: number;
    size?: number;
  },
): Promise<Pageable<MyEvent>> => {
  const baseUrl = USER_EVENTS_URL.replace("{userId}", userId);

  const params = new URLSearchParams({
    filter,
    page: String(page),
    size: String(size),
  });
  if (timeline) {
    params.set("timeline", timeline);
  }

  const url = `${baseUrl}?${params.toString()}`;
  const response = await axiosInstance.get<Pageable<MyEvent>>(url);
  return response.data;
};
