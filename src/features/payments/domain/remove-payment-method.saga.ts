import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { paymentsAPI } from '../data/api/payments-api.data';
import { REMOVE_PAYMENT_METHOD } from '../data/store/payments.actions';
import { RemovePaymentMethodResponse } from '../model/payments-response.model';

import { getPaymentMethodsSaga } from './get-payment-methods.saga';

export function* removePaymentMethodSaga(action: ReturnType<typeof REMOVE_PAYMENT_METHOD.TRIGGER>): SagaIterator {
    yield put(REMOVE_PAYMENT_METHOD.STARTED());

    const result: RemovePaymentMethodResponse = yield call(paymentsAPI.removePaymentMethod, action.payload);

    if (result.status >= 200 && result.status < 300) {
        yield put(REMOVE_PAYMENT_METHOD.COMPLETED());
        yield call(getPaymentMethodsSaga);
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield call(REMOVE_PAYMENT_METHOD.FAILED, result.error);
    }
}

export function* listenForRemovePaymentMethod(): SagaIterator {
    yield takeLatest(REMOVE_PAYMENT_METHOD.TRIGGER, removePaymentMethodSaga);
}
