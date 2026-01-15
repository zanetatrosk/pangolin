export const isUserOrganizer = (userId: string, organizerId: string): boolean => {
    return userId === organizerId;
}