import { Button } from "@/components/ui/button";
import { defineStepper } from "@/components/ui/stepper";
import { Step } from "./MobileStepper";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export interface StepBase {
  id: string;
  title: string;
}
interface DesktopStepperProps {
  steps: Step[];
  stepper: ReturnType<typeof defineStepper<StepBase[]>>;
  showAlert?: boolean;
  alertTitle?: string;
  alertMessage?: string;
}

export const DesktopStepper: React.FC<DesktopStepperProps> = ({ steps, stepper, showAlert, alertTitle, alertMessage }) => {
  const { t } = useTranslation();
  const Stepper = stepper.Stepper;
  return (
    <Stepper.Provider className="space-y-4">
      {({ methods }) => (
        <>
          <Stepper.Navigation>
            {methods.all.map((step) => (
              <Stepper.Step key={step.id} of={step.id} onClick={() => methods.goTo(step.id)}>
                <Stepper.Title>{step.title}</Stepper.Title>
              </Stepper.Step>
            ))}
          </Stepper.Navigation>
          <Stepper.Panel>
            {(() => {
              const currentStep = steps.find(step => step.id === methods.current.id);
              if (!currentStep) return null;
              return currentStep.component();
            })()}
          </Stepper.Panel>
          {showAlert && methods.isLast && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {alertTitle ?? t("newEvent.stepper.errorTitle", {
                  defaultValue: "Please review required fields",
                })}
              </AlertTitle>
              <AlertDescription>
                {alertMessage ?? t("newEvent.stepper.errorMessage")}
              </AlertDescription>
            </Alert>
          )}
          <Stepper.Controls>
            {!methods.isFirst && (
              <Button
                type="button"
                variant="secondary"
                onClick={methods.prev}
              >
                {t("newEvent.stepper.previous")}
              </Button>
            )}
            {!methods.isLast && (
              <Button 
                type="button"
                onClick={methods.next}
              >
                {t("newEvent.stepper.next")}
              </Button>
            )}
            {methods.isLast && (
              <Button type="submit">
                {t("newEvent.stepper.submit")}
              </Button>
            )}
          </Stepper.Controls>
        </>
      )}
    </Stepper.Provider>
  );
};
