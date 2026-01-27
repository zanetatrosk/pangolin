import { EventStats } from "@/features/eventStats/EventStats";
import { mockEventStats } from "@/mocks/eventStats";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$id/stats")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  //todo fetch stats data using id
  return <EventStats stats={mockEventStats}/>;
}
