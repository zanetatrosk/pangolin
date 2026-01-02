
export const getLabelFromPrice = (price?: number, currency?: string): string => {
    if (!price && price !== 0 || !currency) {
        return "Not specified";
    }
    if( price === 0 ) {
        return "Free";
    }
    return `${price.toFixed(2)} ${currency}`;
};