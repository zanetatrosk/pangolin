import { Button } from "@/components/ui/button";
import { defineStepper } from "@/components/ui/stepper";
import { Step } from "./MobileStepper";

interface DesktopStepperProps {
  steps: Step[];
}
export const DesktopStepper: React.FC<DesktopStepperProps> = ({ steps }) => {
  
  const { Stepper } = defineStepper(...steps);

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
              return currentStep.component({ 
                onValidate: () => {} 
              });
            })()}
          </Stepper.Panel>
          <Stepper.Controls>
            {!methods.isLast && (
              <Button
                type="button"
                variant="secondary"
                onClick={methods.prev}
                disabled={methods.isFirst}
              >
                Previous
              </Button>
            )}
            <Button onClick={methods.isLast ? methods.reset : methods.next}>
              {methods.isLast ? "Reset" : "Next"}
            </Button>
          </Stepper.Controls>
        </>
      )}
    </Stepper.Provider>
  );
};
