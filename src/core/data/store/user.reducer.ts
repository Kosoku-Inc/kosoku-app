import { createReducer } from '@reduxjs/toolkit';

import { LOGIN, LOGOUT, REGISTER } from '../../../features/auth/data/store/auth.actions';
import { GET_USER } from '../../../features/profile/data/store/profile.actions';

import { UserState } from './user.types';

const initialState: UserState = {
    isLoading: false,
    error: null,
    data: null,
};

export const userReducer = createReducer<UserState>(initialState, (builder) => {
    builder
        .addCase(LOGIN.STARTED, (state) => {
            state.isLoading = true;
        })
        .addCase(LOGIN.COMPLETED, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(LOGIN.FAILED, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.data = null;
        })
        .addCase(GET_USER.STARTED, (state) => {
            state.isLoading = true;
        })
        .addCase(GET_USER.COMPLETED, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(GET_USER.FAILED, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.data = null;
        })
        .addCase(REGISTER.STARTED, (state) => {
            state.isLoading = true;
        })
        .addCase(REGISTER.COMPLETED, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(REGISTER.FAILED, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.data = null;
        })
        .addCase(LOGOUT.COMPLETED, (state) => {
            state.data = null;
        });
});
