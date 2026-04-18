import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Calendar, MapPin, Eye } from "lucide-react";
import { DataWithIcon } from "@/components/DataWithIcon";
import { StatusBadges } from "./StatusBadges";
import { renderAddress } from "@/utils/renderAdress";
import { SingleEventDTO } from "@/features/myEvents/types";
import { EventCardType } from "./MyEventCard";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";
import { useTranslation } from "react-i18next";

export interface SingleEventCardProps {
  event: SingleEventDTO;
  cardType: EventCardType;
}

export const SingleEventCard: React.FC<SingleEventCardProps> = ({
  event,
  cardType,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isUserOrganizer = cardType === EventCardType.HOSTING;
  
  const { eventName, organizer, status, userStatus, date, time, location, attendeeStats, role, endDate } = event;
  const renderedLocation = renderAddress(location);

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
                cardType={cardType}
                status={status}
                userStatus={userStatus}
                className="lg:hidden"
                role={role?.name}
                date={date}
                endDate={event?.endDate}
              />
            </div>
            <div className="flex flex-row items-center ">
              <StatusBadges
                cardType={cardType}
                status={status}
                userStatus={userStatus}
                role={role?.name}
                date={date}
                className="hidden lg:block"
                endDate={event?.endDate}
              />

              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate({ to: PATHS.EVENTS.DETAIL(event.id) })}
                className="ml-2"
              >
                {t("myEvents.card.viewDetails")}
                <Eye className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          {!isUserOrganizer && <div className="text-sm">
            {t("myEvents.card.organizedBy")} {organizer.firstName && organizer.lastName ? `${organizer.firstName} ${organizer.lastName}` : organizer.username}
          </div>}
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
          
          <DataWithIcon icon={Calendar} value={`${date} ${endDate ? `until ${endDate}` : `${t("myEvents.card.at")} ${time}`}`} />
          <DataWithIcon icon={MapPin} value={renderedLocation} />
          <DataWithIcon
            icon={Building}
            value={`${attendeeStats?.going?.total || 0} ${t("myEvents.card.going")}, ${attendeeStats?.interested || 0} ${t("myEvents.card.interested")}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};
