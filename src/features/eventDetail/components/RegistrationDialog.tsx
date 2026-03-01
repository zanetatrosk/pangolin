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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RoleSelect } from "../publish-actions/RoleSelect";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationMode: RegistrationModeEnum;
  formId?: string;
  onConfirm?: (role?: string, isAnonymous?: boolean) => void;
}

export const RegistrationDialog: FC<RegistrationDialogProps> = ({
  open,
  onOpenChange,
  registrationMode,
  formId,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<string>("follower");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const handleConfirm = () => {
    if (registrationMode === RegistrationModeEnum.COUPLE) {
      onConfirm?.(selectedRole, isAnonymous);
    } else {
      onConfirm?.(undefined, isAnonymous);
    }
    onOpenChange(false);
  };

  const renderContent = () => {
    switch (registrationMode) {
      case RegistrationModeEnum.OPEN:
        return (
          <>
            <DialogDescription>
              {t("eventDetail.registrationDialog.confirmMessage")}
            </DialogDescription>
            <div className="flex items-center space-x-2 py-4">
              <Checkbox
                id="anonymous-open"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <Label
                htmlFor="anonymous-open"
                className="text-sm font-normal cursor-pointer"
              >
                {t("eventDetail.registrationDialog.makeAnonymous")}
              </Label>
            </div>
          </>
        );

      case RegistrationModeEnum.COUPLE:
        return (
          <>
            <DialogDescription>
              {t("eventDetail.registrationDialog.confirmMessageWithRole")}
            </DialogDescription>
            <div className="py-4">
              <RoleSelect value={selectedRole} onChange={setSelectedRole} />
            </div>
            <div className="flex items-center space-x-2 pb-4">
              <Checkbox
                id="anonymous-couple"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <Label
                htmlFor="anonymous-couple"
                className="text-sm font-normal cursor-pointer"
              >
                {t("eventDetail.registrationDialog.makeAnonymous")}
              </Label>
            </div>
          </>
        );

      case RegistrationModeEnum.GOOGLE_FORM:
        return (
          <>
            <DialogDescription>
              {t("eventDetail.registrationDialog.googleFormMessage")}
            </DialogDescription>
            {formId && (
              <div className="py-4">
                <a
                  href={`https://docs.google.com/forms/d/${formId}/viewform`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  {t("eventDetail.registrationDialog.openRegistrationForm")}
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
        return t("eventDetail.registrationDialog.confirmRegistration");
      case RegistrationModeEnum.COUPLE:
        return t("eventDetail.registrationDialog.registerForEvent");
      case RegistrationModeEnum.GOOGLE_FORM:
        return t("eventDetail.registrationDialog.externalRegistration");
      default:
        return t("eventDetail.registrationDialog.registration");
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
            {t("eventDetail.registrationDialog.cancel")}
          </Button>
          {registrationMode !== RegistrationModeEnum.GOOGLE_FORM && (
            <Button onClick={handleConfirm}>
              {t("eventDetail.registrationDialog.confirm")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
