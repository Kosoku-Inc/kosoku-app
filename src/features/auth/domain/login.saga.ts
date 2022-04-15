import { SagaIterator } from 'redux-saga';
import { call, takeLatest, put, delay } from 'redux-saga/effects';

import { connectionGatewayAPI } from '../../../core/data/api/connection-gateway-api.data';
import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { tokenService } from '../../../core/utils/services/token-service.utils';
import { fetchHistorySaga } from '../../history/domain/fetch-history.saga';
import { getPaymentMethodsSaga } from '../../payments/domain/get-payment-methods.saga';
import { profileAPI } from '../../profile/data/api/profile-api.data';
import { UserResponse } from '../../profile/model/user-response.model';
import { authAPI } from '../data/api/auth-api.data';
import { LOGIN } from '../data/store/auth.actions';
import { AuthResponse } from '../model/auth-response.model';

export function* loginSaga(action: ReturnType<typeof LOGIN.TRIGGER>): SagaIterator {
    yield put(LOGIN.STARTED());

    const result: AuthResponse = yield call(authAPI.login, action.payload);

    yield delay(1000);

    if (result.data) {
        yield call(tokenService.writeTokensToStorage, result.data);
        yield call(tokenService.setAuthToken, result.data);

        const user: UserResponse = yield call(profileAPI.getUser);

        if (user.data) {
            yield call(connectionGatewayAPI.connect);
            yield call(fetchHistorySaga);
            yield call(getPaymentMethodsSaga);

            yield put(LOGIN.COMPLETED(user.data));
        }

        if (user.error) {
            yield call(logger.log, user.error);
            yield call(toastService.showError, user.error);
            yield put(LOGIN.FAILED(user.error));
        }
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield put(LOGIN.FAILED(result.error));
    }
}

export function* listenForLogin(): SagaIterator {
    yield takeLatest(LOGIN.TRIGGER, loginSaga);
}
