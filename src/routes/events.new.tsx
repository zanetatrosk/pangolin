import { createFileRoute } from "@tanstack/react-router";
import { NewEventPage } from "@/features/newEvent/NewEventPage";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/events/new")({
  beforeLoad: requireAuth,
  component: NewEventPage,
  ssr: false,
});
