import { OrganizerAction } from "@/features/eventStats/types";

export interface CodebookItem {
    id: string;
    name: string;
}

export enum RsvpStatus {
    Interested = "INTERESTED",
    Going = "GOING",
    Waitlisted = "WAITLISTED",
    NotGoing = "NOT_GOING",
    Pending = "PENDING",
    Rejected = "REJECTED",
}

export interface RsvpResponse extends RsvpData {
    createdAt?: string;
    updatedAt?: string;
}

export interface RsvpData {
    eventId: string;
    userId?: string;
    status?: RsvpStatus;
    paid?: boolean;
    roleId?: string;
}

export interface EventStatusResponse {
    id: string;
    status: string | null;
    message: string;
}


export interface OrganizerRegistrationActionRequest {
    action: OrganizerAction;
}

export interface EventRegistration {
    id: string;
    eventId: string;
    userId: string;
    status: RsvpStatus;
    paid: boolean;
    roleId?: string;
    createdAt: string;
    updatedAt: string;
}