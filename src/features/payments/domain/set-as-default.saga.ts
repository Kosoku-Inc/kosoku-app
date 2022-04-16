import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { paymentsAPI } from '../data/api/payments-api.data';
import { SET_AS_DEFAULT_PAYMENT_METHOD } from '../data/store/payments.actions';
import { SetAsDefaultMethodResponse } from '../model/payments-response.model';

import { getPaymentMethodsSaga } from './get-payment-methods.saga';

export function* setAsDefaultPaymentMethodSaga(
    action: ReturnType<typeof SET_AS_DEFAULT_PAYMENT_METHOD.TRIGGER>
): SagaIterator {
    yield put(SET_AS_DEFAULT_PAYMENT_METHOD.STARTED());

    const result: SetAsDefaultMethodResponse = yield call(paymentsAPI.setAsDefaultMethod, action.payload);

    if (result.status >= 200 && result.status < 300) {
        yield put(SET_AS_DEFAULT_PAYMENT_METHOD.COMPLETED());
        yield call(getPaymentMethodsSaga);
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield call(SET_AS_DEFAULT_PAYMENT_METHOD.FAILED, result.error);
    }
}

export function* listenForSetAsDefaultPaymentMethod(): SagaIterator {
    yield takeLatest(SET_AS_DEFAULT_PAYMENT_METHOD.TRIGGER, setAsDefaultPaymentMethodSaga);
}
