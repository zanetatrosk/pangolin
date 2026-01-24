import { Location } from "@/features/newEvent/types";

export const renderAddress = (address: Location) => {
    const { houseNumber, street, city, state, postalCode, country, county } = address;
    const parts = [
        houseNumber,
        street,
        city,
        county,
        state,
        postalCode,
        country
    ].filter(Boolean); // Remove undefined or empty parts

    return parts.join(", ");
}