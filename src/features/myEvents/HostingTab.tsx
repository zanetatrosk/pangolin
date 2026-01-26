import { CalendarPlus, Users } from "lucide-react";
import { NoEvents } from "./components/NoEvents";
import { TabCard } from "./components/TabCard";
import { EventCardType, MyEventCard } from "./components/MyEventCard";
import { useUserEvents } from "./hooks/useUserEvents";
import { userEventFilter } from "@/services/users-events-api";

export const HostingTab: React.FC = () => {
  const { data: events = [], isLoading, error } = useUserEvents(userEventFilter.HOSTING);

  return (
    <TabCard
      value="hosting"
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
            <MyEventCard key={event.id} event={event} cardType={EventCardType.HOSTING} />
        ))}
        </div>
    </TabCard>
  );
};
