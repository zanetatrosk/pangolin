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
  attendeeStats?: AttendeeStats;
  facebookEventUrl?: string;
}