import { createAction } from '@reduxjs/toolkit';

import { Optional } from '../../../../core/model/optional.model';
import { ExtendedLocation, Location } from '../../model/location.model';

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
