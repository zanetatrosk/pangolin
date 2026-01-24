export interface CodebookItem {
    id: string;
    name: string;
}

export enum RsvpStatus {
    Interested = "interested",
    Going = "going",
    Waitlisted = "waitlisted",
}

export interface RsvpResponse extends RsvpData {
    createdAt?: string;
    updatedAt?: string;
}

export interface RsvpData {
    eventId: string;
    userId: string;
    status?: RsvpStatus;
    paid?: boolean;
}

export interface EventStatusResponse {
    id: string;
    status: string | null;
    message: string;
}