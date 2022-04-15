import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { historyAPI } from '../data/api/history-api.data';
import { FETCH_HISTORY } from '../data/store/history.actions';
import { HistoryResponse } from '../model/history-response.model';

export function* fetchHistorySaga(): SagaIterator {
    yield put(FETCH_HISTORY.STARTED());

    const result: HistoryResponse = yield call(historyAPI.getHistory);

    yield delay(1000);

    if (result.data) {
        yield put(FETCH_HISTORY.COMPLETED(result.data));
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield put(FETCH_HISTORY.FAILED(result.error));
    }
}

export function* listenForFetchHistory(): SagaIterator {
    yield takeLatest(FETCH_HISTORY.TRIGGER, fetchHistorySaga);
}
