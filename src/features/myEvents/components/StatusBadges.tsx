import { Badge } from "@/components/ui/badge";
import { FC } from "react";
import { EventStatus } from "@/features/eventDetail/types";
import { RsvpStatus } from "@/services/types";
import { useTranslation } from "react-i18next";
import { DancerRole } from "@/features/eventDetail/components/AttendeeListModal";
import { EventCardType } from "./MyEventCard";

export const getBadgeByStatus = (status: EventStatus | RsvpStatus | string) => {
  switch (status) {
    case EventStatus.PUBLISHED:
      return "bg-green-100 text-green-800";
    case EventStatus.CANCELLED:
      return "bg-red-100 text-red-800";
    case EventStatus.DRAFT:
      return "bg-yellow-100 text-yellow-800";
    case EventStatus.PAST:
      return "bg-gray-100 text-gray-800";  
    case RsvpStatus.Registered:
      return "bg-purple-100 text-purple-800";
    case RsvpStatus.Interested:
      return "bg-orange-100 text-orange-800";
    case RsvpStatus.Waitlisted:
      return "bg-gray-100 text-gray-800";
    case RsvpStatus.Pending:
      return "bg-blue-100 text-blue-800";
    case RsvpStatus.Rejected:
    case RsvpStatus.Cancelled:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getBadgeByDancerRole = (role: string) => {
  switch (role) {
    case DancerRole.FOLLOWER:
      return "bg-pink-100 text-pink-800";
    case DancerRole.LEADER:
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const isEventPast = (date: string) => {
  const eventDate = new Date(date);
  const today = new Date();
  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return eventDate.getTime() < today.getTime();
};

const getStatusLabel = (
  status: EventStatus | RsvpStatus | string,
  cardType: EventCardType,
  t: (key: string) => string,
) => {
  if (status === EventStatus.PUBLISHED && cardType === EventCardType.HOSTING) {
    return t("myEvents.status.published");
  }

  switch (status) {      
    case EventStatus.PAST:
      return t("myEvents.status.past");
    case EventStatus.PUBLISHED:
      return t("myEvents.status.upcoming");  
    case EventStatus.CANCELLED: 
      return t("myEvents.status.cancelled");
    case EventStatus.DRAFT:
      return t("myEvents.status.draft");
    case RsvpStatus.Registered:
      return t("myEvents.status.registered");
    case RsvpStatus.Interested:
      return t("myEvents.status.interested");
    case RsvpStatus.Waitlisted:
      return t("myEvents.status.waitlisted");
    case RsvpStatus.Pending:
      return t("myEvents.status.pending");
    case RsvpStatus.Rejected:
      return t("myEvents.status.rejected");
    case RsvpStatus.Cancelled:
      return t("myEvents.status.cancelled");  
    default:
      return null;
  }
};

export const StatusBadges: FC<{
  cardType: EventCardType; 
  status?: EventStatus;
  userStatus?: RsvpStatus;
  role?: string;
  date: string;
  className?: string;
}> = ({ cardType, status, userStatus, role, date, className }) => {
  const { t } = useTranslation();
  const eventStatus = isEventPast(date) ? EventStatus.PAST : status;
  return (
    <span className={className}>
      {eventStatus && (
        <Badge className={getBadgeByStatus(eventStatus)}>
          {getStatusLabel(eventStatus, cardType, t)}
        </Badge>
      )}
      {userStatus && cardType === EventCardType.GOING && (
        <Badge className={getBadgeByStatus(userStatus) + " ml-2"}>
          {getStatusLabel(userStatus, cardType, t)}
        </Badge>
      )}
      {role && <Badge className={getBadgeByDancerRole(role) + " ml-2"}>{role}</Badge>}
    </span>
  );
};
