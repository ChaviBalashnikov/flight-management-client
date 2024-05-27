
import dayjs from "dayjs";

export const convertDateTime = (input: string): string => {
    const [datePart, timePart] = input.split(' - ');
    const [day, month, year] = datePart.split('/');
    const formattedDateTime = `${year}-${month}-${day}T${timePart}`;
    return formattedDateTime;
}

export const calculateFlightDelay = (oldValue, newValue): number => {
    const oldDate = dayjs(convertDateTime(oldValue));
    const currentDate = dayjs(convertDateTime(newValue));
    const delay = currentDate.diff(oldDate, 'minute');
    return delay
}
