import { useIsMobile } from "@/hooks/useIsMobile";
import React from "react";
import { MobileStepper, Step } from "./MobileStepper";
import { BasicDetails } from "./BasicDetailsStep";
import { DesktopStepper } from "./DesktopStepper";
import { Card, CardContent } from "@/components/ui/card";
import { t } from "i18next";
import { EventStepper } from "./EventStepper";
import { useAppForm } from "@/lib/form";
import { EventDescriptionStep } from "./EventDescriptionStep";
import { EventMediaStep } from "./EventMediaStep";
import { EventDetailsStep } from "./EventDetailsStep";
import { UseMutationResult } from "@tanstack/react-query";
import { DanceEventCreation } from "./types";
import { useTranslation } from "react-i18next";

export interface FormParentProps {
  eventMutation:  UseMutationResult<any, Error, DanceEventCreation, unknown>;
  eventFormOpts: {
    defaultValues: DanceEventCreation;
  };
  isEditing?: boolean;
}

export const FormParent: React.FC<FormParentProps> = ({ eventMutation, eventFormOpts, isEditing = false }) => {
  const { t } = useTranslation();
  const form = useAppForm({
    ...eventFormOpts,
    onSubmit: async ({ value }) => {
      console.log("Form submitted with values:", value);
      console.log("Validating form before submission...", form.getAllErrors());
      const isValid = form.getAllErrors().form.errors.length === 0;
      if (!isValid) {
        console.log("Form has errors, cannot submit:", form.getAllErrors());
        return;
      }
      eventMutation.mutate(value);
    },
  });
  const isMobile = useIsMobile();
  const [isValid, setIsValid] = React.useState(true);
  const steps: Step[] = [
    {
      id: "basic-details",
      title: t("newEvent.steps.basicDetails"),
      component: () => <BasicDetails form={form} isEditing={isEditing} />,
    },
    {
      id: "description-details",
      title: t("newEvent.steps.description"),
      component: () => <EventDescriptionStep form={form} />,
      optional: true,
    },
    {
      id: "media-details",
      title: t("newEvent.steps.media"),
      component: () => <EventMediaStep form={form} />,
      optional: true,
    },
    {
      id: "additional-details",
      title: t("newEvent.steps.additionalDetails"),
      component: () => <EventDetailsStep form={form} />,
      optional: false,
    },
  ];
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsValid(form.state.isValid);
        void form.handleSubmit();
      }}
      className="space-y-6"
    >
      {isMobile ? (
        <MobileStepper steps={steps} onComplete={form.handleSubmit} />
      ) : (
        <div className="hidden md:block container mx-auto max-w-6xl p-6">
          <h1 className="text-3xl font-bold mb-6">{t("nav.addEvent")}</h1>
          <p className="text-muted-foreground mb-6">{t("nav.addEventDesc")}</p>

          <Card>
            <CardContent className="space-y-6">
              <DesktopStepper
                steps={steps}
                stepper={EventStepper}
                showAlert={!isValid}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </form>
  );
};
