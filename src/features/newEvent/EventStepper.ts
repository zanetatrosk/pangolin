import { defineStepper } from "@/components/ui/stepper";
import { StepBase } from "./DesktopStepper";


const steps: StepBase[] = [
    {
        id: "basic-details",
        title: "Event Details",
    },
    {
        id: "description-details",
        title: "Description & Details",
    },
    {
        id: "media-details",
        title: "Photos & Media",
    },
];
export const EventStepper = defineStepper(
    ...steps
);
