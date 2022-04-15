import { CardBrand } from './brand.model';

export type CardMethodDetails = {
    lastFour: string;
    exp: string;
    holder: string;
    brand: CardBrand;
    stripePaymentId: string;
};
