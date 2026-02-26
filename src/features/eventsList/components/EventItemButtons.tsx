import { Button } from "@/components/ui/button";
import { useDeleteRegistration } from "@/hooks/useDeleteRegistration";
import { useUpdateRsvp } from "@/hooks/useUpdateRsvp";
import { useCancelRegistration } from "@/hooks/useCancelRegistration";
import { RsvpData, RsvpStatus } from "@/services/types";
import { Heart, UserPlus, Clock } from "lucide-react";
import { useState } from "react";
import { RegistrationDialog } from "@/features/eventDetail/components/RegistrationDialog";
import { CancelRegistrationDialog } from "@/features/eventDetail/components/CancelRegistrationDialog";
import { RegistrationModeEnum } from "@/features/eventDetail/publish-actions/PublishEventOptions";

export const EventItemButtons: React.FC<{ 
  rsvpData: RsvpData;
  registrationMode: RegistrationModeEnum;
  formId?: string;
}> = ({
  rsvpData,
  registrationMode,
  formId,
}) => {
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
          setCurrentStatus(RsvpStatus.Pending);
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
      <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:justify-start">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleInterested}
          disabled={!canInteract || isPending || isGoing}
          className={`${
            "" + isInterested
              ? "text-rose-600 hover:text-rose-700"
              : "text-gray-600 hover:text-rose-600"
          }`}
        >
          <Heart
            className={`w-4 h-4 mr-1 ${isInterested ? "fill-rose-600" : ""}`}
          />
          {isInterested ? "Interested" : "Interest"}
        </Button>
        <Button
          variant={isGoing || isPending ? "default" : "outline"}
          size="sm"
          onClick={handleJoin}
          disabled={!canInteract || isRejected || (isGoogleForm && (isGoing || isPending))}
          className={`${
            isGoing ? "bg-green-600 hover:bg-green-700 text-white" : ""
          } ${
            isPending ? "bg-yellow-600 hover:bg-yellow-700 text-white" : ""
          }`}
        >
          {isPending ? <Clock className="w-4 h-4 mr-1" /> : <UserPlus className="w-4 h-4 mr-1" />}
          {isGoing ? "Joined" : isPending ? "Pending" : "Join Event"}
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
