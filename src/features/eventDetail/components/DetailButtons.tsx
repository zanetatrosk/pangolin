import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XCircle, Share2 } from "lucide-react";
import { RsvpData, RsvpStatus } from "@/services/types";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { ActionButtons } from "./ActionButtons";
import { useTranslation } from "react-i18next";

export const DetailButtons: React.FC<{
  rsvpData: RsvpData;
  registrationMode: RegistrationModeEnum;
  formId?: string;
}> = ({ rsvpData, registrationMode, formId }) => {
  const { t } = useTranslation();
  const isRejected = rsvpData.status === RsvpStatus.Rejected;
  const isGoogleForm = registrationMode === RegistrationModeEnum.GOOGLE_FORM;
  const isRegistered = rsvpData.status === RsvpStatus.Registered;
  const isPending = rsvpData.status === RsvpStatus.Pending;

  return (
    <>
      {isRejected && (
        <Alert variant="destructive" className="mb-4">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            {t("eventDetail.alerts.registrationRejected")}
          </AlertDescription>
        </Alert>
      )}

      {isGoogleForm && (isRegistered || isPending) && (
        <Alert className="mb-4">
          <AlertDescription>
            {t("eventDetail.alerts.googleFormRegistration")}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-3 order-1 lg:order-0">
        <ActionButtons
          rsvpData={rsvpData}
          registrationMode={registrationMode}
          formId={formId}
          interestedClassName="flex-1 md:flex-none"
          joinClassName="flex-1 md:flex-none"
          buttonSize="lg"
        />
        <Button variant="ghost" size="icon">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
};
