import { eventChannel, EventChannel, SagaIterator, Subscribe } from 'redux-saga';
import { call, select, takeLatest } from 'redux-saga/effects';

import { getExistingUser } from '../../../core/data/store/user.selectors';
import { homeAPI } from '../data/api/home-api.data';
import { Location } from '../model/location.model';
import { geolocationService } from '../utils/services/geolocation-service.utils';

export const gpsSubscribe: Subscribe<Location> = (emitter) => geolocationService.subscribeToPositionChange(emitter);

export const createGPSMessagesReceiver = (): EventChannel<Location> => eventChannel<Location>(gpsSubscribe);

export function* receiveLocationUpdateSaga(location: Location): SagaIterator {
    const user = yield select(getExistingUser);

    if (!user) return;

    yield call(homeAPI.updateMyLocation, location);
}

export function* bootstrapGPSSubscription(): SagaIterator {
    const gpsEventChannel = yield call(createGPSMessagesReceiver);

    yield takeLatest(gpsEventChannel, receiveLocationUpdateSaga);
}
