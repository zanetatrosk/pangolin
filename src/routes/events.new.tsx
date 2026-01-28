import { createFileRoute, redirect } from "@tanstack/react-router";
import { NewEventPage } from "@/features/newEvent/NewEventPage";
import { authStore } from "@/stores/authStore";
import { useAuth } from "@/features/auth/AuthProvider";

export const Route = createFileRoute("/events/new")({
  beforeLoad: async ({ location }) => {
    
    if (false) {
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
