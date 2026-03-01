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
import { PublishPayload, RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface EventItemManageButtonsProps {
  eventId: string | number;
  eventStatus: EventStatus;
}

export const EventItemManageButtons: React.FC<EventItemManageButtonsProps> = ({
  eventId,
  eventStatus,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);
  const [publishData, setPublishData] = useState<PublishPayload>({
    registrationMode: RegistrationModeEnum.OPEN,
    requireApproval: false,
  });

  const publishMutation = useMutation({
    mutationFn: (payload: PublishPayload) => publishEvent(String(eventId), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", String(eventId)] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setPendingAction(null);
    },
    onError: (error: any) => {
      console.error("Failed to publish event:", error);
      toast.error(error.response?.data?.message || t("eventDetail.manageErrors.publishFailed"));
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
      toast.error(error.response?.data?.message || t("eventDetail.manageErrors.cancelFailed"));
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
      toast.error(error.response?.data?.message || t("eventDetail.manageErrors.deleteFailed"));
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

  const handleConfirm = (data?: PublishPayload) => {
    if (pendingAction === "publish" && data) {
      publishMutation.mutate(data);
    } else if (pendingAction === "cancel") {
      cancelMutation.mutate();
    } else if (pendingAction === "delete") {
      deleteMutation.mutate();
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
                {t("eventDetail.manageButtons.manageEvent")}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEditEvent}>
                <Edit className="w-4 h-4 mr-2" />
                {t("eventDetail.manageButtons.editEvent")}
              </DropdownMenuItem>
              {isDraft ? (
                <DropdownMenuItem onClick={handleDeleteEvent}>
                  <X className="w-4 h-4 mr-2" />
                  {t("eventDetail.manageButtons.deleteEvent")}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={handleCancelEvent}
                  className="text-destructive"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t("eventDetail.manageButtons.cancelEvent")}
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
                {t("eventDetail.manageButtons.publishing")}
              </>
            ) : (
              t("eventDetail.manageButtons.publish")
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
            {t("eventDetail.manageButtons.stats")}
          </Button>
        )}
      </div>

      <ConfirmActionDialog
        open={pendingAction !== null}
        onOpenChange={() => setPendingAction(null)}
        actionType={pendingAction}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        publishData={publishData}
        onPublishDataChange={setPublishData}
      />
    </>
  );
};
