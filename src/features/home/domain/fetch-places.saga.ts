import { SagaIterator } from 'redux-saga';
import { call, debounce, put } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { homeAPI } from '../data/api/home-api.data';
import { FETCH_PLACES } from '../data/store/home.actions';
import { PlacesResponse } from '../model/network.model';

export function* fetchPlacesSaga(action: ReturnType<typeof FETCH_PLACES.TRIGGER>): SagaIterator {
    yield put(FETCH_PLACES.STARTED(action.payload));

    if (!action.payload.toSearch.trim()) {
        yield put(FETCH_PLACES.COMPLETED({ results: [], direction: action.payload.direction }));
        return;
    }

    const result: PlacesResponse = yield call(homeAPI.fetchPlaces, action.payload.toSearch.trim());

    if (result.data) {
        yield put(FETCH_PLACES.COMPLETED({ results: result.data, direction: action.payload.direction }));
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield put(FETCH_PLACES.FAILED({ error: result.error, direction: action.payload.direction }));
    }
}

export function* listenForFetchPlaces(): SagaIterator {
    yield debounce(300, FETCH_PLACES.TRIGGER, fetchPlacesSaga);
}
