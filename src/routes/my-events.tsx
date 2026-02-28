import { createFileRoute, redirect } from "@tanstack/react-router";
import { MyEventsPage } from "@/features/myEvents/MyEventsPage";
import { authStore, selectIsAuthenticated } from "@/stores/authStore";
import { PATHS } from "@/paths";

export const Route = createFileRoute("/my-events")({
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
  component: MyEventsPage,
});
