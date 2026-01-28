export const isUserOrganizer = (organizerId: string, userId?: string): boolean => {
    return userId === organizerId;
}