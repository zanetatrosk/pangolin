import { SearchProps } from "@/routes/events.index";


export const parseArrayParamToQuery = (key: string, values: string[] | null): string => {
    if (!values || values.length === 0) {
        return "";
    }
    return `&${key}=` + values.join();
}

export const convertSearchParamsToQuery = (searchParams?: SearchProps): string => {
    let query = "";
    if (!searchParams) {
        return query;
    }
    if (searchParams.eventName) {
        query += `&eventName=${searchParams.eventName}`;
    }
    if (searchParams.city) {
        query += `&city=${searchParams.city}`;
    }
    if (searchParams.country) {
        query += `&country=${searchParams.country}`;
    }
    query += parseArrayParamToQuery("eventTypes", searchParams.eventTypes);
    query += parseArrayParamToQuery("danceStyles", searchParams.danceStyles);

    return encodeURI(query);
};
