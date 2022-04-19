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

const classAssets: Record<CarClass, number> = {
    [CarClass.Economy]: require('../../../../assets/icons/car_classes/economy.png'),
    [CarClass.Comfort]: require('../../../../assets/icons/car_classes/comfort.png'),
    [CarClass.Business]: require('../../../../assets/icons/car_classes/business.png'),
};

export const toCarClassAsset = (clazz: CarClass): number => {
    return classAssets[clazz];
};
