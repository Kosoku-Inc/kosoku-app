import { createReducer } from '@reduxjs/toolkit';

import { RideRequest, RideStatus } from '../../../../core/model/ride.model';
import { ExtendedLocation } from '../../model/location.model';

import {
    CHOOSE_ROUTE,
    DECLINE_RIDE_REQUEST,
    FETCH_PLACES,
    POINTER_MOVE,
    PREPARE_RIDE,
    REQUEST_RIDE,
    RESET_HOME_STATE,
    RESTORE_DRIVE_STATE,
    SET_CHOSEN_LOCATION,
    SET_DRIVER_RIDE_REQUEST,
    SET_RIDE,
    SET_RIDE_REQUEST,
    SET_RIDE_STATUS,
    SET_ROUTE_LOCATION,
} from './home.actions';
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
    chooseRoute: {
        to: {
            isLoading: false,
            data: null,
            error: null,
        },
        from: {
            isLoading: false,
            data: null,
            error: null,
        },
        latestChange: undefined,
        isChoosingRoute: true,
    },
    prepareRide: {
        isPreparing: false,
        isCarSearching: false,
        rideRequest: {
            isLoading: false,
            data: null,
            error: null,
        },
        to: undefined as unknown as ExtendedLocation, // It will always exist in this step, but we dont have lateinit in TS
        from: undefined as unknown as ExtendedLocation,
    },
    prepareDriverRide: {
        rideRequest: null,
    },
    ride: {
        status: RideStatus.NoRide,
        driverPosition: null,
        ride: null,
    },
};

export const homeReducer = createReducer<HomeState>({ ...initialState }, (builder) => {
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
        })
        .addCase(SET_RIDE_REQUEST, (state, action) => {
            state.prepareRide.rideRequest.data = action.payload;
            state.prepareRide.rideRequest.isLoading = false;
        })
        .addCase(REQUEST_RIDE.COMPLETED, (state, action) => {
            state.prepareRide.isCarSearching = action.payload;
        })
        .addCase(SET_RIDE_STATUS.COMPLETED, (state, action) => {
            state.ride.status = action.payload;
        })
        .addCase(SET_ROUTE_LOCATION.COMPLETED, (state, action) => {
            const key = action.payload.to ? 'to' : 'from';

            state.chooseRoute[key].data = {
                pickedLocation: action.payload[key],
                searchResults: [],
            };
            state.chooseRoute[key].isLoading = false;
            state.chooseRoute[key].error = null;
        })
        .addCase(FETCH_PLACES.STARTED, (state, action) => {
            state.chooseRoute[action.payload.direction].isLoading = true;
        })
        .addCase(FETCH_PLACES.COMPLETED, (state, action) => {
            state.chooseRoute[action.payload.direction].data = {
                pickedLocation: state.chooseRoute[action.payload.direction]?.data?.pickedLocation,
                searchResults: action.payload.results,
            };

            state.chooseRoute.latestChange = action.payload.direction;
        })
        .addCase(FETCH_PLACES.FAILED, (state, action) => {
            state.chooseRoute[action.payload.direction].error = action.payload.error;
            state.chooseRoute.latestChange = action.payload.direction;
        })
        .addCase(PREPARE_RIDE.STARTED, (state, action) => {
            state.prepareRide.isPreparing = true;
            state.prepareRide.rideRequest.isLoading = true;
            state.prepareRide.to = action.payload.to;
            state.prepareRide.from = action.payload.from;

            state.chooseRoute.isChoosingRoute = false;
            state.chooseRoute.latestChange = undefined;
            state.chooseRoute.from = {
                isLoading: false,
                data: null,
                error: null,
            };
            state.chooseRoute.to = {
                isLoading: false,
                data: null,
                error: null,
            };
        })
        .addCase(CHOOSE_ROUTE.COMPLETED, (state) => {
            state.prepareRide = { ...initialState.prepareRide };

            state.chooseRoute.isChoosingRoute = true;
        })
        .addCase(DECLINE_RIDE_REQUEST.COMPLETED, (state) => {
            state.prepareRide.isCarSearching = false;
        })
        .addCase(SET_DRIVER_RIDE_REQUEST, (state, action) => {
            if (!action.payload) {
                state.ride.toPickUp = state.prepareDriverRide.rideRequest?.toPickUp;

                state.ride.route = state.prepareDriverRide.rideRequest?.route;

                state.ride.to = state.prepareDriverRide.rideRequest?.to;
                state.ride.from = state.prepareDriverRide.rideRequest?.from;

                state.prepareRide.to = state.prepareDriverRide.rideRequest!.to;
                state.prepareRide.from = state.prepareDriverRide.rideRequest!.from;

                state.prepareRide.rideRequest.data = {
                    route: state.prepareDriverRide.rideRequest!.route,
                } as RideRequest;
            }

            state.prepareDriverRide.rideRequest = action.payload;
        })
        .addCase(SET_RIDE, (state, action) => {
            state.ride.ride = action.payload;
            state.ride.status = action.payload.status;

            state.ride.route = state.prepareRide.rideRequest.data?.route;
            state.ride.to = state.prepareRide.to ?? state.prepareDriverRide.rideRequest?.to;
            state.ride.from = state.prepareRide.from ?? state.prepareDriverRide.rideRequest?.from;

            // Reset
            state.prepareRide = { ...initialState.prepareRide };
        })
        .addCase(RESET_HOME_STATE, (state) => {
            state.ride = { ...initialState.ride };
            state.prepareRide = { ...initialState.prepareRide };
            state.chooseRoute = { ...initialState.chooseRoute };
            state.prepareDriverRide = { ...initialState.prepareDriverRide };
        })
        .addCase(RESTORE_DRIVE_STATE, (state, action) => {
            state.ride.ride = action.payload.ride;
            state.ride.status = action.payload.ride.status;
            state.ride.route = action.payload.request.route;
            state.ride.toPickUp = action.payload.toPickUp;
            state.ride.to = action.payload.request.to;
            state.ride.from = action.payload.request.from;
            state.chooseRoute.isChoosingRoute = false;
            state.prepareRide.isPreparing = false;
        });
});
