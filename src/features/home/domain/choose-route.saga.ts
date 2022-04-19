import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { CHOOSE_ROUTE } from '../data/store/home.actions';
import { geolocationService } from '../utils/services/geolocation-service.utils';
import { mapService } from '../utils/services/map-service.utils';

export function* chooseRouteSaga(): SagaIterator {
    yield put(CHOOSE_ROUTE.COMPLETED());

    if (geolocationService.latestLocation) {
        yield call(mapService.animateCamera, geolocationService.latestLocation, 15);
    }
}

export function* listenForChooseRoute(): SagaIterator {
    yield takeLatest(CHOOSE_ROUTE.TRIGGER, chooseRouteSaga);
}
