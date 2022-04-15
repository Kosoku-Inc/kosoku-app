import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../../../app/data/store/app.types';
import { getUserState } from '../../../../core/data/store/user.selectors';

export const getIsAuthenticated: Selector<ApplicationState, boolean> = createSelector(
    getUserState,
    (state) => !!state.data?.id
);
