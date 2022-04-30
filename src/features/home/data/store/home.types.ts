import { Optional } from '../../../../core/model/optional.model';
import {
    ExtendedDriverRideRequest,
    Ride,
    RideRequest,
    RideStatus,
} from '../../../../core/model/ride.model';
import { State } from '../../../../core/model/state.model';
import {ExtendedLocation, Location} from '../../model/location.model';

export type RideState = {
    status: RideStatus;
    driverPosition?: Optional<Location>;
    ride?: Optional<Ride>;
    route?: Optional<Array<Location>>;
    toPickUp?: Optional<Array<Location>>;
    to?: Location;
    from?: Location;
};

export type DirectionChooseResult = {
    pickedLocation: Optional<ExtendedLocation>;
    searchResults: Array<ExtendedLocation>;
};

export type ChooseRouteState = {
    from: State<DirectionChooseResult>;
    to: State<DirectionChooseResult>;
    latestChange?: 'to' | 'from';
    isChoosingRoute: boolean;
};

export type PrepareRide = {
    isPreparing: boolean;
    rideRequest: State<RideRequest>;
    isCarSearching: boolean;
    from: ExtendedLocation;
    to: ExtendedLocation;
};

export type PrepareDriverRide = {
    rideRequest: Optional<ExtendedDriverRideRequest>;
};

export type PointerLocation = {
    location: Optional<ExtendedLocation>;
    isMoving: boolean;
};

export type HomeState = {
    pointerLocation: State<PointerLocation>;
    chooseRoute: ChooseRouteState;
    prepareRide: PrepareRide;
    prepareDriverRide: PrepareDriverRide;
    ride: RideState;
};
