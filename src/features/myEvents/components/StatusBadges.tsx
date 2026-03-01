import { Badge } from "@/components/ui/badge";
import { FC } from "react";
import { EventStatus } from "@/features/eventDetail/types";
import { RsvpStatus } from "@/services/types";
import { useTranslation } from "react-i18next";

export const getBadgeByStatus = (status: EventStatus | RsvpStatus | string) => {
  switch (status) {
    case EventStatus.PUBLISHED:
      return "bg-green-100 text-green-800";
    case EventStatus.CANCELLED:
      return "bg-red-100 text-red-800";
    case EventStatus.PAST:
      return "bg-blue-100 text-blue-800";
    case EventStatus.DRAFT:
      return "bg-yellow-100 text-yellow-800";
    case RsvpStatus.Registered:
      return "bg-purple-100 text-purple-800";
    case RsvpStatus.Interested:
      return "bg-orange-100 text-orange-800";
    case RsvpStatus.Waitlisted:
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const getStatusLabel = (status: EventStatus | RsvpStatus | string, t: (key: string) => string) => {
  switch (status) {
    case EventStatus.PUBLISHED:
      return t("myEvents.status.published");
    case EventStatus.CANCELLED:
      return t("myEvents.status.cancelled");
    case EventStatus.PAST:
      return t("myEvents.status.past");
    case EventStatus.DRAFT:
      return t("myEvents.status.draft");
    case RsvpStatus.Registered:
      return t("myEvents.status.going");
    case RsvpStatus.Interested:
      return t("myEvents.status.interested");
    case RsvpStatus.Waitlisted:
      return t("myEvents.status.waitlisted");
    default:
      return status;
  }
}

export const StatusBadges: FC<{status?: EventStatus, userStatus?: RsvpStatus, className?: string}> = ({status, userStatus, className}) => {
  const { t } = useTranslation();
  return (
    <span className={className}>
    {status && <Badge className={getBadgeByStatus(status)}>{getStatusLabel(status, t)}</Badge>}
     {userStatus && <Badge className={getBadgeByStatus(userStatus) + " ml-2"}>{getStatusLabel(userStatus, t)}</Badge>}
    </span>
  )  
};