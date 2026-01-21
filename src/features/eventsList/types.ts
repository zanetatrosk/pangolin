import { RsvpStatus } from "@/services/types";
import { EventMediaItem } from "../newEvent/types";

export interface EventItem {
  id: string;
  eventName: string;
  address: string;
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
}

export interface Organizer {
  userId: number;
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