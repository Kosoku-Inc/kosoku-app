import { createAction } from '@reduxjs/toolkit';

import { WSMessageType } from '../../../../core/data/api/connection-gateway-api.data';
import { CarClass } from '../../../../core/model/car-class.model';
import { Optional } from '../../../../core/model/optional.model';
import {
    ExtendedDriverRideRequest,
    ExtendedRideRequest,
    Ride,
    RideRequest,
    RideStatus,
} from '../../../../core/model/ride.model';
import { ExtendedLocation, Location } from '../../model/location.model';

export type RouteLocationPayload = {
    to?: ExtendedLocation;
    from?: ExtendedLocation;
};

export type FetchPlacesPayload = {
    direction: 'to' | 'from';
    toSearch: string;
};

export type FetchPlacesCompeted = {
    direction: 'to' | 'from';
    results: Array<ExtendedLocation>;
};

export type FetchPlacesError = {
    direction: 'to' | 'from';
    error: Error;
};

export type RestoreDriveStatePayload = {
    toPickUp: Optional<Array<Location>>;
    ride: Ride;
    request: ExtendedRideRequest;
};

export const INITIALIZE_MAP = {
    TRIGGER: createAction('[Initialize Map] Trigger'),
};

export const SET_CHOSEN_LOCATION = {
    TRIGGER: createAction<Optional<Location>>('[Set Chosen Location] Trigger'),
    STARTED: createAction('[Set Chosen Location] Started'),
    COMPLETED: createAction<Optional<ExtendedLocation>>('[Set Chosen Location] Completed'),
    FAILED: createAction<Error>('[Set Chosen Location] Error'),
};

export const POINTER_MOVE = {
    START: createAction('[Pointer Move] Start'),
    STOP: createAction('[Pointer Move] Stop'),
};

export const REQUEST_RIDE = {
    TRIGGER: createAction<{ carClass: CarClass; cost: number }>('[Request Ride] Trigger'),
    COMPLETED: createAction<boolean>('[Request Ride] Completed'),
};

export const SET_RIDE_REQUEST = createAction<Optional<RideRequest>>('[Set Ride Request]');

export const SET_DRIVER_RIDE_REQUEST = createAction<Optional<ExtendedDriverRideRequest>>('[Set Driver Ride Request]');

export const ANSWER_TO_RIDE_REQUEST = createAction<WSMessageType>('[Answer To Ride Request]');

export const SET_RIDE_STATUS = {
    TRIGGER: createAction<RideStatus>('[Set Ride Status] Trigger'),
    COMPLETED: createAction<RideStatus>('[Set Ride Status] Completed'),
};

export const SET_ROUTE_LOCATION = {
    TRIGGER: createAction<RouteLocationPayload>('[Set Route Location] Trigger'),
    COMPLETED: createAction<RouteLocationPayload>('[Set Route Location] Completed'),
};

export const FETCH_PLACES = {
    TRIGGER: createAction<FetchPlacesPayload>('[Fetch Places] Trigger'),
    STARTED: createAction<FetchPlacesPayload>('[Fetch Places] Started'),
    COMPLETED: createAction<FetchPlacesCompeted>('[Fetch Places] Completed'),
    FAILED: createAction<FetchPlacesError>('[Fetch Places] Failed'),
};

export const PREPARE_RIDE = {
    TRIGGER: createAction<{ from: ExtendedLocation; to: ExtendedLocation }>('[Prepare Ride] Trigger'),
    STARTED: createAction<{ from: ExtendedLocation; to: ExtendedLocation }>('[Prepare Ride] Started'),
    COMPLETED: createAction('[Prepare Ride] Completed'),
    FAILED: createAction('[Prepare Ride] Failed'),
};

export const CHOOSE_ROUTE = {
    TRIGGER: createAction('[Choose Route] Trigger'),
    COMPLETED: createAction('[Choose Route] Completed'),
};

export const DECLINE_RIDE_REQUEST = {
    TRIGGER: createAction('[Decline Ride Request] Trigger'),
    COMPLETED: createAction('[Decline Ride Request] Completed'),
};

export const DECLINE_RIDE = {
    TRIGGER: createAction('[Decline Ride] Trigger'),
    COMPLETED: createAction('[Decline Ride] Completed'),
};

export const SET_RIDE = createAction<Ride>('[Set Ride]');

export const RESET_HOME_STATE = createAction('[Reset Home State]');

export const RESTORE_DRIVE_STATE = createAction<RestoreDriveStatePayload>('[Restore Drive State]');
