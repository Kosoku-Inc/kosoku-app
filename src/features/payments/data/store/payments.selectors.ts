import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../../../app/data/store/app.types';
import { Optional } from '../../../../core/model/optional.model';
import { PaymentMethod } from '../../model/payment-method.model';

import { PaymentsState } from './payments.types';

export const getPaymentsState: Selector<ApplicationState, PaymentsState> = createSelector(
    (state: ApplicationState) => state,
    (state) => state.payments
);

export const getIsPaymentsListLoading: Selector<ApplicationState, boolean> = createSelector(
    getPaymentsState,
    (state) => state.list.isLoading
);

export const getPaymentMethodList: Selector<ApplicationState, Optional<Array<PaymentMethod>>> = createSelector(
    getPaymentsState,
    (state) => state.list.data
);

export const getDefaultPaymentMethod: Selector<ApplicationState, Optional<PaymentMethod>> = createSelector(
    getPaymentMethodList,
    (list) => list?.find((i) => i.isDefault)
);

export const getIsCardAdding: Selector<ApplicationState, boolean> = createSelector(
    getPaymentsState,
    (state) => state.addCard.isLoading
);
