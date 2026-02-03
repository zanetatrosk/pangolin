import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GoogleFormIntegration } from "@/features/eventDetail/publish-actions/GoogleFormIntegration";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export type RegistrationMode = "open" | "couple" | "googForm";

const publishedEventOptions = [
  {
    value: "open",
    label: "Open Registration",
    description: "Anyone can register regarding of role",
    component: null,
  },
  {
    value: "couple",
    label: "Couple Registration",
    description: "Registrations require question for role",
    component: null,
  },
  {
    value: "googForm",
    label: "Google Form Integration",
    description:
      "Registration is done through Google Forms and users are connected through email",
    component: <GoogleFormIntegration />,
  },
];

export const PublishEventOptions: React.FC = () => {
  const [registrationMode, setRegistrationMode] =
    useState<RegistrationMode>("open");

  const onRegistrationModeChange = (mode: RegistrationMode) => {
    setRegistrationMode(mode);
  };

  return (
    <div className="space-y-4 py-4">
      <div>
        <h4 className="font-medium mb-3">Registration Mode</h4>
        <RadioGroup
          value={registrationMode}
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
            publishedEventOptions.find(
              (option) => option.value === registrationMode,
            )?.component
          }
        </div>
        <div className="space-y-4">
          <h4 className="font-medium mb-3">Additional features</h4>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox />
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
