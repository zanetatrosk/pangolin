import { createFileRoute, redirect } from "@tanstack/react-router";
import { MyEventsPage } from "@/features/myEvents/MyEventsPage";
import { useAuth } from "@/features/auth/AuthProvider";

export const Route = createFileRoute("/my-events")({
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
  component: MyEventsPage,
});
