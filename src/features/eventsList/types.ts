import { EventMediaItem } from "../newEvent/types";

export interface EventItem {
  id: number;
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
  organizer?: string;
  promoMedia?: EventMediaItem;
}