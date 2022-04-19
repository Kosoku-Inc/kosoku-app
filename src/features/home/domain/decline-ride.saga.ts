import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { homeAPI } from '../data/api/home-api.data';
import { DECLINE_RIDE_REQUEST } from '../data/store/home.actions';

export function* declineRideRequestSaga(): SagaIterator {
    yield call(homeAPI.declineRideRequest);
    yield put(DECLINE_RIDE_REQUEST.COMPLETED());
}

export function* listenForDeclineRideRequest(): SagaIterator {
    yield takeLatest(DECLINE_RIDE_REQUEST.TRIGGER, declineRideRequestSaga);
}
