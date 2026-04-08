import { useIsMobile } from "@/hooks/useIsMobile";
import React from "react";
import { MobileStepper, Step } from "./MobileStepper";
import { BasicDetails } from "./BasicDetailsStep";
import { DesktopStepper } from "./DesktopStepper";
import { Card, CardContent } from "@/components/ui/card";
import { EventStepper } from "./EventStepper";
import { useAppForm } from "@/lib/form";
import { EventDescriptionStep } from "./EventDescriptionStep";
import { EventMediaStep } from "./EventMediaStep";
import { EventDetailsStep } from "./EventDetailsStep";
import { UseMutationResult } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import { isAxiosError } from "axios";
import { DanceEventCreation } from "./types";
import { useTranslation } from "react-i18next";
import type { EventFormOptions } from "./FormOptions";

export interface FormParentProps {
  eventMutation:  UseMutationResult<any, Error, DanceEventCreation, unknown>;
  eventFormOpts: EventFormOptions;
  isEditing?: boolean;
}

export const FormParent: React.FC<FormParentProps> = ({ eventMutation, eventFormOpts, isEditing = false }) => {
  const { t } = useTranslation();
  const [hasSubmitAttempt, setHasSubmitAttempt] = React.useState(false);

  const getMutationErrorMessage = React.useCallback((error: unknown) => {
    if (!error) {
      return undefined;
    }

    if (isAxiosError(error)) {
      const responseMessage = error.response?.data?.message;
      if (typeof responseMessage === "string" && responseMessage.trim().length > 0) {
        return responseMessage;
      }
    }

    if (error instanceof Error && error.message.trim().length > 0) {
      return error.message;
    }

    return undefined;
  }, []);

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
  const isFormValid = useStore(form.store, (state) => state.isValid);
  const validationAlertMessage = hasSubmitAttempt && !isFormValid ? t("newEvent.stepper.errorMessage") : undefined;
  const mutationAlertMessage = hasSubmitAttempt ? getMutationErrorMessage(eventMutation.error) : undefined;
  const alertTitle = validationAlertMessage
    ? t("newEvent.stepper.errorTitle", { defaultValue: "Please review required fields" })
    : mutationAlertMessage
      ? t("newEvent.stepper.submitErrorTitle", { defaultValue: "Unable to save event" })
      : undefined;
  const alertMessage = validationAlertMessage ?? mutationAlertMessage;
  const showAlert = hasSubmitAttempt && (!isFormValid || Boolean(mutationAlertMessage));

  const handleSubmitAttempt = async () => {
    if (eventMutation.isError) {
      eventMutation.reset();
    }
    setHasSubmitAttempt(true);
    await form.handleSubmit();
  };
  const isMobile = useIsMobile();
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
        void handleSubmitAttempt();
      }}
      className="space-y-6"
    >
      {isMobile ? (
        <MobileStepper
          steps={steps}
          onComplete={handleSubmitAttempt}
          showAlert={showAlert}
          alertTitle={alertTitle}
          alertMessage={alertMessage}
        />
      ) : (
        <div className="hidden md:block container mx-auto max-w-6xl p-6">
          <h1 className="text-3xl font-bold mb-6">{t("nav.addEvent")}</h1>
          <p className="text-muted-foreground mb-6">{t("nav.addEventDesc")}</p>

          <Card>
            <CardContent className="space-y-6">
              <DesktopStepper
                steps={steps}
                stepper={EventStepper}
                showAlert={showAlert}
                alertTitle={alertTitle}
                alertMessage={alertMessage}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </form>
  );
};
