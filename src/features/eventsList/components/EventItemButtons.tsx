import { RsvpData } from "@/services/types";
import { ActionButtons } from "@/features/eventDetail/components/ActionButtons";
import { RegistrationModeEnum } from "@/features/eventDetail/publish-actions/PublishEventOptions";

export const EventItemButtons: React.FC<{ 
  rsvpData: RsvpData;
  registrationMode: RegistrationModeEnum;
  formId?: string;
}> = (props) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:justify-start">
      <ActionButtons 
        {...props} 
        buttonSize="sm"
        interestedClassName=""
        joinClassName=""
      />
    </div>
  );
};

