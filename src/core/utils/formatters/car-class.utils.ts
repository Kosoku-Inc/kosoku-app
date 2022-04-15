import { CarClass } from '../../model/car-class.model';
import { Optional } from '../../model/optional.model';

export const toReadableCarClass = (clazz: Optional<CarClass>): string => {
    switch (clazz) {
        case CarClass.Business:
            return 'Бизнес';
        case CarClass.Comfort:
            return 'Комфорт';
        case CarClass.Economy:
            return 'Эконом';
        default:
            return '';
    }
};
