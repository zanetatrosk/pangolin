import { createFileRoute, redirect } from "@tanstack/react-router";
import { NewEventPage } from "@/features/newEvent/NewEventPage";
import { authStore, selectIsAuthenticated } from "@/stores/authStore";
import { PATHS } from "@/paths";

export const Route = createFileRoute("/events/new")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = selectIsAuthenticated(authStore.state);
    
    if (!isAuthenticated) {
      throw redirect({
        to: PATHS.LOGIN,
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: NewEventPage,
});
