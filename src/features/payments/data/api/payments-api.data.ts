import { restGatewayAPI } from '../../../../core/data/api/rest-gateway-api.data';
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
        return restGatewayAPI.get('/api/v1/payments');
    };

    setAsDefaultMethod = async (methodId: number): Promise<SetAsDefaultMethodResponse> => {
        return restGatewayAPI.post('/api/v1/payments/default', { methodId });
    };

    addCard = async (details: CardMethodDetails): Promise<AddCardResponse> => {
        return restGatewayAPI.post('/api/v1/payments/add', details);
    };

    createPaymentIntent = async (details: CreatePaymentIntentInput): Promise<CreatePaymentIntentResponse> => {
        return restGatewayAPI.post('/api/v1/payments/intent', details);
    };

    removePaymentMethod = async (methodId: number): Promise<RemovePaymentMethodResponse> => {
        return restGatewayAPI.post('/api/v1/payments/remove', { methodId });
    };

    paymentFinished = async (data: PaymentFinishedInput): Promise<PaymentFinishedResponse> => {
        return restGatewayAPI.post('/api/v1/payments/confirm', data);
    };
}

export const paymentsAPI = new PaymentsAPI();
