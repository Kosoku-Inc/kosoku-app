import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../../../app/data/store/app.types';
import { Optional } from '../../../../core/model/optional.model';
import { Order } from '../../model/order.model';

import { HistoryState } from './history.types';

export const getHistoryState: Selector<ApplicationState, HistoryState> = createSelector(
    (state: ApplicationState) => state,
    (state) => state.history
);

export const getIsHistoryLoading: Selector<ApplicationState, boolean> = createSelector(
    getHistoryState,
    (state) => state.isLoading
);

export const getHistoryData: Selector<ApplicationState, Optional<Array<Order>>> = createSelector(
    getHistoryState,
    (state) => state.data
);
