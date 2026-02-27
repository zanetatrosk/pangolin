import { CodebookItem, RsvpStatus } from "@/services/types";
import { Organizer } from "../eventsList/types";
import {
  AdditionalDetailsDataBase,
  BasicData,
  DanceEventCreation,
} from "../newEvent/types";
import { RegistrationModeEnum } from "./publish-actions/PublishEventOptions";

export interface AttendeeStats {
  going: {
    total: number;
    leaders: number;
    followers: number;
    both: number; // Users doing role rotation (both leader and follower)
  };
  interested: number;
}

export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
  PAST = "PAST",
}
export interface BasicDetailsData extends BasicData {
  recurringDates?: RecurringDate[];
  organizer: Organizer;
  status: EventStatus;
  registrationStatus?: {
    id: string;
    status: RsvpStatus;
  };
  registrationType: RegistrationModeEnum;
  formId?: string;
}

export interface RecurringDate {
  date: string;
  id: string;
}

export interface AdditionalDetailsData extends AdditionalDetailsDataBase {
  danceStyles: CodebookItem[];
  skillLevel: CodebookItem[];
  typeOfEvent: CodebookItem[];
}

export interface EventDetailData extends Omit<
  DanceEventCreation,
  "basicInfo" | "additionalDetails"
> {
  id: string;
  basicInfo: BasicDetailsData;
  additionalDetails?: AdditionalDetailsData;
  attendeeStats?: AttendeeStats;
  facebookEventUrl?: string;
}
