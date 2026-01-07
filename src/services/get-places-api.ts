import { SelectOption } from "@/components/form/FormSelectField";
import { Location } from "@/features/newEvent/types";

const PLACES_API_URL = "https://photon.komoot.io/api/";
const LIMIT = 5;

export interface PlaceOption extends SelectOption {
  locationData: Location;
}

export const getPlaces = async (query: string): Promise<PlaceOption[]> => {
    const response = await fetch(`${PLACES_API_URL}?q=${encodeURIComponent(query)}&layer=house&limit=${LIMIT}`);
    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }
    const data = await response.json();
    const places: PlaceOption[] = data.features.map((feature: any) => {
        const props = feature.properties;
        return {
            value: props.name || props.street || props.city,
            label: [props.name, props.street, props.city, props.country].filter(Boolean).join(", "),
            locationData: {
                name: props.name || "",
                street: props.street || "",
                houseNumber: props.housenumber || "",
                city: props.city || "",
                state: props.state || "",
                postalCode: props.postcode || "",
                country: props.country || "",
            },
        };
    });
    return places;
}