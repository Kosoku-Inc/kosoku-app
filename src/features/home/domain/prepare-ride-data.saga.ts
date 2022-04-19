import { SagaIterator } from 'redux-saga';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { homeAPI } from '../data/api/home-api.data';
import { PREPARE_RIDE, SET_RIDE_REQUEST } from '../data/store/home.actions';
import { DirectionsResponse } from '../model/network.model';
import { bottomSheetService } from '../utils/services/bottom-sheet-service.utils';
import { mapService } from '../utils/services/map-service.utils';

import { chooseRouteSaga } from './choose-route.saga';

export function* prepareRideDataSaga(action: ReturnType<typeof PREPARE_RIDE.TRIGGER>): SagaIterator {
    yield put(PREPARE_RIDE.STARTED(action.payload));

    yield delay(100);

    yield call(mapService.animateToRegion, action.payload.from, action.payload.to);
    yield call(bottomSheetService.minimize);

    const result: DirectionsResponse = yield call(homeAPI.calculateRideData, action.payload.to, action.payload.from);

    if (result.status >= 200 && result.status < 300) {
        yield put(SET_RIDE_REQUEST(result.data));
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield put(SET_RIDE_REQUEST());
        yield call(chooseRouteSaga);
    }
}

export function* listenForPrepareRide(): SagaIterator {
    yield takeLatest(PREPARE_RIDE.TRIGGER, prepareRideDataSaga);
}
