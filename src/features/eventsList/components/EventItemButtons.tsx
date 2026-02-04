import { Button } from "@/components/ui/button";
import { useDeleteRegistration } from "@/hooks/useDeleteRegistration";
import { useUpdateRsvp } from "@/hooks/useUpdateRsvp";
import { RsvpData, RsvpStatus } from "@/services/types";
import { Heart, UserPlus } from "lucide-react";
import { useState } from "react";
import { RegistrationDialog } from "@/features/eventDetail/components/RegistrationDialog";
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
  const [isGoing, setIsGoing] = useState(rsvpData.status === RsvpStatus.Going);
  const [isInterested, setIsInterested] = useState(
    rsvpData.status === RsvpStatus.Interested,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const updateMutation = useUpdateRsvp();
  const deleteMutation = useDeleteRegistration(rsvpData.eventId);
  
  const handleJoin = () => {
    if (isGoing) {
      deleteMutation.mutate();
      setIsGoing(false);
      setIsInterested(false);
    } else {
      setDialogOpen(true);
    }
  };

  const handleConfirmRegistration = (role?: string) => {
    updateMutation.mutate({ ...rsvpData, status: RsvpStatus.Going, roleId: role });
    setIsInterested(false);
    setIsGoing(true);
  };

  const handleInterested = () => {
    if (!isInterested) {
      updateMutation.mutate({ ...rsvpData, status: RsvpStatus.Interested });
    } else {
      deleteMutation.mutate();
    }
    setIsInterested(!isInterested);
    setIsGoing(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:justify-start">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleInterested}
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
          variant={isGoing ? "default" : "outline"}
          size="sm"
          onClick={handleJoin}
          className={`${
            isGoing ? "bg-green-600 hover:bg-green-700 text-white" : ""
          }`}
        >
          <UserPlus className="w-4 h-4 mr-1" />
          {isGoing ? "Joined" : "Join Event"}
        </Button>
      </div>
      
      <RegistrationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        registrationMode={registrationMode}
        formId={formId}
        onConfirm={handleConfirmRegistration}
      />
    </>
  );
};
