import React, { useCallback, useRef } from 'react';
import {KeyboardType, Platform, Pressable, TextInput as RNTextInput} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { FontType, getFontName } from '../../utils/theme/fonts.utils';
import { defaultTheme } from '../../utils/theme/themes.utils';

export type TextInputProps = {
    disabled?: boolean;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardType;
    secureTextEntry?: boolean;
    onFocus?: () => void;
    defaultValue?: string;
};

export const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
    const opacity = useSharedValue(0.5);
    const textInputRef = useRef<RNTextInput | null>(null);

    const handleFocus = useCallback(() => {
        props.onFocus && props.onFocus();
        opacity.value = withTiming(1);
    }, [props, opacity]);

    const handleBlur = useCallback(() => {
        opacity.value = withTiming(0.5);
    }, [opacity]);

    const handlePress = useCallback(() => {
        textInputRef.current?.focus();
    }, []);

    const wrapperStyle = useAnimatedStyle(() => ({
        marginHorizontal: defaultTheme.spacer * 2,
        marginBottom: defaultTheme.spacer,
        borderColor: defaultTheme.colors.contrast,
        borderWidth: 2,
        borderRadius: 25,
        opacity: opacity.value,
        height: Platform.OS === 'android' ? 60 : undefined
    }));

    return (
        <Animated.View style={wrapperStyle}>
            <Pressable style={{ flexGrow: 1 }} onPress={handlePress}>
                <RNTextInput
                    ref={textInputRef}
                    style={{
                        color: defaultTheme.colors.text,
                        marginHorizontal: defaultTheme.spacer * 2,
                        marginVertical: Platform.OS === 'ios' ? defaultTheme.spacer * 2 : 0,
                        fontFamily: getFontName(FontType.semibold),
                        height: Platform.OS === 'android' ? 54 : undefined
                    }}
                    placeholderTextColor={defaultTheme.colors.text}
                    placeholder={props.placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    defaultValue={props.defaultValue}
                    secureTextEntry={props.secureTextEntry}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                    editable={!props.disabled}
                />
            </Pressable>
        </Animated.View>
    );
};
