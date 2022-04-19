import { SagaIterator } from 'redux-saga';
import { call, put, spawn, takeLatest } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { INITIALIZE_MAP, SET_CHOSEN_LOCATION } from '../data/store/home.actions';
import { geolocationService } from '../utils/services/geolocation-service.utils';
import { mapService } from '../utils/services/map-service.utils';

import { bootstrapGPSSubscription } from './receive-gps-position.saga';

export function* initializeMapSaga(): SagaIterator {
    try {
        const currentLocation = yield call(geolocationService.getLocation);

        yield call(mapService.animateCamera, currentLocation, 15);
        yield put(SET_CHOSEN_LOCATION.TRIGGER(currentLocation));

        yield spawn(bootstrapGPSSubscription);
    } catch (e) {
        yield put(SET_CHOSEN_LOCATION.TRIGGER());
        yield call(logger.log, e);
        yield call(toastService.showError, new Error((e as Error).message));
    }
}

export function* listenForInitializeMap(): SagaIterator {
    yield takeLatest(INITIALIZE_MAP.TRIGGER, initializeMapSaga);
}
