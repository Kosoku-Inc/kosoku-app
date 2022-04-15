import { SagaIterator } from 'redux-saga';
import { call, debounce, put, select } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { homeAPI } from '../data/api/home-api.data';
import { SET_CHOSEN_LOCATION } from '../data/store/home.actions';
import { getIsPointerMoving } from '../data/store/home.selectors';
import { DecodeResponse } from '../model/network.model';

export function* setChosenLocationSaga(action: ReturnType<typeof SET_CHOSEN_LOCATION.TRIGGER>): SagaIterator {
    const isMoving = yield select(getIsPointerMoving);

    if (isMoving) return;

    yield put(SET_CHOSEN_LOCATION.STARTED());

    if (action.payload) {
        const result: DecodeResponse = yield call(homeAPI.decode, action.payload);

        if (result.data) {
            yield put(SET_CHOSEN_LOCATION.COMPLETED(result.data));
        }

        if (result.error) {
            yield call(logger.log, result.error);
            yield call(toastService.showError, result.error);
            yield put(SET_CHOSEN_LOCATION.FAILED(result.error));
        }
    } else {
        yield put(SET_CHOSEN_LOCATION.COMPLETED());
    }
}

export function* listenForSetChosenLocation(): SagaIterator {
    yield debounce(1000, SET_CHOSEN_LOCATION.TRIGGER, setChosenLocationSaga);
}
