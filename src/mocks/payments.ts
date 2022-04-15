import { mockedPaymentMethods } from '../../payment-gateway-mock/database';
import { Optional } from '../core/model/optional.model';
import { PaymentMethodType } from '../features/payments/model/method-type.model';
import { PaymentMethod } from '../features/payments/model/payment-method.model';

import { mockedGetCurrentUser } from './users';

export const mockedGetPaymentMethods = async (): Promise<Optional<Array<PaymentMethod>>> => {
    const currentUser = await mockedGetCurrentUser();

    if (!currentUser) return null;

    return mockedPaymentMethods[currentUser.id] ? [...mockedPaymentMethods[currentUser.id]] : [];
};

export const mockedRemovePaymentMethod = async (id: number): Promise<Optional<boolean>> => {
    const currentUser = await mockedGetCurrentUser();

    if (!currentUser) return null;

    const method = mockedPaymentMethods[currentUser.id].find((i) => i.id === id);

    if (method?.isDefault) {
        // eslint-disable-next-line
        mockedPaymentMethods[currentUser.id][0] = {
            ...mockedPaymentMethods[currentUser.id][0],
            isDefault: true,
        };
    }

    mockedPaymentMethods[currentUser.id] = mockedPaymentMethods[currentUser.id].filter(
        (i) => i.id !== id || i.type === PaymentMethodType.Cash
    );

    return true;
};

export const mockedSetAsDefaultPaymentMethod = async (id: number): Promise<Optional<boolean>> => {
    const currentUser = await mockedGetCurrentUser();

    if (!currentUser) return null;

    mockedPaymentMethods[currentUser.id] = mockedPaymentMethods[currentUser.id].map((method) => ({
        ...method,
        isDefault: method.id === id,
    }));

    return true;
};
