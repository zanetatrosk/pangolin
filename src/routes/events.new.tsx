import { createFileRoute, redirect } from "@tanstack/react-router";
import { NewEventPage } from "@/features/newEvent/NewEventPage";
import { authStore } from "@/stores/authStore";

export const Route = createFileRoute("/events/new")({
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
  component: NewEventPage,
});
