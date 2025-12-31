import { SelectOption } from "@/components/form/FormSelectField";

const PLACES_API_URL = "https://photon.komoot.io/api/";
const LIMIT = 2;
export const getPlaces = async (query: string): Promise<SelectOption[]> => {
    const response = await fetch(`${PLACES_API_URL}?q=${encodeURIComponent(query)}&limit=${LIMIT}`);
    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }
    const data = await response.json();
    const places: SelectOption[] = data.features.map((feature: any) => ({
        value: feature.properties.name,
        label: feature.properties.name + ", " + feature.properties.city + ", " + feature.properties.country,
    }));
    return places;
}