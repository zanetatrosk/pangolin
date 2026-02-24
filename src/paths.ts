export const PATHS = {
  HOME: "/",
  EVENTS: {
    LIST: "/events",
    DETAIL: (id: string | number) => `/events/${id}`,
    NEW_EVENT: "/events/new",
    EDIT_EVENT: (id: string | number) => `/events/${id}/edit`,
    STATS: (id: string | number) => `/events/${id}/stats`,
  },
  STATS: {
    MAIN_EVENT: (id: string | number) => `/stats/main-event/${id}`,
  },
  MY_EVENTS: "/my-events",
  ABOUT: "/about",
  PROFILE: {
    MINE: "/my-profile",
    VIEW: (userId: string | number) => `/profile/${userId}`,
  },
  LOGIN: "/login",
} as const;