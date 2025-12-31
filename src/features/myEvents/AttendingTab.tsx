import { Calendar } from "lucide-react";
import { TabCard } from "./components/TabCard";
import { NoEvents } from "./components/NoEvents";
import { EventCardType, MyEventCard } from "./components/MyEventCard";
import { MOCK_EVENTS } from "@/mocks/eventsDetailed";

export const AttendingTab: React.FC = () => {
  const events = MOCK_EVENTS; // Replace with actual data fetching logic
  return (
    <TabCard
      value="attending"
      noItemComponent={
        <NoEvents
          title="No Registered Events"
          description="Browse events and register to join the fun!"
          buttonText="Browse Events"
          buttonVariant="outline"
          icon={<Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />}
        />
      }
      numberOfItems={events.length}
    >
      {/* Render MyEventCard components here when there are events */}
      <div className="grid grid-cols-1 gap-6">
      {events.map((event) => (
        <MyEventCard key={event.id} event={event} cardType={EventCardType.GOING} />
      ))}
      </div>
        
    </TabCard>
  );
};
