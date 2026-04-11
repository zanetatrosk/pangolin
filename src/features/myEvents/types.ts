import { CodebookItem, RsvpStatus } from "@/services/types";
import { AttendeeStats, EventStatus } from "../eventDetail/types";
import { Organizer } from "../eventsList/types";
import { Location } from "../newEvent/types";

export interface MyEventBase {
    displayMode: 'SINGLE' | 'SERIES';
    eventName: string; 
    organizer: Organizer;
    status: EventStatus; 
    userStatus?: RsvpStatus; // User's RSVP status
    id: string;
}

// Single event instance (matches SingleEventDTO from backend)
export interface SingleEventDTO extends MyEventBase {
    displayMode: 'SINGLE';
    date: string;
    time: string;
    location: Location;
    attendeeStats: AttendeeStats;
    role?: CodebookItem;
}

// Series/recurring event (matches SeriesEventDTO from backend)
export interface SeriesEventDTO extends MyEventBase {
    displayMode: 'SERIES';
    overallStartDate: string;
    overallEndDate: string;
    occurrences: SingleEventDTO[];
}

// Union type matching backend's DanceEventResponse
export type MyEvent = SingleEventDTO | SeriesEventDTO;

// Type guard to check if event is a series
export const isSeriesEvent = (event: MyEvent): event is SeriesEventDTO => {
    return event.displayMode === 'SERIES';
};

// Type guard to check if event is a single event
export const isSingleEvent = (event: MyEvent): event is SingleEventDTO => {
    return event.displayMode === 'SINGLE';
};