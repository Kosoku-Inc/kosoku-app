import { createAction } from '@reduxjs/toolkit';

import { CardBrand } from '../../model/brand.model';
import { PaymentMethod } from '../../model/payment-method.model';

export type AddCardPayload = {
    lastFour: string;
    holder: string;
    exp: string;
    brand: CardBrand;
};

export type PayPayload = {
    amount: number;
};

export const GET_PAYMENT_METHODS = {
    TRIGGER: createAction('[Get Payment Methods] Trigger'),
    STARTED: createAction('[Get Payment Methods] Started'),
    COMPLETED: createAction<Array<PaymentMethod>>('[Get Payment Methods] Completed'),
    FAILED: createAction<Error>('[Get Payment Methods] Failed'),
};

export const REMOVE_PAYMENT_METHOD = {
    TRIGGER: createAction<number>('[Remove Payment Method] Trigger'),
    STARTED: createAction('[Remove Payment Method] Started'),
    COMPLETED: createAction('[Remove Payment Method] Completed'),
    FAILED: createAction<Error>('[Remove Payment Method] Failed'),
};

export const SET_AS_DEFAULT_PAYMENT_METHOD = {
    TRIGGER: createAction<number>('[Set As Default Payment Method] Trigger'),
    STARTED: createAction('[Set As Default Payment Methods] Started'),
    COMPLETED: createAction('[Set As Default Payment Method] Completed'),
    FAILED: createAction<Error>('[Set As Default Payment Method] Failed'),
};

export const ADD_CARD = {
    TRIGGER: createAction<AddCardPayload>('[Add Card] Trigger'),
    STARTED: createAction('[Add Card] Started'),
    COMPLETED: createAction('[Add Card] Completed'),
    FAILED: createAction<Error>('[Add Card] Failed'),
};

export const PAY = {
    TRIGGER: createAction<PayPayload>('[Pay] Trigger'),
    STARTED: createAction('[Pay] Started'),
    COMPLETED: createAction('[Pay] Completed'),
    FAILED: createAction<Error>('[Pay] Failed'),
};
