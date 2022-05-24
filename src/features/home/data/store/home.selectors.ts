import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../../../app/data/store/app.types';
import { Optional } from '../../../../core/model/optional.model';
import { ExtendedDriverRideRequest, Ride, RideRequest, RideStatus } from '../../../../core/model/ride.model';
import { State } from '../../../../core/model/state.model';
import { ExtendedLocation } from '../../model/location.model';
import { Location } from '../../model/location.model';

import {
    ChooseRouteState,
    DirectionChooseResult,
    HomeState,
    PrepareDriverRide,
    PrepareRide,
    RideState,
} from './home.types';
import { User } from '../../../../core/model/user.model';

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

export const getRideState: Selector<ApplicationState, RideState> = createSelector(getHomeState, (state) => state.ride);

export const getRideStatus: Selector<ApplicationState, RideStatus> = createSelector(
    getRideState,
    (state) => state.status
);

export const getChooseRouteState: Selector<ApplicationState, ChooseRouteState> = createSelector(
    getHomeState,
    (state) => state.chooseRoute
);

export const getChooseRouteFromState: Selector<ApplicationState, State<DirectionChooseResult>> = createSelector(
    getChooseRouteState,
    (state) => state.from
);

export const getChooseRouteToState: Selector<ApplicationState, State<DirectionChooseResult>> = createSelector(
    getChooseRouteState,
    (state) => state.to
);

export const getChooseRouteFromLocation: Selector<ApplicationState, Optional<ExtendedLocation>> = createSelector(
    getChooseRouteFromState,
    (state) => state.data?.pickedLocation
);

export const getChooseRouteToLocation: Selector<ApplicationState, Optional<ExtendedLocation>> = createSelector(
    getChooseRouteToState,
    (state) => state.data?.pickedLocation
);

export const getChooseRouteFromSearchResults: Selector<ApplicationState, Array<ExtendedLocation>> = createSelector(
    getChooseRouteFromState,
    (state) => state.data?.searchResults ?? []
);

export const getChooseRouteToSearchResults: Selector<ApplicationState, Array<ExtendedLocation>> = createSelector(
    getChooseRouteToState,
    (state) => state.data?.searchResults ?? []
);

export const getChooseRouteLatestTyping: Selector<ApplicationState, Optional<'to' | 'from'>> = createSelector(
    getChooseRouteState,
    (state) => state.latestChange
);

export const getPrepareRideState: Selector<ApplicationState, PrepareRide> = createSelector(
    getHomeState,
    (state) => state.prepareRide
);

export const getIsRidePreparing: Selector<ApplicationState, boolean> = createSelector(
    getPrepareRideState,
    (state) => state.isPreparing
);

export const getIsCarSearching: Selector<ApplicationState, boolean> = createSelector(
    getPrepareRideState,
    (state) => state.isCarSearching
);

export const getIsChoosingRoute: Selector<ApplicationState, boolean> = createSelector(
    getChooseRouteState,
    (state) => state.isChoosingRoute
);

export const getPrepareRideFromLocation: Selector<ApplicationState, ExtendedLocation> = createSelector(
    getPrepareRideState,
    (state) => state.from
);

export const getPrepareRideToLocation: Selector<ApplicationState, ExtendedLocation> = createSelector(
    getPrepareRideState,
    (state) => state.to
);

export const getPrepareRideRequestState: Selector<ApplicationState, State<RideRequest>> = createSelector(
    getPrepareRideState,
    (state) => state.rideRequest
);

export const getIsPrepareRideRequestLoading: Selector<ApplicationState, boolean> = createSelector(
    getPrepareRideRequestState,
    (state) => state.isLoading
);

export const getRideRequest: Selector<ApplicationState, Optional<RideRequest>> = createSelector(
    getPrepareRideRequestState,
    (state) => state.data
);

export const getDriverRide: Selector<ApplicationState, PrepareDriverRide> = createSelector(
    getHomeState,
    (state) => state.prepareDriverRide
);

export const getDriverRideRequest: Selector<ApplicationState, Optional<ExtendedDriverRideRequest>> = createSelector(
    getDriverRide,
    (state) => state.rideRequest
);

export const getIsUserOnRide: Selector<ApplicationState, boolean> = createSelector(
    getRideState,
    (state) => !!state.ride
);

export const getIsDriverIdle: Selector<ApplicationState, boolean> = createSelector(
    getIsUserOnRide,
    getDriverRideRequest,
    (isOnRide, request) => !isOnRide && !request
);

export const getIsDriverRequested: Selector<ApplicationState, boolean> = createSelector(
    getDriverRideRequest,
    (state) => !!state
);

export const getRideDriver: Selector<ApplicationState, Optional<User>> = createSelector(
    getRideState,
    (state) => state.ride?.driver
);

export const getRideClient: Selector<ApplicationState, Optional<User>> = createSelector(
    getRideState,
    (state) => state.ride?.client
);

export const getRide: Selector<ApplicationState, Optional<Ride>> = createSelector(
    getHomeState,
    (state) => state.ride.ride
);

export const getRideStateRoute: Selector<ApplicationState, Optional<Array<Location>>> = createSelector(
    getHomeState,
    (state) => state.ride.route
);

export const getRideStateToPickUp: Selector<ApplicationState, Optional<Array<Location>>> = createSelector(
    getHomeState,
    (state) => state.ride.toPickUp
);

export const getRideStateToPoint: Selector<ApplicationState, Optional<Location>> = createSelector(
    getHomeState,
    (state) => state.ride.to
);

export const getRideStateFromPoint: Selector<ApplicationState, Optional<Location>> = createSelector(
    getHomeState,
    (state) => state.ride.from
);

export const getDriverLocation: Selector<ApplicationState, Optional<Location>> = createSelector(
    getHomeState,
    (state) => state.ride.driverPosition
);
