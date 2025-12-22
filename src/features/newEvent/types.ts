interface RecurringDate {
  date: string;
  id: string;
}

export interface BasicDetailsData {
  eventName: string;
  location: string;
  date: string;
  time: string;
  isRecurring: boolean;
  endDate?: string;
  priceRange: string;
  priceExact?: string;
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
    coverImage?: File;
    media?: EventMediaItem[];
}

export type EventMediaItem = {
  type: "image" | "video"
  url: string
}