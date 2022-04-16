import { Response } from '../../../core/model/response.model';

export type PaymentFinishedInput = {
    methodId: number;
    amount: number;
    rideId: number;
    paymentId?: string;
};

export type PaymentFinishedResponse = Response<unknown>;
