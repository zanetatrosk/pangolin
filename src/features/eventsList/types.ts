import { RsvpStatus } from "@/services/types";
import { EventMediaItem, Location } from "../newEvent/types";
import { EventStatus } from "../eventDetail/types";

export interface EventItem {
  id: string;
  eventName: string;
  location: Location;
  date: string;
  time: string;
  price?: number;
  currency?: string;
  image: string;
  description?: string;
  attendees?: number;
  interested?: number;
  maxAttendees?: number;
  difficulty?: string;
  tags?: string[];
  organizer: Organizer;
  promoMedia?: EventMediaItem;
  registrationStatus?: RsvpStatus;
  isUserInterested: boolean;
  status: EventStatus;
}

export interface Organizer {
  userId: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface Pageable<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  page: number;
  isLast: boolean;
}