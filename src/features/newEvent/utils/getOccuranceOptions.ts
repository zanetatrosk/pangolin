import { RecurrenceType } from "../types";

export const getOccurrenceOptions = () => {
    return [
        { label: "Daily", value: RecurrenceType.Daily },
        { label: "Weekly", value: RecurrenceType.Weekly },
        { label: "Monthly", value: RecurrenceType.Monthly },
    ];
}