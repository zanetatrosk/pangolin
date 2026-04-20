import { Label } from "@/components/ui/label";
import { CodebookItem } from "@/services/types";
import { useTranslation } from "react-i18next";

export const DanceStylesPicker = ({
  options,
  selectedStyles,
  onToggle,
}: {
  options: CodebookItem[];
  selectedStyles: CodebookItem[];
  onToggle: (option: CodebookItem, checked: boolean) => void;
}) => {
  const { t } = useTranslation();
  const selectedIds = new Set(selectedStyles.map((style) => style.id));

  return (
    <div className="space-y-2 text-left">
      <Label>{t("profile.danceStyles")}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border rounded-md bg-background/50 max-h-80 overflow-y-auto">
        {options.map((option) => {
          const optionId = option.id;
          return (
            <div
              key={optionId}
              className="flex items-center space-x-2 p-2 rounded hover:bg-accent/50 transition-colors"
            >
              <input
                type="checkbox"
                id={`style-${optionId}`}
                checked={selectedIds.has(optionId)}
                onChange={(e) => onToggle(option, e.target.checked)}
                className="h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary cursor-pointer"
              />
              <Label
                htmlFor={`style-${optionId}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {option.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}