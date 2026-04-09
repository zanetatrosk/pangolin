import { ErrorAlert } from "@/components/ui/error-alert";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function EventCancelledAlert() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-6xl px-4 lg:px-0 mt-2 mb-6">
      <ErrorAlert
        className="border-2"
        icon={<XCircle className="h-5 w-5" />}
        titleClassName="text-lg font-bold"
        descriptionClassName="text-base"
        title={t("eventDetail.alerts.eventCancelledTitle")}
        description={t("eventDetail.alerts.eventCancelledDescription")}
      />
    </div>
  );
}
