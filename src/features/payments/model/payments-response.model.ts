import { Response } from '../../../core/model/response.model';

import { PaymentMethod } from './payment-method.model';

export type GetPaymentMethodsResponse = Response<Array<PaymentMethod>>;

export type SetAsDefaultMethodResponse = Response<never>;

export type AddCardResponse = Response<never>;

export type CreatePaymentIntentResponse = Response<{
    clientSecret: string;
}>;

export type RemovePaymentMethodResponse = Response<never>;
