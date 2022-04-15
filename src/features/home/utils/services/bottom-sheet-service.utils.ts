import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { Optional } from '../../../../core/model/optional.model';

export class BottomSheetService {
    private bottomSheetRef: Optional<BottomSheetMethods>;

    setRef = (ref: BottomSheetMethods) => (this.bottomSheetRef = ref);

    expand = () => {
        setTimeout(() => this.bottomSheetRef?.expand(), 100);
    };

    minimize = () => {
        this.bottomSheetRef?.snapToIndex(0);
    };
}

export const bottomSheetService = new BottomSheetService();
