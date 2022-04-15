import { paymentGatewayAPI } from '../../../../core/data/api/payment-gateway-api.data';
import { mockedGetCurrentUser } from '../../../../mocks/users';
import { CreatePaymentIntentInput } from '../../model/create-payment-intent-input.model';
import { CardMethodDetails } from '../../model/method-details.model';
import { PaymentFinishedInput, PaymentFinishedResponse } from '../../model/payment-finished.model';
import {
    AddCardResponse,
    CreatePaymentIntentResponse,
    GetPaymentMethodsResponse,
    RemovePaymentMethodResponse,
    SetAsDefaultMethodResponse,
} from '../../model/payments-response.model';

export class PaymentsAPI {
    getPaymentMethods = async (): Promise<GetPaymentMethodsResponse> => {
        const user = await mockedGetCurrentUser();

        if (!user) {
            return {
                status: 400,
                error: new Error('Неизвестный пользователь'),
            };
        }

        return paymentGatewayAPI.get('/methods', {
            userId: user.id,
        });
    };

    setAsDefaultMethod = async (id: number): Promise<SetAsDefaultMethodResponse> => {
        const user = await mockedGetCurrentUser();

        if (!user) {
            return {
                status: 400,
                error: new Error('Неизвестный пользователь'),
            };
        }

        return paymentGatewayAPI.post('/set-default-method', {
            methodId: id,
            userId: user.id,
        });
    };

    // eslint-disable-next-line
    addCard = async (details: CardMethodDetails): Promise<AddCardResponse> => {
        const user = await mockedGetCurrentUser();

        if (!user) {
            return {
                status: 400,
                error: new Error('Неизвестный пользователь'),
            };
        }

        return paymentGatewayAPI.post('/add-card', {
            ...details,
            userId: user.id,
        });
    };

    createPaymentIntent = async (details: CreatePaymentIntentInput): Promise<CreatePaymentIntentResponse> => {
        return paymentGatewayAPI.post('/create-payment-intent', details);
    };

    removePaymentMethod = async (id: number): Promise<RemovePaymentMethodResponse> => {
        const user = await mockedGetCurrentUser();

        if (!user) {
            return {
                status: 400,
                error: new Error('Неизвестный пользователь'),
            };
        }

        return paymentGatewayAPI.post('/remove-method', {
            methodId: id,
            userId: user.id,
        });
    };

    paymentFinished = async (data: PaymentFinishedInput): Promise<PaymentFinishedResponse> => {
        const user = await mockedGetCurrentUser();

        if (!user) {
            return {
                status: 400,
                error: new Error('Неизвестный пользователь'),
            };
        }

        return paymentGatewayAPI.post('/pay', {
            ...data,
            userId: user.id,
        });
    };
}

export const paymentsAPI = new PaymentsAPI();
