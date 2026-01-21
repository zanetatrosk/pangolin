import { RsvpStatus } from "@/services/types";
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
  status?: "Scheduled" | "Cancelled" | "Past";
  statusUser?: RsvpStatus ;
}

interface RecurringDate {
  date: string;
  id: string;
}

export interface EventDetailData extends Omit<DanceEventCreation, "basicInfo"> {
  id: string;
  basicInfo: BasicDetailsData;
  attendeeStats?: AttendeeStats;
  facebookEventUrl?: string;
  
}