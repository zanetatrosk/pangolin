import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { MobileStepper, Step } from "../newEvent/MobileStepper";
import { BasicDetails, BasicDetailsData } from "../newEvent/BasicDetails";
import { DesktopStepper } from "../newEvent/DesktopStepper";

// Placeholder components for future steps
const DescriptionStep = ({ onValidate }: any) => {
  onValidate(true); // Always valid for now
  return (
    <div className="p-4">
      <p className="text-muted-foreground">Description step - Coming soon</p>
    </div>
  );
};

const MediaStep = ({ onValidate }: any) => {
  onValidate(true); // Optional step
  return (
    <div className="p-4">
      <p className="text-muted-foreground">Media upload step - Coming soon</p>
    </div>
  );
};

export function NewEventPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<BasicDetailsData>>({});

  const handleBasicDetailsChange = useCallback((data: BasicDetailsData) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleComplete = () => {
    console.log("Form completed with data:", formData);
    // TODO: Submit to backend
  };

  const steps: Step[] = [
    {
      id: "basic-details",
      title: "Event Details",
      component: (props) => (
        <BasicDetails
          {...props}
          initialData={formData}
          onDataChange={handleBasicDetailsChange}
        />
      ),
    },
    {
      id: "description-details",
      title: "Description & Details",
      component: (props) => <DescriptionStep {...props} />,
      optional: true,
    },
    {
      id: "media-details",
      title: "Photos & Media",
      component: MediaStep,
      optional: true,
    },
  ];

  return (
    <>
      {/* Mobile Stepper */}
      <MobileStepper steps={steps} onComplete={handleComplete} />

      {/* Desktop Version */}
      <div className="hidden md:block container mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-6">{t("nav.addEvent")}</h1>
        <p className="text-muted-foreground mb-6">{t("nav.addEventDesc")}</p>

        <Card>
          <CardContent className="space-y-6">
            <DesktopStepper steps={steps}/>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
