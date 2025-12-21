export const PATHS = {
  HOME: "/",
  EVENTS: {
    LIST: "/events",
    DETAIL: (id: string | number) => `/events/${id}`,
    NEW_EVENT: "/events/new",
  },
  MY_EVENTS: "/my-events",
  ABOUT: "/about",
} as const;