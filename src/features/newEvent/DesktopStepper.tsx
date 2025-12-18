import { Button } from "@/components/ui/button";
import { defineStepper } from "@/components/ui/stepper";
import { Step } from "./MobileStepper";

export interface StepBase {
  id: string;
  title: string;
}
interface DesktopStepperProps {
  steps: Step[];
  stepper: ReturnType<typeof defineStepper<StepBase[]>>;
}

export const DesktopStepper: React.FC<DesktopStepperProps> = ({ steps, stepper }) => {
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
          <Stepper.Controls>
            {!methods.isFirst && (
              <Button
                type="button"
                variant="secondary"
                onClick={methods.prev}
              >
                Previous
              </Button>
            )}
            {!methods.isLast && (
              <Button 
                type="button"
                onClick={methods.next}
              >
                Next
              </Button>
            )}
            {methods.isLast && (
              <Button type="submit">
                Submit
              </Button>
            )}
          </Stepper.Controls>
        </>
      )}
    </Stepper.Provider>
  );
};
