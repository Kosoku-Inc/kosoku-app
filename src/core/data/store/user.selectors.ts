import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../../app/data/store/app.types';
import { User } from '../../model/user.model';

import { UserState } from './user.types';

export const getUserState: Selector<ApplicationState, UserState> = createSelector(
    (state: ApplicationState) => state,
    (state) => state.user
);

export const getExistingUser: Selector<ApplicationState, User> = createSelector(
    getUserState,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (state) => state.data!
);

export const getIsUserLoading: Selector<ApplicationState, boolean> = createSelector(
    getUserState,
    (state) => state.isLoading
);
