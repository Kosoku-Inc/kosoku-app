import {Optional} from '../../model/optional.model';

export const toReadableTime = (time?: Optional<string | number>): string => {
    if(!time) return '';

    const parsed = typeof time === 'number' ? time : Number.parseInt(time);

    const str = new Date(parsed).toTimeString();

    return str.substring(0, str.indexOf(':', str.indexOf(':') + 1));
};

export const toReadableDate = (time?: Optional<string | number>): string => {
    if(!time) return '';

    const parsed = typeof time === 'number' ? time : Number.parseInt(time);

    const date = new Date(parsed);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${date.getFullYear()}`;
};
