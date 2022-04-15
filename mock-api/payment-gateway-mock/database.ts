import { PaymentMethodType } from '../../src/features/payments/model/method-type.model';
import { PaymentFinishedInput } from '../../src/features/payments/model/payment-finished.model';
import { PaymentMethod } from '../../src/features/payments/model/payment-method.model';

export const mockedPaymentMethods: Record<number, Array<PaymentMethod>> = {
    1: [
        {
            id: 1,
            type: PaymentMethodType.Cash,
            isDefault: true,
            details: undefined,
        },
    ],
    2: [
        {
            id: 1,
            type: PaymentMethodType.Cash,
            isDefault: true,
            details: undefined,
        },
    ],
};

export const mockedPayments: Record<number, Array<PaymentFinishedInput & { id: number }>> = {
    1: [],
    2: [],
};
