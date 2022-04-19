import { CarClass } from './car-class.model';
import { Gender } from './gender.model';

export type Driver = {
    carBrand: string;
    carClass: CarClass;
    balance: number;
};

export type User = {
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    driver?: Driver;
};
