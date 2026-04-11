import { Button } from "@/components/ui/button";
import { useDeleteRegistration } from "@/hooks/useDeleteRegistration";
import { useUpdateRsvp } from "@/hooks/useUpdateRsvp";
import { useCancelRegistration } from "@/hooks/useCancelRegistration";
import { useUser } from "@/hooks/useUser";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { PATHS } from "@/paths";
import { Check, Heart, Clock, UserPlus } from "lucide-react";
import { useState } from "react";
import { RsvpData, RsvpStatus } from "@/services/types";
import { RegistrationDialog } from "./RegistrationDialog";
import { CancelRegistrationDialog } from "./CancelRegistrationDialog";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { useTranslation } from "react-i18next";

export const ActionButtons: React.FC<{
  rsvpData: RsvpData;
  registrationMode: RegistrationModeEnum;
  formId?: string;
  interestedClassName?: string;
  joinClassName?: string;
  buttonSize?: "default" | "sm" | "lg" | "icon";
}> = ({
  rsvpData,
  registrationMode,
  formId,
  interestedClassName = "",
  joinClassName = "",
  buttonSize = "lg"
}) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const updateMutation = useUpdateRsvp();
  const deleteMutation = useDeleteRegistration(rsvpData.eventId);
  const cancelMutation = useCancelRegistration();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const router = useRouter();

  const isGoing = rsvpData.status === RsvpStatus.Registered;
  const isInterested = rsvpData.status === RsvpStatus.Interested;
  const isPending = rsvpData.status === RsvpStatus.Pending;
  const isWaitlisted = rsvpData.status === RsvpStatus.Waitlisted;
  const isRejected = rsvpData.status === RsvpStatus.Rejected;
  const isCancelled = rsvpData.status === RsvpStatus.Cancelled;
  const isGoogleForm = registrationMode === RegistrationModeEnum.GOOGLE_FORM;
  const canMarkInterested = !isRejected && !isCancelled;
  const canCancel = !isGoogleForm; // Cannot cancel Google Form registrations

  const redirectToLogin = () => {
    navigate({ 
      to: PATHS.LOGIN, 
      search: { redirect: router.state.location.pathname } 
    });
  };

  const handleNotAuthenticated = () => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
  };

  const handleCancel = () => {
    if (rsvpData.id) {
      cancelMutation.mutate(
        { eventId: rsvpData.eventId, registrationId: rsvpData.id }
      );
    }
  };

  const handleJoin = () => {
    handleNotAuthenticated();

    if ((isGoing || isPending || isWaitlisted) && canCancel) {
      setCancelDialogOpen(true);
    } else if (!isGoing && !isPending && !isWaitlisted) {
      setDialogOpen(true);
    }
  };

  const handleConfirmRegistration = (role?: string, isAnonymous?: boolean) => {
    updateMutation.mutate(
      { 
        eventId: rsvpData.eventId, 
        status: RsvpStatus.Registered, 
        roleId: role,
        isAnonymous: isAnonymous
      }
    );
  };

  const handleInterested = () => {
    handleNotAuthenticated();

    if (isCancelled) {
      return;
    }

    if (!isInterested) {
      updateMutation.mutate(
        { 
          eventId: rsvpData.eventId, 
          status: RsvpStatus.Interested 
        }
      );
    } else if (rsvpData.id) {
      deleteMutation.mutate(rsvpData.id);
    }
  };
  
  return (
    <>
      <Button
        variant={isInterested ? "secondary" : "outline"}
        size={buttonSize}
        className={`gap-2 ${isInterested ? "text-primary" : ""} ${interestedClassName}`}
        onClick={handleInterested}
        disabled={!canMarkInterested || isPending || isGoing || isWaitlisted}
      >
        <Heart className={`w-4 h-4 ${isInterested ? "fill-current" : ""}`} />
        {t("eventDetail.actionButtons.interested")}
      </Button>

      <Button
        size={buttonSize}
        className={`gap-2 ${
          isGoing ? "bg-green-600 hover:bg-green-700" : ""
        } ${
          isPending ? "bg-yellow-600 hover:bg-yellow-700" : ""
        } ${
          isWaitlisted ? "bg-gray-600 hover:bg-gray-700" : ""
        } ${joinClassName}`}
        onClick={handleJoin}
        disabled={isRejected || (isGoogleForm && (isGoing || isPending || isWaitlisted))}
      >
        {isGoing && <Check className="w-4 h-4" />}
        {(isPending || isWaitlisted) && <Clock className="w-4 h-4" />}
        {!isGoing && !isPending && !isWaitlisted && <UserPlus className="w-4 h-4" />}
        {isGoing
          ? t("eventDetail.actionButtons.going")
          : isPending
            ? t("eventDetail.actionButtons.pendingApproval")
            : isWaitlisted
              ? t("eventDetail.actionButtons.waitlisted")
              : isCancelled
                ? t("eventDetail.actionButtons.rejoinEvent")
                : t("eventDetail.actionButtons.joinEvent")}
      </Button>

      <RegistrationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        registrationMode={registrationMode}
        formId={formId}
        onConfirm={handleConfirmRegistration}
      />
      
      <CancelRegistrationDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleCancel}
        isPending={isPending || isWaitlisted}
      />
    </>
  );
};
