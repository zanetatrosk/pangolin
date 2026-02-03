import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PATHS } from "@/paths";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Edit, X, BarChart3, Loader2 } from "lucide-react";
import { EventStatus } from "../types";
import { publishEvent, cancelEvent, deleteEvent } from "@/services/events-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ConfirmActionDialog, ActionType } from "./ConfirmActionDialog";
import { GoogleFormIntegration } from "@/features/eventDetail/publish-actions/GoogleFormIntegration";
import { PublishEventOptions } from "../publish-actions/PublishEventOptions";

interface EventItemManageButtonsProps {
  eventId: string | number;
  eventStatus: EventStatus;
}

export const EventItemManageButtons: React.FC<EventItemManageButtonsProps> = ({
  eventId,
  eventStatus,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  const publishMutation = useMutation({
    mutationFn: () => publishEvent(String(eventId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", String(eventId)] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setPendingAction(null);
    },
    onError: (error: any) => {
      console.error("Failed to publish event:", error);
      alert(error.response?.data?.message || "Failed to publish event");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelEvent(String(eventId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", String(eventId)] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setPendingAction(null);
    },
    onError: (error: any) => {
      console.error("Failed to cancel event:", error);
      alert(error.response?.data?.message || "Failed to cancel event");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteEvent(String(eventId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate({ to: PATHS.MY_EVENTS });
    },
    onError: (error: any) => {
      console.error("Failed to delete event:", error);
      alert(error.response?.data?.message || "Failed to delete event");
    },
  });

  const isLoading = publishMutation.isPending || cancelMutation.isPending || deleteMutation.isPending;

  const handleEditEvent = () => {
    navigate({ to: PATHS.EVENTS.EDIT_EVENT(eventId) });
  };

  const handleCancelEvent = () => {
    setPendingAction("cancel");
  };

  const handleViewStats = () => {
    navigate({ to: PATHS.EVENTS.STATS(eventId) });
  };

  const handlePublishEvent = () => {
    setPendingAction("publish");
  };

  const handleDeleteEvent = () => {
    setPendingAction("delete");
  };

  const handleConfirm = () => {
    const actions = {
      publish: publishMutation,
      cancel: cancelMutation,
      delete: deleteMutation,
    };
    
    if (pendingAction) {
      actions[pendingAction].mutate();
    }
  };

  const isDraft = eventStatus === EventStatus.DRAFT;
  const isManageable = eventStatus !== EventStatus.CANCELLED && eventStatus !== EventStatus.PAST;

  return (
    <>
      <div className="flex flex-wrap gap-3 order-1 lg:order-0">
        {isManageable && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="flex-1 md:flex-none gap-2"
                variant={isDraft ? "outline" : "default"}
                disabled={isLoading}
              >
                Manage Event
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEditEvent}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Event
              </DropdownMenuItem>
              {isDraft ? (
                <DropdownMenuItem onClick={handleDeleteEvent}>
                  <X className="w-4 h-4 mr-2" />
                  Delete Event
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={handleCancelEvent}
                  className="text-destructive"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel Event
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {isDraft && (
          <Button
            onClick={handlePublishEvent}
            className="flex-1 md:flex-none gap-2"
            size="lg"
            disabled={isLoading}
          >
            {publishMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish"
            )}
          </Button>
        )}

        {!isDraft && (
          <Button
            variant="outline"
            size="lg"
            className="flex-1 md:flex-none gap-2"
            onClick={handleViewStats}
            disabled={isLoading}
          >
            <BarChart3 className="w-4 h-4" />
            Stats
          </Button>
        )}
      </div>

      <ConfirmActionDialog
        open={pendingAction !== null}
        onOpenChange={() => setPendingAction(null)}
        actionType={pendingAction}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        dialogComponent={<PublishEventOptions />}
      />
    </>
  );
};
