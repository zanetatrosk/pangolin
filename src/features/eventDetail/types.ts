import { DanceEventCreation } from "../newEvent/types";

export interface AttendeeStats {
  going: {
    total: number;
    leaders: number;
    followers: number;
  };
  interested: number;
}

export interface EventDetailData extends DanceEventCreation{
  id: number;
  attendeeStats?: AttendeeStats;
  facebookEventUrl?: string;
  status?: "Scheduled" | "Cancelled" | "Past";
  statusUser?: "Joined" ;
}