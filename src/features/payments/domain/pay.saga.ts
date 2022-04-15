import { confirmPayment } from '@stripe/stripe-react-native';
import { ConfirmPaymentResult, PaymentIntents } from '@stripe/stripe-react-native/src/types/index';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { getExistingUser } from '../../../core/data/store/user.selectors';
import { User } from '../../../core/model/user.model';
import { logger } from '../../../core/utils/logger.utils';
import { toastService } from '../../../core/utils/services/toast-service.utils';
import { paymentsAPI } from '../data/api/payments-api.data';
import { PAY } from '../data/store/payments.actions';
import { getDefaultPaymentMethod } from '../data/store/payments.selectors';
import { PaymentMethodType } from '../model/method-type.model';
import { PaymentMethod } from '../model/payment-method.model';
import { CreatePaymentIntentResponse } from '../model/payments-response.model';

function* handleError(error: Error): SagaIterator {
    yield call(toastService.showError, error);
    yield call(logger.log, error);
    yield put(PAY.FAILED(error));
}

export function* paySaga(action: ReturnType<typeof PAY.TRIGGER>): SagaIterator {
    yield put(PAY.STARTED());

    const user: User = yield select(getExistingUser);

    const result: CreatePaymentIntentResponse = yield call(paymentsAPI.createPaymentIntent, {
        requestThreeDSecure: 'automatic',
        email: user.email,
        bynAmount: action.payload.amount,
    });

    if (result.data) {
        const secret = result.data.clientSecret;
        const defaultMethod: PaymentMethod = yield select(getDefaultPaymentMethod);
        let paymentId = (Math.random() + 1).toString(36).substring(2);

        if (defaultMethod.type === PaymentMethodType.Card) {
            const { error, paymentIntent }: ConfirmPaymentResult = yield call(confirmPayment, secret, {
                type: 'Card',
                // eslint-disable-next-line
                paymentMethodId: defaultMethod.details!.stripePaymentId,
            });

            if (error) {
                yield call(handleError, new Error(error.message));
                return;
            }

            if (paymentIntent?.status !== PaymentIntents.Status.Succeeded) {
                yield call(logger.log, paymentIntent);
                return;
            }

            paymentId = paymentIntent.id;
        }

        const _result = yield call(paymentsAPI.paymentFinished, {
            methodId: defaultMethod.id,
            amount: action.payload.amount,
            timestamp: Date.now(),
            paymentId,
        });

        if (_result.status === 200) {
            yield put(PAY.COMPLETED());
        }

        if (_result.error) {
            yield call(handleError, _result.error);
        }
    }

    if (result.error) {
        yield call(handleError, result.error);
    }
}

export function* listenForPay(): SagaIterator {
    yield takeLatest(PAY.TRIGGER, paySaga);
}
