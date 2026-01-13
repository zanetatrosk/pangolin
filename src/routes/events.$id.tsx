import { createFileRoute } from "@tanstack/react-router";
import { EventDetail } from "@/features/eventDetail/EventDetail";
import { EventDetailData } from "@/features/eventDetail/types";
import { getEventById } from "@/services/events-api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/events/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: event } = useQuery<EventDetailData>({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });
  if (!event) {
    return null;
  }
  return <EventDetail event={event} />;
}
