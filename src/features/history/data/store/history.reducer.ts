import { createReducer } from '@reduxjs/toolkit';

import { FETCH_HISTORY } from './history.actions';
import { HistoryState } from './history.types';

const initialState: HistoryState = {
    isLoading: true,
    error: null,
    data: null,
};

export const historyReducer = createReducer<HistoryState>(initialState, (builder) => {
    builder
        .addCase(FETCH_HISTORY.STARTED, (state) => {
            state.isLoading = true;
        })
        .addCase(FETCH_HISTORY.COMPLETED, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(FETCH_HISTORY.FAILED, (state, action) => {
            state.isLoading = false;
            state.data = null;
            state.error = action.payload;
        });
});
