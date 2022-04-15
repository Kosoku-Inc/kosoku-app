import { combineReducers } from 'redux';

import { userReducer } from '../../../core/data/store/user.reducer';
import { historyReducer } from '../../../features/history/data/store/history.reducer';
import { homeReducer } from '../../../features/home/data/store/home.reducer';
import { paymentsReducer } from '../../../features/payments/data/store/payments.reducer';

import { ApplicationState } from './app.types';

export const appReducer = combineReducers<ApplicationState>({
    user: userReducer,
    history: historyReducer,
    payments: paymentsReducer,
    home: homeReducer,
});
