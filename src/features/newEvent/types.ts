
interface RecurringDate {
  date: string;
  id: string;
  status?: "Scheduled" | "Cancelled" | "Past";
  statusUser?: "Joined";
}
export interface Location {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  houseNumber?: string;
}

export interface BasicDetailsData {
  eventName: string;
  location: Location;
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