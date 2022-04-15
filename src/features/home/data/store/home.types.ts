import { Optional } from '../../../../core/model/optional.model';
import { State } from '../../../../core/model/state.model';
import { ExtendedLocation } from '../../model/location.model';

export type HomeState = {
    pointerLocation: State<{
        location: Optional<ExtendedLocation>;
        isMoving: boolean;
    }>;
};
