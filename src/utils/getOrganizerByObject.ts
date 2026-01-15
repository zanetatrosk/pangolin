import { Organizer } from "@/features/eventsList/types";

export const getOrganizerByObject = (organizer: Organizer): string => {
    if (!organizer.firstName || !organizer.lastName) {
        return `@${organizer.username}`;
    }
  return `${organizer.firstName} ${organizer.lastName}`;
};
