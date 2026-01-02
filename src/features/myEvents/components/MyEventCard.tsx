import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Building, Calendar, MapPin } from "lucide-react";
import {
    ReocurringEventCard,
    EventActions,
    MyEventCardProps,
} from "./ReocurringEventCard";
import { DataWithIcon } from "@/components/DataWithIcon";
import { StatusBadges } from "./StatusBadges";

export enum EventCardType {
    HOSTING = "hosting",
    INTERESTED = "interested",
    GOING = "going",
}
export const MyEventCard: React.FC<MyEventCardProps> = ({
  event,
 cardType,
}) => {
  const { basicInfo } = event;
  const { eventName, address: location, date, time } = basicInfo;
    const isUserOrganizer = cardType === EventCardType.HOSTING;
    const isInterested = cardType === EventCardType.INTERESTED;
  if (basicInfo.isRecurring && !isInterested) {
    return <ReocurringEventCard event={event} cardType={cardType} />;
  }
  return (
    <Card className="w-full border-0 shadow-2xl rounded-md bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800 flex justify-center py-4">
      <CardContent className="flex flex-col items-start space-y-4 px-2 pl-4 md:px-6 w-full">
        <div className="w-full">
          <div className="flex flex-row items-start justify-between space-y-2 lg:space-y-0">
            <div>
              <div className="flex flex-row items-center space-x-2">
                <CardTitle className="text-xl font-bold">{eventName}</CardTitle>
              </div>
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

              <EventActions cardType={cardType} />
            </div>
          </div>
          {!isUserOrganizer && <div className="text-sm">
            Organized by John Doe
          </div>}
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
          
          <DataWithIcon icon={Calendar} value={`${date} at ${time}`} />
          <DataWithIcon icon={MapPin} value={location} />
          <DataWithIcon
            icon={Building}
            value={`${event.attendeeStats?.going?.total || 0} going, ${
              event.attendeeStats?.interested || 0
            } interested`}
          />
        </div>
      </CardContent>
    </Card>
  );
};
