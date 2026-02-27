import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GoogleFormIntegration } from "@/features/eventDetail/publish-actions/GoogleFormIntegration";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

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

const publishedEventOptions = [
  {
    value: RegistrationModeEnum.OPEN,
    label: "Open Registration",
    description: "Anyone can register regarding of role",
    component: null,
  },
  {
    value: RegistrationModeEnum.COUPLE,
    label: "Couple Registration",
    description: "Registrations require question for role",
    component: null,
  },
  {
    value: RegistrationModeEnum.GOOGLE_FORM,
    label: "Google Form Integration",
    description:
      "Registration is done through Google Forms and users are connected through email",
  },
];

interface PublishEventOptionsProps {
  value: PublishPayload;
  onChange: (value: PublishPayload) => void;
}

export const PublishEventOptions: React.FC<PublishEventOptionsProps> = ({
  value,
  onChange,
}) => {
  const onRegistrationModeChange = (mode: RegistrationModeEnum) => {
    onChange({ ...value, registrationMode: mode });
  };


  return (
    <div className="space-y-4 py-4">
      <div>
        <h4 className="font-medium mb-3">Registration Mode</h4>
        <RadioGroup
          value={value.registrationMode}
          onValueChange={onRegistrationModeChange}
        >
          {publishedEventOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-2 mb-3">
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
          {
            value.registrationMode === RegistrationModeEnum.GOOGLE_FORM && (
              <GoogleFormIntegration
                value={value.formId || ""}
                onChange={(formId) => onChange({ ...value, formId })}
              />
            )
          }
        </div>
        <div className="space-y-4">
          <h4 className="font-medium mb-3">Additional features</h4>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox
                checked={value.requireApproval}
                onCheckedChange={(checked) =>
                  onChange({ ...value, requireApproval: !!checked })
                }
              />
              <FieldLabel>
                Organizer needs to approve registrations
              </FieldLabel>
            </Field>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
};
