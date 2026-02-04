import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RoleSelect } from "../publish-actions/RoleSelect";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { ExternalLink } from "lucide-react";

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationMode: RegistrationModeEnum;
  formId?: string;
  onConfirm?: (role?: string) => void;
}

export const RegistrationDialog: FC<RegistrationDialogProps> = ({
  open,
  onOpenChange,
  registrationMode,
  formId,
  onConfirm,
}) => {
  const [selectedRole, setSelectedRole] = useState<string>("follower");

  const handleConfirm = () => {
    if (registrationMode === RegistrationModeEnum.COUPLE) {
      onConfirm?.(selectedRole);
    } else {
      onConfirm?.();
    }
    onOpenChange(false);
  };

  const renderContent = () => {
    switch (registrationMode) {
      case RegistrationModeEnum.OPEN:
        return (
          <>
            <DialogDescription>
              Are you sure you want to register for this event?
            </DialogDescription>
          </>
        );

      case RegistrationModeEnum.COUPLE:
        return (
          <>
            <DialogDescription>
              Are you sure you want to register for this event? Please select your role.
            </DialogDescription>
            <div className="py-4">
              <RoleSelect value={selectedRole} onChange={setSelectedRole} />
            </div>
          </>
        );

      case RegistrationModeEnum.GOOGLE_FORM:
        return (
          <>
            <DialogDescription>
              This event uses Google Forms for registration. You will be redirected to the form to complete your registration.
            </DialogDescription>
            {formId && (
              <div className="py-4">
                <a
                  href={`https://docs.google.com/forms/d/${formId}/viewform`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Open Registration Form
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (registrationMode) {
      case RegistrationModeEnum.OPEN:
        return "Confirm Registration";
      case RegistrationModeEnum.COUPLE:
        return "Register for Event";
      case RegistrationModeEnum.GOOGLE_FORM:
        return "External Registration";
      default:
        return "Registration";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        {renderContent()}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {registrationMode !== RegistrationModeEnum.GOOGLE_FORM && (
            <Button onClick={handleConfirm}>
              Confirm Registration
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
