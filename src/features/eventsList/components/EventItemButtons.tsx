import { RsvpData } from "@/services/types";
import { ActionButtons } from "@/features/eventDetail/components/ActionButtons";
import { RegistrationModeEnum } from "@/features/eventDetail/publish-actions/PublishEventOptions";

/**
 * Event list item buttons - uses unified ActionButtons component with "list" variant
 */
export const EventItemButtons: React.FC<{ 
  rsvpData: RsvpData;
  registrationMode: RegistrationModeEnum;
  formId?: string;
}> = (props) => {
  return <ActionButtons {...props} variant="list" />;
};
