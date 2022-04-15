import { SagaIterator } from 'redux-saga';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { profileAPI } from '../data/api/profile-api.data';
import { GET_USER } from '../data/store/profile.actions';

export function* getUserSaga(): SagaIterator {
    yield put(GET_USER.STARTED());

    const result = yield call(profileAPI.getUser);

    yield delay(3000);

    if (result.data) {
        yield put(GET_USER.COMPLETED(result.data));
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield put(GET_USER.FAILED(result.error));
    }
}

export function* listenForGetUser(): SagaIterator {
    yield takeLatest(GET_USER.TRIGGER, getUserSaga);
}
