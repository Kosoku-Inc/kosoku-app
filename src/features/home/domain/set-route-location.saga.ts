import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Optional } from '../../../core/model/optional.model';
import { PREPARE_RIDE, SET_ROUTE_LOCATION } from '../data/store/home.actions';
import {
    getChooseRouteFromLocation,
    getChooseRouteToLocation,
    getPointerLocationData,
} from '../data/store/home.selectors';
import { ExtendedLocation } from '../model/location.model';
import { mapService } from '../utils/services/map-service.utils';

export function* setRouteLocationSaga(action: ReturnType<typeof SET_ROUTE_LOCATION.TRIGGER>): SagaIterator {
    if (action.payload.from) {
        const location: Optional<ExtendedLocation> = yield select(getPointerLocationData);

        if (
            location?.longitude !== action.payload.from.longitude ||
            location?.latitude !== action.payload.from.latitude
        ) {
            yield call(mapService.animateCamera, action.payload.from, 12);
        }
    }

    yield put(SET_ROUTE_LOCATION.COMPLETED({ ...action.payload }));

    const from = yield select(getChooseRouteFromLocation);
    const to = yield select(getChooseRouteToLocation);

    if (from && to) {
        yield put(PREPARE_RIDE.TRIGGER({ from, to }));
    }
}

export function* listenForSetRouteLocation(): SagaIterator {
    yield takeLatest(SET_ROUTE_LOCATION.TRIGGER, setRouteLocationSaga);
}
