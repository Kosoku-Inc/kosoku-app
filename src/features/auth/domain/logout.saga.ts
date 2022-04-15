import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { connectionGatewayAPI } from '../../../core/data/api/connection-gateway-api.data';
import { tokenService } from '../../../core/utils/services/token-service.utils';
import { LOGOUT } from '../data/store/auth.actions';

export function* logoutSaga(): SagaIterator {
    yield call(connectionGatewayAPI.disconnect);
    yield call(tokenService.deleteTokensFromStorage);
    yield call(tokenService.removeAuthToken);

    yield put(LOGOUT.COMPLETED());
}

export function* listenForLogout(): SagaIterator {
    yield takeLatest(LOGOUT.TRIGGER, logoutSaga);
}
