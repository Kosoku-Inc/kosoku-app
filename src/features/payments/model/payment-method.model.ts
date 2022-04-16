import { Optional } from '../../../core/model/optional.model';

import { CardMethodDetails } from './method-details.model';
import { PaymentMethodType } from './method-type.model';

export type PaymentMethod = {
    id: number;
    type: PaymentMethodType;
    isDefault: boolean;
    details: Optional<CardMethodDetails>;
};
