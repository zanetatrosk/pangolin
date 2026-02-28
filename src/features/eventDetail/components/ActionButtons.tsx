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
  const [currentStatus, setCurrentStatus] = useState(rsvpData.status);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const updateMutation = useUpdateRsvp();
  const deleteMutation = useDeleteRegistration(rsvpData.eventId, rsvpData.id || "");
  const cancelMutation = useCancelRegistration();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const router = useRouter();

  const isGoing = currentStatus === RsvpStatus.Registered;
  const isInterested = currentStatus === RsvpStatus.Interested;
  const isPending = currentStatus === RsvpStatus.Pending;
  const isRejected = currentStatus === RsvpStatus.Rejected;
  const isGoogleForm = registrationMode === RegistrationModeEnum.GOOGLE_FORM;
  const canInteract = !isRejected;
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
        { eventId: rsvpData.eventId, registrationId: rsvpData.id },
        {
          onSuccess: () => {
            setCurrentStatus(RsvpStatus.Cancelled);
          }
        }
      );
    }
  };

  const handleJoin = () => {
    handleNotAuthenticated();

    if ((isGoing || isPending) && canCancel) {
      setCancelDialogOpen(true);
    } else if (!isGoing && !isPending) {
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
      },
      {
        onSuccess: (data) => {
          // Use the actual status from the response instead of hardcoding
          setCurrentStatus(data.status || RsvpStatus.Pending);
        }
      }
    );
  };

  const handleInterested = () => {
    handleNotAuthenticated();

    if (!isInterested) {
      updateMutation.mutate(
        { 
          eventId: rsvpData.eventId, 
          status: RsvpStatus.Interested 
        },
        {
          onSuccess: () => {
            setCurrentStatus(RsvpStatus.Interested);
          }
        }
      );
    } else if (rsvpData.id) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          setCurrentStatus(undefined);
        }
      });
    }
  };
  
  return (
    <>
      <Button
        variant={isInterested ? "secondary" : "outline"}
        size={buttonSize}
        className={`gap-2 ${isInterested ? "text-primary" : ""} ${interestedClassName}`}
        onClick={handleInterested}
        disabled={!canInteract || isPending || isGoing}
      >
        <Heart className={`w-4 h-4 ${isInterested ? "fill-current" : ""}`} />
        Interested
      </Button>

      <Button
        size={buttonSize}
        className={`gap-2 ${
          isGoing ? "bg-green-600 hover:bg-green-700" : ""
        } ${
          isPending ? "bg-yellow-600 hover:bg-yellow-700" : ""
        } ${joinClassName}`}
        onClick={handleJoin}
        disabled={!canInteract || (isGoogleForm && (isGoing || isPending))}
      >
        {isGoing && <Check className="w-4 h-4" />}
        {isPending && <Clock className="w-4 h-4" />}
        {!isGoing && !isPending && <UserPlus className="w-4 h-4" />}
        {isGoing ? "Going" : isPending ? "Pending Approval" : "Join Event"}
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
        isPending={isPending}
      />
    </>
  );
};
