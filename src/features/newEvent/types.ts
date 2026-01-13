export interface Location {
  name: string;
  street: string;
  city: string;
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
}

export interface BasicCreateDetailsData extends BasicData {
  location: Location;
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
    basicInfo: BasicCreateDetailsData;
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