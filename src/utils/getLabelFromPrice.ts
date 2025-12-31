import { Price, PRICE_TYPE } from "@/features/eventsList/components/EventCard";

export const getLabelFromPrice = (price?: Price): string => {
    switch (price?.priceType) {
        case PRICE_TYPE.FREE:
            return "Free";
        case PRICE_TYPE.EXACT:
            return `${price.currency} ${price.priceExact?.toFixed(2)}`;
        case PRICE_TYPE.RANGE:
            return `${price.currency} ${price.priceMin?.toFixed(2)} - ${price.priceMax?.toFixed(2)}`;
        default:
            return "N/A";
    }
};