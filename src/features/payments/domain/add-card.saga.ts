import { confirmPayment } from '@stripe/stripe-react-native';
import { ConfirmPaymentResult, PaymentIntents } from '@stripe/stripe-react-native/src/types/index';
import { SagaIterator } from 'redux-saga';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { logger } from '../../../core/utils/logger.utils';
import { navigationService } from '../../../core/utils/services/navigation-service.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { paymentsAPI } from '../data/api/payments-api.data';
import { ADD_CARD } from '../data/store/payments.actions';
import { CreatePaymentIntentResponse } from '../model/payments-response.model';

import { getPaymentMethodsSaga } from './get-payment-methods.saga';

function* handleError(error: Error): SagaIterator {
    yield call(logger.log, error);
    yield call(toastService.showError, error);
    yield put(ADD_CARD.FAILED(error));
}

export function* addCardSaga(action: ReturnType<typeof ADD_CARD.TRIGGER>): SagaIterator {
    yield put(ADD_CARD.STARTED());

    const result: CreatePaymentIntentResponse = yield call(paymentsAPI.createPaymentIntent, {
        bynAmount: 300, // rubles * 100
        requestThreeDSecure: 'automatic',
    });

    if (result.data) {
        const secret = result.data.clientSecret;

        const { error, paymentIntent }: ConfirmPaymentResult = yield call(confirmPayment, secret, {
            type: 'Card',
            setupFutureUsage: 'OffSession',
        });

        if (paymentIntent?.status === PaymentIntents.Status.Succeeded) {
            const result = yield call(paymentsAPI.addCard, {
                ...action.payload,
                stripePaymentId: paymentIntent.paymentMethodId,
            });

            if (result.status >= 200 && result.status < 300) {
                yield put(ADD_CARD.COMPLETED());

                yield delay(100);
                yield call(navigationService.goBack);
                yield call(getPaymentMethodsSaga);
                yield call(toastService.showSuccess, 'Карта успешно добавлена', 'Желаем приятных поездок');
            }

            if (result.error) {
                yield call(handleError, result.error);
            }
        }

        if (error) {
            const _error = new Error(error.message);
            yield call(handleError, _error);
        }
    }

    if (result.error) {
        yield call(handleError, result.error);
    }
}

export function* listenForAddCard(): SagaIterator {
    yield takeLatest(ADD_CARD.TRIGGER, addCardSaga);
}
