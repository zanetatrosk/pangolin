import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";

export interface Registration {
  registrationId: string;
  user: {
    userId: string;
    name: string;
    avatar?: string;
  } | null;
  level?: string | null;
  role?: string | null;
}

export interface Attendee {
  id: string;
  name: string;
  userId?: string;
  role?: "Leader" | "Follower" | "Both" | undefined;
  avatar?: string;
  level?: string | null;
}

/**
 * Preprocesses raw registration data into attendee objects for display
 * @param registrations - Array of raw registration data from API
 * @param registrationMode - The registration mode of the event (COUPLE, OPEN, GOOGLE_FORM)
 * @returns Array of processed attendee objects ready for display
 */
export function preprocessAttendees(
  registrations: Registration[],
  registrationMode: RegistrationModeEnum
): Attendee[] {
  const isCoupleMode = registrationMode === RegistrationModeEnum.COUPLE;

  return registrations.map((reg, index) => {
    const user = reg.user;
    const name = user 
      ? `${user.name}` 
      : `Anonymous Guest ${index + 1}`;
    const avatar = user?.avatar;
    
    let attendeeRole: "Leader" | "Follower" | "Both" | undefined = undefined;
    
    if (isCoupleMode && reg.role) {
      const roleLower = reg.role.toLowerCase();
      if (roleLower === "leader") {
        attendeeRole = "Leader";
      } else if (roleLower === "follower") {
        attendeeRole = "Follower";
      } else if (roleLower === "both") {
        attendeeRole = "Both";
      }
    }

    return {
      id: reg.registrationId,
      name,
      role: attendeeRole,
      avatar,
      level: reg.level,
      userId: reg.user?.userId,
    };
  });
}
