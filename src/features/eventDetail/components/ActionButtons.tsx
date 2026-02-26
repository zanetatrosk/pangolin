import { Button } from "@/components/ui/button";
import { useDeleteRegistration } from "@/hooks/useDeleteRegistration";
import { useUpdateRsvp } from "@/hooks/useUpdateRsvp";
import { useCancelRegistration } from "@/hooks/useCancelRegistration";
import { Check, Heart, Share2, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { RsvpData, RsvpStatus } from "@/services/types";
import { RegistrationDialog } from "./RegistrationDialog";
import { CancelRegistrationDialog } from "./CancelRegistrationDialog";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const ActionButtons: React.FC<{
  rsvpData: RsvpData;
  registrationMode: RegistrationModeEnum;
  formId?: string;
}> = ({rsvpData, registrationMode, formId}) => {
  const [currentStatus, setCurrentStatus] = useState(rsvpData.status);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const updateMutation = useUpdateRsvp();
  const deleteMutation = useDeleteRegistration(rsvpData.eventId, rsvpData.id || "");
  const cancelMutation = useCancelRegistration();

  const isGoing = currentStatus === RsvpStatus.Going;
  const isInterested = currentStatus === RsvpStatus.Interested;
  const isPending = currentStatus === RsvpStatus.Pending;
  const isRejected = currentStatus === RsvpStatus.Rejected;
  const isGoogleForm = registrationMode === RegistrationModeEnum.GOOGLE_FORM;
  const canInteract = !isRejected;
  const canCancel = !isGoogleForm; // Cannot cancel Google Form registrations

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
    if ((isGoing || isPending) && canCancel) {
      setCancelDialogOpen(true);
    } else if (!isGoing && !isPending) {
      setDialogOpen(true);
    }
  };

  const handleConfirmRegistration = (role?: string) => {
    updateMutation.mutate(
      { 
        eventId: rsvpData.eventId, 
        status: RsvpStatus.Going, 
        roleId: role 
      },
      {
        onSuccess: () => {
          setCurrentStatus(RsvpStatus.Pending); // Will be pending until approved
        }
      }
    );
  };

  const handleInterested = () => {
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
      {isRejected && (
        <Alert variant="destructive" className="mb-4">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            Your registration was rejected by the organizer. You cannot register for this event.
          </AlertDescription>
        </Alert>
      )}

      {isGoogleForm && (isGoing || isPending) && (
        <Alert className="mb-4">
          <AlertDescription>
            This registration was done through Google Forms. To cancel, please contact the event organizer directly.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-3 order-1 lg:order-0">
        <Button
          size="lg"
          className={`flex-1 md:flex-none gap-2 ${
            isGoing ? "bg-green-600 hover:bg-green-700" : ""
          } ${
            isPending ? "bg-yellow-600 hover:bg-yellow-700" : ""
          }`}
          onClick={handleJoin}
          disabled={!canInteract || (isGoogleForm && (isGoing || isPending))}
        >
          {isGoing && <Check className="w-4 h-4" />}
          {isPending && <Clock className="w-4 h-4" />}
          {isGoing ? "Going" : isPending ? "Pending Approval" : "Join Event"}
        </Button>

        <Button
          variant={isInterested ? "secondary" : "outline"}
          size="lg"
          className={`flex-1 md:flex-none gap-2 ${
            isInterested ? "text-primary" : ""
          }`}
          onClick={handleInterested}
          disabled={!canInteract || isPending || isGoing}
        >
          <Heart className={`w-4 h-4 ${isInterested ? "fill-current" : ""}`} />
          Interested
        </Button>

        <Button variant="ghost" size="icon">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
      
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
