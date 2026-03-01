import { CalendarPlus, Users } from "lucide-react";
import { NoEvents } from "./components/NoEvents";
import { TabCard } from "./components/TabCard";
import { EventCardType, MyEventCard } from "./components/MyEventCard";
import { useUserEvents } from "./hooks/useUserEvents";
import { userEventFilter } from "@/services/users-events-api";
import { useTranslation } from "react-i18next";

export const HostingTab: React.FC = () => {
  const { t } = useTranslation();
  const { data: events = [], isLoading, error } = useUserEvents(userEventFilter.HOSTING);

  return (
    <TabCard
      value="hosting"
      noItemComponent={
        <NoEvents
          title={t("myEvents.noEvents.hosting.title")}
          description={t("myEvents.noEvents.hosting.description")}
          buttonText={t("myEvents.noEvents.hosting.buttonText")}
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
