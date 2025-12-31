import { formOptions } from "@tanstack/react-form";
import { DanceEventCreation } from "./types";
import { PRICE_TYPE } from "../eventsList/components/EventCard";

const eventFormDefaults: DanceEventCreation = {
  basicInfo: {
    eventName: "",
    location: "",
    date: "",
    time: "",
    isRecurring: false,
    endDate: "",
    price: {
      priceType: PRICE_TYPE.FREE,
      priceMin: undefined,
      priceMax: undefined,
      currency: undefined,
      priceExact: undefined,
    },
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
