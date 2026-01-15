import { Organizer } from "../eventsList/types";
import { BasicData, DanceEventCreation } from "../newEvent/types";

export interface AttendeeStats {
  going: {
    total: number;
    leaders: number;
    followers: number;
  };
  interested: number;
}

export interface BasicDetailsData extends BasicData {
  recurringDates?: RecurringDate[];
  organizer: Organizer;
  address: string;
}

interface RecurringDate {
  date: string;
  id: string;
  status?: "Scheduled" | "Cancelled" | "Past";
  statusUser?: "Joined";
}

export interface EventDetailData extends Omit<DanceEventCreation, "basicInfo"> {
  id: number;
  basicInfo: BasicDetailsData;
  attendeeStats?: AttendeeStats;
  facebookEventUrl?: string;
  status?: "Scheduled" | "Cancelled" | "Past";
  statusUser?: "Joined" ;
}