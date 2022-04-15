import React from 'react';
import { KeyboardType } from 'react-native';
import { TextInput as RNTextInput } from 'react-native-paper';

import { colors } from '../../utils/theme/colors.utils';
import { FontType, getFontName } from '../../utils/theme/fonts.utils';
import { defaultTheme } from '../../utils/theme/themes.utils';

export type TextInputProps = {
    disabled?: boolean;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardType;
    secureTextEntry?: boolean;
    onFocus?: () => void;
};

export const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
    return (
        <RNTextInput
            editable={!props.disabled}
            mode={'outlined'}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            style={{
                marginBottom: defaultTheme.spacer,
                marginHorizontal: defaultTheme.spacer * 2,
                fontFamily: getFontName(FontType.regular),
            }}
            returnKeyType={'done'}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            activeOutlineColor={colors.black}
            outlineColor={colors.darkerGrey}
            theme={{
                roundness: 16,
                colors: {
                    background: colors.white,
                },
                fonts: {
                    regular: {
                        fontFamily: getFontName(FontType.regular),
                    },
                },
            }}
        />
    );
};
