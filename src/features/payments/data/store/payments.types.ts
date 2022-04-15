import { State } from '../../../../core/model/state.model';
import { PaymentMethod } from '../../model/payment-method.model';

export type PaymentsState = {
    list: State<Array<PaymentMethod>>;
    addCard: State<unknown>;
    payment: State<unknown>;
};
