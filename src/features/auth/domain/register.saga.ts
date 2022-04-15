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
import { REGISTER } from '../data/store/auth.actions';

export function* registerSaga(action: ReturnType<typeof REGISTER.TRIGGER>): SagaIterator {
    yield put(REGISTER.STARTED());

    const result = yield call(authAPI.register, action.payload);

    yield delay(3000);

    if (result.data) {
        yield call(tokenService.writeTokensToStorage, result.data);
        yield call(tokenService.setAuthToken, result.data);

        const user: UserResponse = yield call(profileAPI.getUser);

        if (user.data) {
            yield call(connectionGatewayAPI.connect);
            yield call(fetchHistorySaga);
            yield call(getPaymentMethodsSaga);

            yield put(REGISTER.COMPLETED(user.data));
        }

        if (user.error) {
            yield call(logger.log, user.error);
            yield call(toastService.showError, user.error);
            yield put(REGISTER.FAILED(user.error));
        }
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield put(REGISTER.FAILED(result.error));
    }
}

export function* listenForRegister(): SagaIterator {
    yield takeLatest(REGISTER.TRIGGER, registerSaga);
}
