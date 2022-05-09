import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { RideRequest } from '../../../core/model/ride.model';
import { homeAPI } from '../data/api/home-api.data';
import { ANSWER_TO_RIDE_REQUEST, REQUEST_RIDE, SET_DRIVER_RIDE_REQUEST } from '../data/store/home.actions';
import { getPrepareRideFromLocation, getPrepareRideToLocation, getRideRequest } from '../data/store/home.selectors';
import { geolocationService } from '../utils/services/geolocation-service.utils';
import { mapService } from '../utils/services/map-service.utils';

export function* requestRideSaga(action: ReturnType<typeof REQUEST_RIDE.TRIGGER>): SagaIterator {
    const from = yield select(getPrepareRideFromLocation);
    const to = yield select(getPrepareRideToLocation);
    const request: RideRequest = yield select(getRideRequest);

    yield call(homeAPI.requestRide, {
        to,
        from,
        ...action.payload,
        calculatedTime: request.calculatedTime,
        route: request.route,
    });
    yield put(REQUEST_RIDE.COMPLETED(true));
}

export function* listenForRequestRideSaga(): SagaIterator {
    yield takeLatest(REQUEST_RIDE.TRIGGER, requestRideSaga);
}

export function* answerToRideRequestSaga(action: ReturnType<typeof ANSWER_TO_RIDE_REQUEST>): SagaIterator {
    yield put(SET_DRIVER_RIDE_REQUEST());

    if (geolocationService.latestLocation) {
        yield call(mapService.animateCamera, geolocationService.latestLocation, 15);
    }

    yield call(homeAPI.answerToRideRequest, action.payload);
}

export function* listenForAnswerToRideRequest(): SagaIterator {
    yield takeLatest(ANSWER_TO_RIDE_REQUEST, answerToRideRequestSaga);
}
