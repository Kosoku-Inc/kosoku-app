import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../../../app/data/store/app.types';
import { Optional } from '../../../../core/model/optional.model';
import { State } from '../../../../core/model/state.model';
import { ExtendedLocation } from '../../model/location.model';

import { HomeState } from './home.types';

export const getHomeState: Selector<ApplicationState, HomeState> = createSelector(
    (state: ApplicationState) => state,
    (state) => state.home
);

export const getPointerLocation: Selector<
    ApplicationState,
    State<{ isMoving: boolean; location: Optional<ExtendedLocation> }>
> = createSelector(getHomeState, (state) => state.pointerLocation);

export const getIsPointerLocationLoading: Selector<ApplicationState, boolean> = createSelector(
    getPointerLocation,
    (state) => state.isLoading
);

export const getPointerLocationData: Selector<ApplicationState, Optional<ExtendedLocation>> = createSelector(
    getPointerLocation,
    (state) => state.data?.location
);

export const getIsPointerMoving: Selector<ApplicationState, boolean> = createSelector(
    getPointerLocation,
    (state) => state.data?.isMoving ?? false
);
