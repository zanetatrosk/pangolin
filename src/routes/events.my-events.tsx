import { createFileRoute, redirect } from "@tanstack/react-router";
import { MyEventsPage } from "@/features/myEvents/MyEventsPage";
import { authStore } from "@/stores/authStore";

export const Route = createFileRoute("/events/my-events")({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated } = authStore.state;
    
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: MyEventsPage,
});
