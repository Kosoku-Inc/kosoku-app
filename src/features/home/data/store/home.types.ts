import { Optional } from '../../../../core/model/optional.model';
import {RideStatus} from '../../../../core/model/ride.model';
import { State } from '../../../../core/model/state.model';
import {User} from '../../../../core/model/user.model';
import { ExtendedLocation } from '../../model/location.model';
import {CarClass} from '../../../../core/model/car-class.model';

export type HomeState = {
    pointerLocation: State<{
        location: Optional<ExtendedLocation>;
        isMoving: boolean;
    }>;
    ride: {
        status: RideStatus;
        isCarSearching: boolean;
        currentDriver?: User;
        driverPosition?: Location;
        computedDetails?: State<{
            route: unknown; // TO-DO
            time: number;
            classes: Record<CarClass, number>;
        }>
    };
};
