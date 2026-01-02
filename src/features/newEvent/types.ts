
interface RecurringDate {
  date: string;
  id: string;
  status?: "Scheduled" | "Cancelled" | "Past";
  statusUser?: "Joined";
}

export interface BasicDetailsData {
  eventName: string;
  address: string;
  date: string;
  time: string;
  isRecurring: boolean;
  endDate?: string;
  price?: number;
  currency?: string;
  recurringDates?: RecurringDate[];
}

export interface AdditionalDetailsData {
    danceStyles: string[];
    skillLevel: string[];
    typeOfEvent: string[];
    maxAttendees?: number;
    allowWaitlist: boolean;
    allowPartnerPairing: boolean;
}

export interface DanceEventCreation {
    basicInfo: BasicDetailsData;
    additionalDetails?: AdditionalDetailsData;
    description?: string;
    coverImage?: EventMediaItem;
    media?: EventMediaItem[];
}

export type EventMediaItem = {
  type: "image" | "video"
  url: string
  id: string
}