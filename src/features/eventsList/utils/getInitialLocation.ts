import { SearchProps } from "@/routes/events.index";
import { PlaceOption } from "@/services/get-places-api";

export const getInitialLocation = (initialSearchParams?: SearchProps): PlaceOption | undefined => {
    const initialCity = initialSearchParams?.city?.trim() ?? "";
    const initialCountry = initialSearchParams?.country?.trim() ?? "";
    const initialLocationLabel = [initialCity, initialCountry]
      .filter(Boolean)
      .join(", ");
    return initialLocationLabel
      ? {
          value: initialLocationLabel,
          label: initialLocationLabel,
          locationData: {
            name: "",
            street: "",
            city: initialCity,
            state: initialSearchParams?.state ?? "",
            country: initialCountry,
            postalCode: "",
            houseNumber: "",
          },
        }
      : undefined;
  };