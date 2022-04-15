import { createAction } from '@reduxjs/toolkit';

import { CarClass } from '../../../../core/model/car-class.model';
import { Gender } from '../../../../core/model/gender.model';
import { User } from '../../../../core/model/user.model';

export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = LoginPayload & {
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

export const LOGIN = {
    TRIGGER: createAction<LoginPayload>('[Login] Trigger'),
    STARTED: createAction('[Login] Started'),
    COMPLETED: createAction<User>('[Login] Completed'),
    FAILED: createAction<Error>('[Login] Failed'),
};

export const REGISTER = {
    TRIGGER: createAction<RegisterPayload>('[Register] Trigger'),
    STARTED: createAction('[Register] Started'),
    COMPLETED: createAction<User>('[Register] Completed'),
    FAILED: createAction<Error>('[Register] Failed'),
};

export const LOGOUT = {
    TRIGGER: createAction('[Logout] Trigger'),
    COMPLETED: createAction('[Logout] Completed'),
};
