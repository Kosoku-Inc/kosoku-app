import { Response } from '../../../core/model/response.model';

export type PaymentFinishedInput = {
    methodId: number;
    amount: number;
    timestamp: number;
    paymentId: string;
};

export type PaymentFinishedResponse = Response<unknown>;
