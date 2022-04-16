import { Optional } from './optional.model';
import { User } from './user.model';

export enum RideStatus {
    Starting = 'STARTING',
    inProgress = 'IN_PROGRESS',
    Completed = 'COMPLETED',
    Declined = 'DECLINED',
    noRide = 'NO_RIDE'
}

export type Ride = {
    id: number;
    client: User;
    driver: User;
    cost: number;
    startTime: Optional<number>;
    endTime: Optional<number>;
    to: string;
    from: string;
    status: RideStatus;
    paid: boolean;
};
