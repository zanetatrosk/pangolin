import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface StepComponentProps {
  onValidate: (isValid: boolean) => void;
  onNext?: () => void;
}

export interface Step {
  title: string;
  component: (props: StepComponentProps) => React.ReactNode;
  optional?: boolean;
}

interface MobileStepperProps {
  steps: Step[];
  onComplete?: (data: any) => void;
}

export const MobileStepper: React.FC<MobileStepperProps> = ({ 
  steps, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [canProceed, setCanProceed] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepConfig = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleValidationChange = (isValid: boolean) => {
    setCanProceed(isValid || currentStepConfig.optional || false);
  };

  const moveToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setCanProceed(true); // Can always go back
    }
  };

  const moveToNextStep = () => {
    if (!canProceed && !currentStepConfig.optional) {
      return; // Don't proceed if validation failed
    }

    // Mark current step as completed
    setCompletedSteps((prev) => new Set(prev).add(currentStep));

    if (isLastStep) {
      // Complete the form
      onComplete?.({});
    } else {
      setCurrentStep((prev) => prev + 1);
      setCanProceed(false); // Reset for next step
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:hidden bg-background">
      {/* Header with Progress */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              {currentStepConfig.optional && (
                <Badge variant="outline" className="text-xs">
                  Optional
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {currentStepConfig.title}
            </h2>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        {currentStepConfig.component({
          onValidate: handleValidationChange,
          onNext: moveToNextStep,
        })}
      </div>

      {/* Footer with Navigation */}
      <div className="sticky bottom-0 z-10 bg-background shadow-lg">
        <div className="p-4 flex gap-3">
          <Button
            variant="outline"
            onClick={moveToPreviousStep}
            disabled={isFirstStep}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <Button
            onClick={moveToNextStep}
            disabled={!canProceed && !currentStepConfig.optional}
            className="flex-1"
          >
            {isLastStep ? "Complete" : "Next"}
            {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
