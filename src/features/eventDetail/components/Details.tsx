import { Info } from "lucide-react";
import { AdditionalDetailsData } from "../types";
import { useTranslation } from "react-i18next";
import { DetailsTagSection } from "./DetailsTagSection";

export const Details: React.FC<{
  additionalDetails?: AdditionalDetailsData;
}> = ({ additionalDetails }) => {
    const { t } = useTranslation();
    return (
        <div className="rounded-xl bg-white dark:bg-card p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                {t("eventDetail.details.title")}
              </h3>
              <div className="mt-4 space-y-4">
                <DetailsTagSection
                  label={t("eventDetail.details.eventType")}
                  items={additionalDetails?.typeOfEvent}
                  itemClassName="rounded-md bg-blue-50 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 ring-blue-700/10 dark:ring-blue-400/20"
                />

                <DetailsTagSection
                  label={t("eventDetail.details.styles")}
                  items={additionalDetails?.danceStyles}
                  itemClassName="rounded-full bg-rose-50 dark:bg-rose-400/10 text-rose-700 dark:text-rose-400 ring-rose-700/10 dark:ring-rose-400/20"
                />

                <DetailsTagSection
                  label={t("eventDetail.details.level")}
                  items={additionalDetails?.skillLevel}
                  itemClassName="rounded-md bg-gray-50 dark:bg-gray-400/10 text-gray-600 dark:text-gray-400 ring-gray-500/10 dark:ring-gray-400/20"
                />
              </div>
            </div>
    )
}