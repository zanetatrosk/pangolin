import { formOptions } from "@tanstack/react-form";
import { EventForm } from "./types";

const eventFormDefaults: EventForm = {
  basicInfo: {
    eventName: "",
    location: "",
    date: "",
    time: "",
    isRecurring: false,
    endDate: "",
    priceRange: "",
    priceExact: "",
  },
  additionalDetails: {
    danceStyles: [],
    skillLevel: [],
    typeOfEvent: [],
    maxAttendees: undefined,
    allowWaitlist: false,
    allowPartnerPairing: false,
  },
  description: "",
  coverImage: undefined,
  media: [],
};

export const eventFormOpts = formOptions({
  defaultValues: eventFormDefaults,
});
