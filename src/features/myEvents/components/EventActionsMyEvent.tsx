import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { EventCardType } from "./MyEventCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";

export const useGetOptionsByCardType = (cardType: EventCardType, eventId: string): DropdownOption[] => {
  const navigate = useNavigate();  
  switch (cardType) {
    case EventCardType.HOSTING:
      return [
        {label: "View Details", action: () => navigate({ to: PATHS.EVENTS.DETAIL(eventId) })},
        {label: "Manage Event", action: () => navigate({ to: PATHS.EVENTS.EDIT_EVENT(eventId) })},
        {label: "Cancel Event", variant: "destructive"},
      ];
    case EventCardType.INTERESTED:
      return [
        {label: "View Details", action: () => navigate({ to: PATHS.EVENTS.DETAIL(eventId) })},
        {label: "Join Event"},
        {label: "Cancel Interest", variant: "destructive"},
      ];
    case EventCardType.GOING:
      return [
        {label: "View Details", action: () => navigate({ to: PATHS.EVENTS.DETAIL(eventId) })},
        {label: "Cancel Registration", variant: "destructive"},
      ];
    default:
      return [{label: "View Details", action: () => navigate({ to: PATHS.EVENTS.DETAIL(eventId) })}];
  }
};

interface DropdownOption {
  label: string;
  variant?: "destructive" | "default" | undefined;
  action?: () => void;
}
export const EventActionsMyEvent = ({ cardType, eventId }: { cardType: EventCardType, eventId: string }) => {
  const options = useGetOptionsByCardType(cardType, eventId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem key={option.label} variant={option.variant} onClick={option.action}>{option.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};