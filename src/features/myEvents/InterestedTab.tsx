import { MOCK_EVENTS } from "@/mocks/eventsDetailed";
import { Users, CalendarPlus, Heart } from "lucide-react";
import { FC } from "react";
import { EventCardType, MyEventCard } from "./components/MyEventCard";
import { NoEvents } from "./components/NoEvents";
import { TabCard } from "./components/TabCard";

export const InterestedTab: FC = () => {
  const events = MOCK_EVENTS; // Replace with actual data fetching logic
  return (
    <TabCard
      value="interested"
      noItemComponent={
        <NoEvents
          title="No Interested Events Yet"
          description="Events you mark as interested will appear here. Explore and find events that excite you!"
          buttonText="Browse Events"
          icon={
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          }
          buttonIcon={<CalendarPlus className="h-4 w-4 mr-2" />}
        />
      }
      numberOfItems={events.length}
    >
        <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
            <MyEventCard key={event.id} event={event} cardType={EventCardType.INTERESTED} />
        ))}
        </div>
    </TabCard>
  );
};
