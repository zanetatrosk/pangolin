import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Description: React.FC<{ description?: string }> = ({
  description,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  const TRUNCATE_LENGTH = 500;
  const isLongText = description.length > TRUNCATE_LENGTH;

  const displayedText =
    isLongText && !isExpanded
      ? `${description.substring(0, TRUNCATE_LENGTH)}...`
      : description;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold mb-4">{t("eventDetail.description.aboutEvent")}</h2>
      <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
        {displayedText}
      </p>
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary font-semibold hover:underline mt-2 cursor-pointer"
        >
          {isExpanded ? t("eventDetail.description.showLess") : t("eventDetail.description.showMore")}
        </button>
      )}
    </div>
  );
};
