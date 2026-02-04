import { Button } from "@/components/ui/button";
import { useDeleteRegistration } from "@/hooks/useDeleteRegistration";
import { useUpdateRsvp } from "@/hooks/useUpdateRsvp";
import { Check, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { RsvpData, RsvpStatus } from "@/services/types";
import { RegistrationDialog } from "./RegistrationDialog";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";

export const ActionButtons: React.FC<{
  rsvpData: RsvpData;
  registrationMode: RegistrationModeEnum;
  formId?: string;
}> = ({rsvpData, registrationMode, formId}) => {
  const [isGoing, setIsGoing] = useState(rsvpData.status === RsvpStatus.Going);
  const [isInterested, setIsInterested] = useState(rsvpData.status === RsvpStatus.Interested);
  const [dialogOpen, setDialogOpen] = useState(false);
  const updateMutation = useUpdateRsvp();
  const deleteMutation = useDeleteRegistration(rsvpData.eventId);

  const handleJoin = () => {
    if( isGoing ) {
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
    if(!isInterested){
      updateMutation.mutate({ ...rsvpData, status: RsvpStatus.Interested });
    }else{
      deleteMutation.mutate();
    }
    setIsInterested(!isInterested);
    setIsGoing(false);
  };
  
  return (
    <>
      <div className="flex flex-wrap gap-3 order-1 lg:order-0">
        <Button
          size="lg"
          className={`flex-1 md:flex-none gap-2 ${
            isGoing ? "bg-green-600 hover:bg-green-700" : ""
          }`}
          onClick={handleJoin}
        >
          {isGoing ? <Check className="w-4 h-4" /> : null}
          {isGoing ? "Going" : "Join Event"}
        </Button>

        <Button
          variant={isInterested ? "secondary" : "outline"}
          size="lg"
          className={`flex-1 md:flex-none gap-2 ${
            isInterested ? "text-primary" : ""
          }`}
          onClick={handleInterested}
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
    </>
  );
};
