import { createFileRoute } from "@tanstack/react-router";
import { MyEventsPage } from "@/features/myEvents/MyEventsPage";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/my-events")({
  beforeLoad: requireAuth,
  component: MyEventsPage,
  ssr: false,
});
