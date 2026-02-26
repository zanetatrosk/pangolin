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
    Cancelled = "CANCELLED",
}

// Alias for backward compatibility
export type RegistrationStatus = RsvpStatus;

export interface RsvpResponse extends RsvpData {
    createdAt?: string;
    updatedAt?: string;
}

/**
 * User's registration status for an event
 */
export interface UserRegistrationStatus {
    id: string;
    status: RsvpStatus;
}

export interface RsvpData {
    id?: string; // Registration ID (for updates/deletes)
    eventId: string;
    userId?: string;
    status?: RsvpStatus;
    paid?: boolean;
    roleId?: string;
}

/**
 * Request body for event registration
 */
export interface RegisterEventRequest {
    status: RsvpStatus;
    roleId?: string;
    email?: string;
}

/**
 * Registration action types for PATCH endpoint
 */
export enum RegistrationAction {
    APPROVE = "APPROVE",
    REJECT = "REJECT",
    CANCEL = "CANCEL",
}

/**
 * Request body for registration actions
 */
export interface RegistrationActionRequest {
    action: RegistrationAction;
}

export interface EventStatusResponse {
    id: string;
    status: string | null;
    message: string;
}

/**
 * @deprecated Use RegistrationActionRequest instead
 * Kept for backward compatibility
 */
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