export interface Location {
  name: string;
  street: string;
  city: string;
  county?: string;
  state: string;
  country: string;
  postalCode: string;
  houseNumber?: string;
}

export interface BasicData {
  eventName: string;
  date: string;
  time: string;
  endDate?: string;
  price?: number;
  currency?: string;
  location: Location;
  isRecurring: boolean;
  recurrenceType?: RecurrenceType;
}

export interface AdditionalDetailsDataBase {
  maxAttendees?: number;
  allowWaitlist: boolean;
  allowPartnerPairing: boolean;
}

export interface AdditionalDetailsDataCreation extends AdditionalDetailsDataBase {
  danceStyles: string[];
  skillLevel: string[];
  typeOfEvent: string[];
}

export interface DanceEventCreation {
  basicInfo: BasicData;
  additionalDetails?: AdditionalDetailsDataCreation;
  description?: string;
  coverImage?: EventMediaItem;
  media?: EventMediaItem[];
}

export type EventMediaItem = {
  type: "image" | "video";
  url: string;
  id: string;
};

export enum RecurrenceType {
  Daily = "DAILY",
  Weekly = "WEEKLY",
  Monthly = "MONTHLY",
}