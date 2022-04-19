import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { RideStatus } from '../../../core/model/ride.model';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { homeAPI } from '../data/api/home-api.data';
import { RESET_HOME_STATE, SET_RIDE_STATUS } from '../data/store/home.actions';
import { getRide } from '../data/store/home.selectors';

export function* setRideStatusSaga(action: ReturnType<typeof SET_RIDE_STATUS.TRIGGER>): SagaIterator {
    yield call(homeAPI.updateRideStatus, action.payload);
    yield put(SET_RIDE_STATUS.COMPLETED(action.payload));

    if (action.payload === RideStatus.Completed) {
        const ride = yield select(getRide);
        yield call(toastService.showSuccess, 'Поездка завершена', `Ваша прибыль - ${ride.cost}р`);
        yield put(RESET_HOME_STATE());
    }
}

export function* listenForSetRideStatus(): SagaIterator {
    yield takeLatest(SET_RIDE_STATUS.TRIGGER, setRideStatusSaga);
}
