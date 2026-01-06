import { FC } from "react";
import { EventCard } from "./components/EventCard";
import { getAllEvents } from "@/services/events-api";
import { useQuery } from "@tanstack/react-query";

export const EventList: FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getAllEvents,
  });

  if(error) {
    return <div>Error loading events.</div>;
  }

  if(isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="space-y-4">
        {data?.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};
