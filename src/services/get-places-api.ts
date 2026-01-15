import { SelectOption } from "@/components/form/FormSelectField";
import { Location } from "@/features/newEvent/types";

const PLACES_API_URL = "https://photon.komoot.io/api/";
const LIMIT = 5;
const LANG = "en";

export interface PlaceOption extends SelectOption {
  locationData: Location;
}

export const getPlaces = async (query: string, layers: string[], showLabels:(props: any) => string[]): Promise<PlaceOption[]> => {
    const layerParam = layers.map(l => `layer=${l}`).join('&');
    const response = await fetch(`${PLACES_API_URL}?q=${encodeURIComponent(query)}&${layerParam}&limit=${LIMIT}&lang=${LANG}`);
    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }
    const data = await response.json();
    const places: PlaceOption[] = data.features.map((feature: any) => {
        const props = feature.properties;
        return {
            value: props.osm_id.toString(),
            label: Array.from(new Set(showLabels(props).filter(Boolean))).join(", "),
            locationData: {
                name: props.name || "",
                street: props.street || "",
                houseNumber: props.housenumber || "",
                city: props.city || "",
                state: props.state || "",
                postalCode: props.postcode || "",
                country: props.country || "",
                [props.osm_value]: props.name || "",
            },
        };
    });
    return places;
}