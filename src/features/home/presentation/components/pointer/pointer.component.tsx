import React, { ForwardedRef, useCallback, useImperativeHandle } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { IconWrapper, PointerWrapper, Round } from './pointer.styled';

export type PointerProps = never;

export type PointerRef = {
    start: () => void;
    stop: () => void;
};

export const Pointer = React.forwardRef(function Pointer(props: PointerProps, ref: ForwardedRef<PointerRef>) {
    const sharedValue = useSharedValue(25);

    const start = useCallback(() => {
        sharedValue.value = withTiming(0);
    }, [sharedValue]);

    const stop = useCallback(() => {
        sharedValue.value = withTiming(25);
    }, [sharedValue]);

    useImperativeHandle(ref, () => ({
        start,
        stop,
    }));

    const legStyle = useAnimatedStyle(() => ({
        height: sharedValue.value,
        width: 5,
        backgroundColor: 'red',
        borderBottomEndRadius: 3,
        borderBottomStartRadius: 3,
    }));

    return (
        <PointerWrapper>
            <IconWrapper>
                <Round />
                <Animated.View style={legStyle}></Animated.View>
            </IconWrapper>
        </PointerWrapper>
    );
});
