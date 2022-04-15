import { createReducer } from '@reduxjs/toolkit';

import {
    ADD_CARD,
    GET_PAYMENT_METHODS,
    PAY,
    REMOVE_PAYMENT_METHOD,
    SET_AS_DEFAULT_PAYMENT_METHOD,
} from './payments.actions';
import { PaymentsState } from './payments.types';

const initialState: PaymentsState = {
    list: {
        isLoading: false,
        error: null,
        data: null,
    },
    addCard: {
        isLoading: false,
        error: null,
        data: null,
    },
    payment: {
        isLoading: false,
        error: null,
        data: null,
    },
};

export const paymentsReducer = createReducer<PaymentsState>(initialState, (builder) => {
    builder
        .addCase(GET_PAYMENT_METHODS.STARTED, (state) => {
            state.list.isLoading = true;
        })
        .addCase(GET_PAYMENT_METHODS.COMPLETED, (state, action) => {
            state.list.error = null;
            state.list.data = action.payload;
            state.list.isLoading = false;
        })
        .addCase(GET_PAYMENT_METHODS.FAILED, (state, action) => {
            state.list.data = null;
            state.list.error = action.payload;
            state.list.isLoading = false;
        })
        .addCase(SET_AS_DEFAULT_PAYMENT_METHOD.STARTED, (state) => {
            state.list.isLoading = true;
        })
        .addCase(SET_AS_DEFAULT_PAYMENT_METHOD.COMPLETED, (state) => {
            state.list.error = null;
            state.list.isLoading = false;
        })
        .addCase(SET_AS_DEFAULT_PAYMENT_METHOD.FAILED, (state, action) => {
            state.list.error = action.payload;
            state.list.isLoading = false;
        })
        .addCase(REMOVE_PAYMENT_METHOD.STARTED, (state) => {
            state.list.isLoading = true;
        })
        .addCase(REMOVE_PAYMENT_METHOD.COMPLETED, (state) => {
            state.list.error = null;
            state.list.isLoading = false;
        })
        .addCase(REMOVE_PAYMENT_METHOD.FAILED, (state, action) => {
            state.list.error = action.payload;
            state.list.isLoading = false;
        })
        .addCase(ADD_CARD.STARTED, (state) => {
            state.addCard.isLoading = true;
        })
        .addCase(ADD_CARD.COMPLETED, (state) => {
            state.addCard.isLoading = false;
            state.addCard.error = null;
        })
        .addCase(ADD_CARD.FAILED, (state, action) => {
            state.addCard.isLoading = false;
            state.addCard.error = action.payload;
        })
        .addCase(PAY.STARTED, (state) => {
            state.payment.isLoading = true;
        })
        .addCase(PAY.COMPLETED, (state) => {
            state.payment.isLoading = false;
            state.payment.error = null;
        })
        .addCase(PAY.FAILED, (state, action) => {
            state.payment.isLoading = false;
            state.payment.error = action.payload;
        });
});
