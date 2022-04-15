export type CreatePaymentIntentInput = {
    bynAmount: number;
    requestThreeDSecure: 'any' | 'automatic';
    email: string;
};
