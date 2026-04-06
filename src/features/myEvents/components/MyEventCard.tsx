import {
  ReocurringEventCard
} from "./ReocurringEventCard";
import { isSeriesEvent, MyEvent } from "@/features/myEvents/types";
import { SingleEventCard } from "./SingleEventCard";

export enum EventCardType {
  HOSTING = "hosting",
  INTERESTED = "interested",
  GOING = "going",
}
export interface MyEventCardProps {
  event: MyEvent;
  cardType: EventCardType;
}
export const MyEventCard: React.FC<MyEventCardProps> = ({
  event,
  cardType,
}) => {
  // Display series events as a table
  if (isSeriesEvent(event)) {
    return <ReocurringEventCard event={event} cardType={cardType} />;
  }

  // For single events
  return <SingleEventCard event={event} cardType={cardType} />;
};
