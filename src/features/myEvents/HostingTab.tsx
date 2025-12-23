import { CalendarPlus, Users } from "lucide-react";
import { NoEvents } from "./components/NoEvents";
import { TabCard } from "./components/TabCard";
import { MyEventCard } from "./components/MyEventCard";
import { MOCK_EVENTS } from "@/mocks/eventsDetailed";

export const HostingTab: React.FC = () => {
  const events = MOCK_EVENTS; // Replace with actual data fetching logic
  return (
    <TabCard
      value="hosting"
      title="Events You're Hosting"
      noItemComponent={
        <NoEvents
          title="No Hosted Events Yet"
          description="Create your first event and start building your dance community!"
          buttonText="Create Event"
          icon={
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          }
          buttonIcon={<CalendarPlus className="h-4 w-4 mr-2" />}
        />
      }
      numberOfItems={events.length}
    >
        <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
            <MyEventCard key={event.id} event={event} isHosted />
        ))}
        </div>
    </TabCard>
  );
};
