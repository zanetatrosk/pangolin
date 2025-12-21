import { FC } from "react";
import { EventCard } from "./components/EventCard";
import { EVENTS } from "@/mocks/events";

const mockEvents = EVENTS;

export const EventList: FC = () => {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="space-y-4">
        {mockEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};
