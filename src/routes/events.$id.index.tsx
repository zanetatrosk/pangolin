import { createFileRoute } from "@tanstack/react-router";
import { EventDetail } from "@/features/eventDetail/EventDetail";
import { EventDetailData } from "@/features/eventDetail/types";
import { getEventById } from "@/services/events-api";
import { useQuery } from "@tanstack/react-query";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/events/$id/")({
  beforeLoad: requireAuth,
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: event } = useQuery<EventDetailData>({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });
  debugger;
  if (!event) {
    return null;
  }
  return <EventDetail event={event} />;
}
