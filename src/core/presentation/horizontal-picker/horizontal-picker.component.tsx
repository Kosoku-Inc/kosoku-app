import React, { useCallback, useState } from 'react';

import { PickerWrapper, PickingItem } from './horizontal-picker.styled';

export type HorizontalPickerProps = {
    content: Array<React.ReactNode>;
    onSelectionChange: (index: number) => void;
    disabled?: boolean;
};

export const HorizontalPicker: React.FC<HorizontalPickerProps> = (props: HorizontalPickerProps) => {
    const [selected, setSelected] = useState<number | null>(null);

    const handleChoose = useCallback(
        (index: number) => {
            if (props.disabled) return;

            props.onSelectionChange(index);
            setSelected(index);
        },
        [props]
    );

    return (
        <PickerWrapper>
            {props.content.map((toRender, index) => (
                <PickingItem selected={selected === index} key={String(index)} onPress={() => handleChoose(index)}>
                    {toRender}
                </PickingItem>
            ))}
        </PickerWrapper>
    );
};
