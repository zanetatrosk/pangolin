import { formOptions } from "@tanstack/react-form";
import { DanceEventCreation } from "./types";

const eventFormDefaults: DanceEventCreation = {
  basicInfo: {
    eventName: "",
    location: {
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      houseNumber: "",
      country: "",
    },
    date: "",
    time: "",
    isRecurring: false,
    endDate: "",
    price: undefined,
    currency: undefined,
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
