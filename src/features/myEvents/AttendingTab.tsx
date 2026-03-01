import { Calendar } from "lucide-react";
import { TabCard } from "./components/TabCard";
import { NoEvents } from "./components/NoEvents";
import { EventCardType, MyEventCard } from "./components/MyEventCard";
import { useUserEvents } from "./hooks/useUserEvents";
import { userEventFilter } from "@/services/users-events-api";
import { useTranslation } from "react-i18next";

export const AttendingTab: React.FC = () => {
  const { t } = useTranslation();
  const { data: events = [], isLoading, error } = useUserEvents(userEventFilter.GOING);

  return (
    <TabCard
      value="attending"
      noItemComponent={
        <NoEvents
          title={t("myEvents.noEvents.attending.title")}
          description={t("myEvents.noEvents.attending.description")}
          buttonText={t("myEvents.noEvents.attending.buttonText")}
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
