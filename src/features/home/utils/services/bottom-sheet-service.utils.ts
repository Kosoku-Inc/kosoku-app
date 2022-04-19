import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { Optional } from '../../../../core/model/optional.model';

export class BottomSheetService {
    private bottomSheetRef: Optional<BottomSheetMethods>;

    setRef = (ref: BottomSheetMethods) => (this.bottomSheetRef = ref);

    expand = () => {
        setTimeout(() => this.bottomSheetRef?.expand(), 100);
    };

    snapToIndex = (index: number) => {
        setTimeout(() => this.bottomSheetRef?.snapToIndex(index), 100);
    };

    minimize = () => {
        this.bottomSheetRef?.snapToIndex(0);
    };

    close = () => {
        setTimeout(() => this.bottomSheetRef?.forceClose(), 100);
    };
}

export const bottomSheetService = new BottomSheetService();
