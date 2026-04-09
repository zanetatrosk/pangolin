import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircle } from "lucide-react";
import { RsvpData, RsvpStatus } from "@/services/types";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { ActionButtons } from "./ActionButtons";
import { useTranslation } from "react-i18next";
import { ErrorAlert } from "@/components/ui/error-alert";

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
        <ErrorAlert
          className="mb-4"
          icon={<XCircle className="h-4 w-4" />}
          title={t("eventDetail.alerts.registrationRejectedTitle", {
            defaultValue: "Registration rejected",
          })}
          description={t("eventDetail.alerts.registrationRejected")}
        />
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
      </div>
    </>
  );
};
