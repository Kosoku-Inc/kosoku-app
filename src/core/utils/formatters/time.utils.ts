export const toReadableTime = (time: number): string => {
    const str = new Date(time).toTimeString();

    return str.substring(0, str.indexOf(':', str.indexOf(':') + 1));
};

export const toReadableDate = (time: number): string => {
    const date = new Date(time);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${date.getFullYear()}`;
};
