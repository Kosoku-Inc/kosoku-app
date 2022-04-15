import { Card } from '@stripe/stripe-react-native';

import { Optional } from '../../../core/model/optional.model';
import { CardBrand } from '../model/brand.model';
import { CardMethodDetails } from '../model/method-details.model';
import { PaymentMethodType } from '../model/method-type.model';
import { PaymentMethod } from '../model/payment-method.model';

import { brandAssets } from './brand-assets.utils';

export const toReadableCardBrand = (brand: CardBrand): string => {
    switch (brand) {
        case CardBrand.AmericanExpress:
            return 'Am. Express';
        case CardBrand.Visa:
            return 'Visa';
        case CardBrand.Mastercard:
            return 'MasterCard ';
    }
};

export const toReadableCardData = (card: CardMethodDetails): string => {
    return `${toReadableCardBrand(card.brand)}\t****${card.lastFour}`;
};

export const toReadablePaymentMethod = (method: PaymentMethod): string => {
    // eslint-disable-next-line
    return method.type === PaymentMethodType.Cash ? 'Наличные' : toReadableCardData(method.details!);
};

export const toPaymentMethodAsset = (method: PaymentMethod): number => {
    return method.type === PaymentMethodType.Cash
        ? require('../../../../assets/icons/cash.png')
        : // eslint-disable-next-line
          brandAssets[method.details!.brand];
};

export const toValidExp = (month: number, year: number): string => {
    const _month = month < 10 ? `0${month}` : '' + month;
    const _year = year;

    return `${_month}/${_year}`;
};

export const toValidCardBrand = (brand: Card.Brand): Optional<CardBrand> => {
    switch (brand) {
        case 'Visa':
            return CardBrand.Visa;
        case 'MasterCard':
            return CardBrand.Mastercard;
        case 'AmericanExpress':
            return CardBrand.AmericanExpress;
        default:
            return null;
    }
};
