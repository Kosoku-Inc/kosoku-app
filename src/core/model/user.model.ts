import { CarClass } from './car-class.model';
import { Gender } from './gender.model';

export type User = {
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    driver?: {
        carBrand: string;
        carClass: CarClass;
        balance: number;
    };
};
