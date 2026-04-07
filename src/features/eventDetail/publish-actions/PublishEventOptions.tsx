import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GoogleFormIntegration } from "@/features/eventDetail/publish-actions/GoogleFormIntegration";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useTranslation } from "react-i18next";

export enum RegistrationModeEnum {
  OPEN = "OPEN",
  COUPLE = "COUPLE",
  GOOGLE_FORM = "GOOGLE_FORM",
}

export interface PublishPayload {
  registrationMode: RegistrationModeEnum;
  formId?: string;
  requireApproval: boolean;
  allowWaitlist?: boolean;
}

interface PublishEventOptionsProps {
  value: PublishPayload;
  onChange: (value: PublishPayload) => void;
}

export const PublishEventOptions: React.FC<PublishEventOptionsProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  const publishedEventOptions = [
    {
      value: RegistrationModeEnum.OPEN,
      label: t("eventDetail.publishOptions.openRegistration"),
      description: t("eventDetail.publishOptions.openRegistrationDesc"),
      component: null,
    },
    {
      value: RegistrationModeEnum.COUPLE,
      label: t("eventDetail.publishOptions.coupleRegistration"),
      description: t("eventDetail.publishOptions.coupleRegistrationDesc"),
      component: null,
    },
    {
      value: RegistrationModeEnum.GOOGLE_FORM,
      label: t("eventDetail.publishOptions.googleForm"),
      description: t("eventDetail.publishOptions.googleFormDesc"),
    },
  ];
  const onRegistrationModeChange = (mode: RegistrationModeEnum) => {
    onChange({ ...value, registrationMode: mode });
  };

  return (
    <div className="space-y-4 py-4">
      <div>
        <h4 className="font-medium mb-3">
          {t("eventDetail.publishOptions.registrationMode")}
        </h4>
        <RadioGroup
          value={value.registrationMode}
          onValueChange={onRegistrationModeChange}
        >
          {publishedEventOptions.map((option) => (
            <div
              key={option.value}
              className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-start sm:gap-3 sm:rounded-none sm:border-0 sm:p-0"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor={option.value} className="font-medium">
                  {option.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
        <div className="my-4">
          {value.registrationMode === RegistrationModeEnum.GOOGLE_FORM && (
            <GoogleFormIntegration
              value={value.formId || ""}
              onChange={(formId) => onChange({ ...value, formId })}
            />
          )}
        </div>
        <div className="space-y-4">
          <h4 className="font-medium mb-3">
            {t("eventDetail.publishOptions.additionalFeatures")}
          </h4>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox
                checked={value.requireApproval}
                onCheckedChange={(checked) =>
                  onChange({ ...value, requireApproval: !!checked })
                }
              />
              <FieldLabel>
                {t("eventDetail.publishOptions.requireApproval")}
              </FieldLabel>
            </Field>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
};
