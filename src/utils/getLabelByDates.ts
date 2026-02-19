export const getLabelByDates = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    if (end && start.toDateString() === end.toDateString()) {
        return start.toLocaleDateString(undefined, options);
    } else if (end) {
        const startLabel = start.toLocaleDateString(undefined, options);
        const endLabel = end.toLocaleDateString(undefined, options);
        return `${startLabel} - ${endLabel}`;
    } else {
        return start.toLocaleDateString(undefined, options);
    }
}