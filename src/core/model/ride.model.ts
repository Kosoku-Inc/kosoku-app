import { ExtendedLocation } from '../../features/home/model/location.model';

import { CarClass } from './car-class.model';
import { Optional } from './optional.model';
import { User } from './user.model';

export enum RideStatus {
    Starting = 'STARTING',
    InProgress = 'IN_PROGRESS',
    Completed = 'COMPLETED',
    NoRide = 'NO_RIDE',
}

export type RideRequest = {
    calculatedTime: number;
    route: unknown; // TO-DO
    classes: Record<CarClass, number>; // Class - amount
};

export type ExtendedRideRequest = Omit<RideRequest, 'classes'> & {
    to: ExtendedLocation;
    from: ExtendedLocation;
    cost: number;
    carClass: CarClass;
};

export type Ride = {
    id: number;
    client: User;
    driver: User;
    cost: number;
    startTime: number;
    endTime: Optional<number>;
    to: string;
    from: string;
    status: RideStatus;
    paid: boolean;
};
