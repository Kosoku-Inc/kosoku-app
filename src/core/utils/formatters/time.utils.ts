import {Optional} from '../../model/optional.model';

export const toReadableTime = (time?: Optional<number>): string => {
    if(!time) return '';

    const str = new Date(time).toTimeString();

    return str.substring(0, str.indexOf(':', str.indexOf(':') + 1));
};

export const toReadableDate = (time?: Optional<number>): string => {
    if(!time) return '';

    const date = new Date(time);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${date.getFullYear()}`;
};
