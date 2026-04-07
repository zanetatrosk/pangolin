import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface StepComponentProps {
  onValidate?: (isValid: boolean) => void;
  onNext?: () => void;
}

export interface Step {
  id: string;
  title: string;
  component: () => React.ReactNode;
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
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepConfig = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const moveToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const moveToNextStep = () => {
    if (isLastStep) {
      setCurrentStep(0);
      onComplete?.({});
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:hidden bg-background">
      {/* Header with Progress */}
      <div className="top-0 bg-background">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">
                {t("newEvent.stepper.stepProgress", { current: currentStep + 1, total: steps.length })}
              </span>
              {currentStepConfig.optional && (
                <Badge variant="outline" className="text-xs">
                  {t("newEvent.stepper.optional")}
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
        {currentStepConfig.component()}
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
            {t("newEvent.stepper.back")}
          </Button>
          
          <Button
            onClick={moveToNextStep}
            className="flex-1"
          >
            {isLastStep ? t("newEvent.stepper.complete") : t("newEvent.stepper.next")}
            {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
