import { createReducer } from '@reduxjs/toolkit';

import { POINTER_MOVE, SET_CHOSEN_LOCATION } from './home.actions';
import { HomeState } from './home.types';

const initialState: HomeState = {
    pointerLocation: {
        isLoading: true,
        error: null,
        data: {
            location: null,
            isMoving: false,
        },
    },
};

export const homeReducer = createReducer<HomeState>(initialState, (builder) => {
    builder
        .addCase(SET_CHOSEN_LOCATION.STARTED, (state) => {
            state.pointerLocation.isLoading = true;
        })
        .addCase(SET_CHOSEN_LOCATION.COMPLETED, (state, action) => {
            state.pointerLocation.isLoading = false;
            state.pointerLocation.data = {
                isMoving: false,
                location: action.payload,
            };
            state.pointerLocation.error = null;
        })
        .addCase(SET_CHOSEN_LOCATION.FAILED, (state, action) => {
            state.pointerLocation.data = {
                isMoving: false,
                location: null,
            };
            state.pointerLocation.error = action.payload;
            state.pointerLocation.isLoading = false;
        })
        .addCase(POINTER_MOVE.START, (state) => {
            state.pointerLocation.data = {
                location: state.pointerLocation.data?.location,
                isMoving: true,
            };
            state.pointerLocation.isLoading = true;
        })
        .addCase(POINTER_MOVE.STOP, (state) => {
            state.pointerLocation.data = {
                location: state.pointerLocation.data?.location,
                isMoving: false,
            };
        });
});
