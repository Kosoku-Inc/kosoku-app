import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { paymentsAPI } from '../data/api/payments-api.data';
import { GET_PAYMENT_METHODS } from '../data/store/payments.actions';
import { GetPaymentMethodsResponse } from '../model/payments-response.model';

export function* getPaymentMethodsSaga(): SagaIterator {
    yield put(GET_PAYMENT_METHODS.STARTED());

    const result: GetPaymentMethodsResponse = yield call(paymentsAPI.getPaymentMethods);

    if (result.data) {
        yield put(GET_PAYMENT_METHODS.COMPLETED(result.data));
    }

    if (result.error) {
        yield call(logger.log, result.error);
        yield call(toastService.showError, result.error);
        yield call(GET_PAYMENT_METHODS.FAILED, result.error);
    }
}

export function* listenForGetPaymentMethods(): SagaIterator {
    yield takeLatest(GET_PAYMENT_METHODS.TRIGGER, getPaymentMethodsSaga);
}
