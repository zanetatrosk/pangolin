import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function EventCancelledAlert() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-6xl px-4 lg:px-0 mt-2 mb-6">
      <Alert variant="destructive" className="border-2">
        <XCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-bold">
          {t("eventDetail.alerts.eventCancelledTitle")}
        </AlertTitle>
        <AlertDescription className="text-base">
          {t("eventDetail.alerts.eventCancelledDescription")}
        </AlertDescription>
      </Alert>
    </div>
  );
}
