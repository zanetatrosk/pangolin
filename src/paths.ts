export const PATHS = {
  HOME: "/",
  EVENTS: {
    LIST: "/events",
    DETAIL: (id: string | number) => `/events/${id}`,
    NEW_EVENT: "/events/new",
    EDIT_EVENT: (id: string | number) => `/events/${id}/edit`,
    STATS: (id: string | number) => `/events/${id}/stats`,
  },
  MY_EVENTS: "/my-events",
  ABOUT: "/about",
} as const;