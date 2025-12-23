import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Building, Calendar, MapPin, User } from "lucide-react";
import {
  ReocurringEventCard,
  EventActions,
  MyEventCardProps,
} from "./ReocurringEventCard";
import { DataWithIcon } from "@/components/DataWithIcon";
import { StatusBadges } from "./StatusBadges";
import { useIsMobile } from "@/hooks/useIsMobile";

export const MyEventCard: React.FC<MyEventCardProps> = ({
  event,
  isHosted,
}) => {
  const { basicInfo } = event;
  const { eventName, location, date, time } = basicInfo;
  if (basicInfo.isRecurring) {
    return <ReocurringEventCard event={event} />;
  }
  return (
    <Card className="w-full border-0 shadow-2xl rounded-md bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800 flex justify-center py-4">
      <CardContent className="flex flex-col items-start space-y-4 px-2 pl-4 md:px-6 w-full">
        <div className="w-full">
          <div className="flex flex-row items-start justify-between space-y-2 lg:space-y-0">
            <div>
              <CardTitle className="text-xl font-bold">{eventName}</CardTitle>
              <StatusBadges
                status={event.status}
                userStatus={event.statusUser}
                className="lg:hidden"
              />
            </div>
            <div className="flex flex-row items-center ">
              <StatusBadges
                status={event.status}
                userStatus={event.statusUser}
                className="hidden lg:block"
              />

              <EventActions label="Event" />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Organized by John Doe
          </div>
          
          
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
          <DataWithIcon
            icon={Building}
            value={`${event.attendeeStats?.going?.total || 0} going, ${
              event.attendeeStats?.interested?.total || 0
            } interested`}
          />
          <DataWithIcon icon={Calendar} value={`${date} at ${time}`} />
          <DataWithIcon icon={MapPin} value={location} />
        </div>
      </CardContent>
    </Card>
  );
};
